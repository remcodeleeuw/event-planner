import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

import "./event-item.scss";
function EventItem({ event, handleDelete }) {
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
        <i className="fab fa-whatsapp"></i>
      </div>
    </div>
  )
};
export default EventItem;