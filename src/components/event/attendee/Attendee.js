import React from 'react';
import "./Attendee.scss";

function AttendeesList(props) {
  const { attendee: { user } } = props;
  return (
    <span className="attendee">
      {user.name}
    </span>
  )
};

export default AttendeesList

