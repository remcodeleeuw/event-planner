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
      error: null

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
      await this.validateState();
      await this.props.onCreateUser(this.state);
      this.props.history.push("/login")
    } catch (error) {
      console.log(this.state)
    }

  }
  validateState = async () => {
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
      <form onSubmit={this.onHandleSubmit} className="form event-form">
        <h2 className="form-title">Maak een nieuw account aan</h2>
        <Link className="form-redirect" to="/login">Nog geen account? Klik dan hier</Link>
        <input name="name" onChange={this.onHandleChange} className="form-input" type="text" placeholder="Vul hier je naam in" />
        <input name="email" onChange={this.onHandleChange} className="form-input" type="email" placeholder="email" />
        <input name="password" onChange={this.onHandleChange} className="form-input" type="password" placeholder="wachtwoord" />
        {
          this.state.error ? <span>{this.state.error}</span> : ""
        }
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