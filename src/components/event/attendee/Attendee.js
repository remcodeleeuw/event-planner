import React from 'react';

function AttendeesList(props) {
  const { attendee: { user } } = props;
  return (
    <div>
      {user.name}
    </div >
  )
};

export default AttendeesList

