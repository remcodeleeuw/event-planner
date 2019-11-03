import React from 'react';
import { connect } from 'react-redux';

import "./AttendingForm.scss";
import { setAttending } from '../../../redux/event/event.action';
import { createStructuredSelector } from 'reselect';
import { selectSingleEvent } from '../../../redux/event/event.selector';
class AttendingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      attending: null
    }
  }
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSetAttending(this.props.selectedEvent._id, this.state.attending)
  }
  render() {
    return (
      <form class="attending-form" onSubmit={this.handleSubmit} >
        <h2>Ben je aanwezig?</h2>
        <div class="attending-form-checkbox">
          <div class="form-checkbox-container">
            <input
              class="form-radio"
              type="radio"
              value={true}
              name="attending"
              onChange={this.handleChange} />
            <span>Aanwezig</span>
          </div>
          <div class="form-checkbox-container">
            <input
              type="radio"
              value={false}
              name="attending"
              onChange={this.handleChange} />
            <span>Niet aanwezig</span>
          </div>
        </div>
        <button class="form-button">Submit</button>
      </form >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectedEvent: selectSingleEvent,
})

const mapDispatchToProps = dispatch => {
  return {
    onSetAttending: (eventId, attending) => dispatch(setAttending(eventId, attending))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendingForm);