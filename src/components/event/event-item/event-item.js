import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from "moment";
import { encodeMessage } from "../../../util/message"

import "./event-item.scss";
function EventItem(props) {
  const { event, handleDelete } = props
  const { date, description, title, _id } = event;
  return (
    <div className="event-item" >
      <Link to={`/events/single/${_id}`}>
        <div className="event-item-title">
          <h2>{title}</h2>
          <span>
            {date ? moment(date).format("D MMMM") : ""}
          </span>
        </div>
        <div className="event-item-meta">
          <span>
            {description}
          </span>
        </div>
      </Link>
      <div className="event-item-buttons">
        <i className="far fa-trash-alt" onClick={() => handleDelete(_id)}></i>
        <i className="fab fa-whatsapp" onClick={() => shareViaWhatsapp(props)}></i>
      </div>
    </div>
  )
};

function shareViaWhatsapp(props) {
  const message = `${props.event.user.name} nodigt je uit om naar ${props.event.title} te gaan 
Het vind plaats op ${moment(props.event.date).format("D MMMM")}
http://localhost:3000/events/single/${props.event._id}`
  console.log(message)
  window.open(`https://web.whatsapp.com/send?text=${encodeMessage(message)}`)
}
export default withRouter(EventItem);