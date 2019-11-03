import React from 'react';

function AttendeesList(props) {
  const { attendees } = props;
  return (
    <div>
      {
        attendees ? (
          attendees.map(attendee => {
            return <span>{attendee.user.name}</span>
          })
        ) : null
      }
    </div >
  )
};

export default AttendeesList

