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
        <i className="fab fa-whatsapp" onClick={() => shareViaWhatsapp(props)}></i>
        <i className="far fa-trash-alt" onClick={() => handleDelete(_id)}></i>
      </div>
    </div>
  )
};

function shareViaWhatsapp(props) {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  const message = `${props.event.user.name} nodigt je uit om naar ${props.event.title} te gaan 
Het vind plaats op ${moment(props.event.date).format("D MMMM")}
https://event-planner-right-bit.now.sh/events/single/${props.event._id}`
  if (isMobile) {
    window.open(`https://wa.me/?text=${encodeMessage(message)}`)
  } else {
    window.open(`https://web.whatsapp.com/send?text=${encodeMessage(message)}`)

  }
}
export default withRouter(EventItem);