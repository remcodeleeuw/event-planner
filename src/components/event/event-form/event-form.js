import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import "./event-form.css";
import { createEvent } from '../../../redux/event/event.action';
import { selectUser } from '../../../redux/auth/auth.selector';
import store from 'store';

class EventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      date: "",
      error: null
    }
  };

  onHandleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  };

  onHandleSubmit = async event => {
    event.preventDefault();
    try {
      await this.onValidateState();
      const user = store.get('user')
      await this.setState({
        user: user.userId
      });
      await this.props.onCreateEvent(this.state)
      this.props.history.push("/events")
    } catch (error) {
      console.log(this.state)
    }
  }

  onValidateState = async () => {
    for (const key in this.state) {
      if (this.state[key] === "") {
        await this.setState({
          error: `${key} kan niet leeg zijn`
        });
        throw new Error();
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.onHandleSubmit} className="form event-form" action="">
        <h2 className="form-title">Maak een nieuw evenement aan</h2>
        <input name="title" onChange={this.onHandleChange} className="form-input" type="text" placeholder="Titel" />
        <input name="description" onChange={this.onHandleChange} className="form-input" type="text" placeholder="Omschrijving" />
        <input type="date" name="date" min={Date.now()} onChange={this.onHandleChange} className="form-input" />
        {
          this.state.error ? <span>{this.state.error}</span> : ""
        }
        <button className="form-button">Create event</button>
      </form>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  user: selectUser
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateEvent: (event) => dispatch(createEvent(event))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventForm);