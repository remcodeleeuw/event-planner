import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { createUser } from '../../../redux/auth/auth.action';
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }
  onHandleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  };

  onHandleSubmit = async event => {
    event.preventDefault();
    try {
      await this.props.onCreateUser(this.state);
      return;
    } catch (error) {

    }
    this.props.history.push("/login")

  }

  render() {
    return (
      <form onSubmit={this.onHandleSubmit} className="form event-form">
        <h2 className="form-title">Maak een nieuw account aan</h2>
        <Link className="form-redirect" to="/login">Nog geen account? Klik dan hier</Link>
        <input name="name" onChange={this.onHandleChange} className="form-input" type="text" placeholder="Vul hier je naam in" />
        <input name="email" onChange={this.onHandleChange} className="form-input" type="email" placeholder="email" />
        <input name="password" onChange={this.onHandleChange} className="form-input" type="password" placeholder="wachtwoord" />
        <button className="form-button">Maak account</button>
      </form>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUp)