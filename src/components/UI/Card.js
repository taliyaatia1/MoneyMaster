// Noam Abut 208416313 & Taliya Atia 318860905 
import "./Card.css";

const  Card = (props) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}
export default Card;
