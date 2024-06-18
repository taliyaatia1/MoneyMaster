// Noam Abut 208416313 & Taliya Atia 318860905 
class IDB {
    constructor(dbName = 'costsdb', storeName = 'costs', version = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
        this.db = null;
    }

    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    ensureInitialized() {
        if (!this.db) {
            throw new Error('Database is not initialized');
        }
    }

    getItem(key) {
        return new Promise((resolve, reject) => {
            this.ensureInitialized();
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    setItem(value) {
        return new Promise((resolve, reject) => {
            this.ensureInitialized();
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(value); // Use put instead of add for upsert

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    removeItem(key) {
        return new Promise((resolve, reject) => {
            this.ensureInitialized();
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    clear() {
        return new Promise((resolve, reject) => {
            this.ensureInitialized();
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    static async openCostsDB(dbName, version) {
        const dbInstance = new IDB(dbName, 'costs', version);
        await dbInstance.open();
        return dbInstance;
    }

    async addCost(cost) {
        return await this.setItem(cost);
    }
}

export default IDB;
