import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectEvents } from '../../../redux/event/event.selector';
import { fetchEvents, deleteEvent } from '../../../redux/event/event.action';
import EventItem from '../event-item/event-item';
import { selectUser } from '../../../redux/auth/auth.selector';
import CustomLink from '../../header/custom-link/custom-link';
import store from 'store';

import "./event-overview.scss";
class EventOverview extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }
  async componentWillMount() {
    await this.setState({
      user: store.get('user')
    });
  }
  async componentDidMount() {

    const { user } = this.state;

    if (user) {
      this.props.onFetchEvent(user.userId);
    };
  };
  handleDelete = (id) => {
    this.props.onDeleteEvent(id)
  }
  render() {
    const { user } = this.state;
    const customLinkDetails = {
      url: "/events/new",
      text: "Maak nieuw evenement aan",
      styles: "event-overview-create "
    }
    return (
      <div className="event-overview">
        <h2 className="event-overview-title">Je aankomende evenementen</h2>
        {
          this.props ? (
            this.props.events.map(event => {
              return <EventItem key={event._id} handleDelete={this.handleDelete} event={event} />
            })
          ) : <span></span>
        }
        {
          user ? <CustomLink {...customLinkDetails} /> : null
        }
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  events: selectEvents,
  user: selectUser
});
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvent: userId => dispatch(fetchEvents(userId)),
    onDeleteEvent: id => dispatch(deleteEvent(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventOverview);