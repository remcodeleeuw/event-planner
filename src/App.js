import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.scss';
import EventForm from './components/event/event-form/event-form';
import EventOverview from './components/event/event-overview/event-overview';
import EventSingle from './components/event/event-single/event-single';
import SignIn from './components/auth/sign-in/sign-in';
import signUp from './components/auth/sign-up/sign-up';
import Header from "./components/header/header";
import { checkIfUserSignedIn } from './redux/auth/auth.action';
import Home from './components/home/home';

function App(props) {
  useEffect(() => {
    async function fetchData() {
      const user = await JSON.parse(localStorage.getItem('user'))
      if (user) {
        props.onCheckIfUserIsSignedIn(user);
      }
    };
    fetchData();
  });
  return (
    <div className="App">
      {/* Header */}
      <Header />

      <section className="container">
        <Route exact path={"/"} component={Home} />

        <Route exact path={"/events"} component={EventOverview} />
        <Route path={"/events/new"} component={EventForm} />
        <Route exact path={"/events/single/:id"} component={EventSingle} />
        <Route exact path={"/login"} component={SignIn} />
        <Route exact path={"/register"} component={signUp} />
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckIfUserIsSignedIn: user => dispatch(checkIfUserSignedIn(user))
  }
}

export default connect(null, mapDispatchToProps)(App);
