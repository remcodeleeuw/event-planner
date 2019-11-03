import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent, checkIfAttending } from '../../../redux/event/event.action';
import moment from "moment";

import "./event-single.scss";
import AttendingForm from '../attending-form/AttendingForm';
import Attendee from '../attendee/Attendee';
class EventSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user"))
    });
    this.props.onFetchEvent(this.props.match.params.id);
    console.log(this.state);
  }
  render() {
    const { user } = this.state;
    const { event } = this.props;
    return (
      <div className="single-event-container">
        {user ? (
          <>
            <div className="single-event">
              <div className="single-event-title">
                <h2>{event.title}</h2>
                <div className="date-container">
                  <span className="day">{moment(event.date).format('DD')}</span>
                  <span className="month">{moment(event.date).format('MMM')}</span>
                </div>
              </div>
              <div className="attendee-list">
                <h3>De volgende mensen gaan naar dit evenement</h3>
                {
                  event.attendees ? (
                    event.attendees.map(attendee => {
                      return <Attendee attendee={attendee} />
                    })
                  ) : null
                }
              </div>
            </div>
            <AttendingForm />
          </>
        ) : (
            <div><h2>Om je aan te melden voor dit evenement moet je inloggen</h2></div>
          )}
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {
    event: state.event.selectedEvent
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckIfAttending: (userId, eventId) => dispatch(checkIfAttending(userId, eventId)),
    onFetchEvent: id => dispatch(fetchEvent(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSingle);