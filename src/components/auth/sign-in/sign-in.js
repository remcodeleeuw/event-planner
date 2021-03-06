import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loginUser } from '../../../redux/auth/auth.action';
import { createStructuredSelector } from 'reselect';
import { selectError } from '../../../redux/auth/auth.selector';
class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
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
      await this.props.onLoginUser(this.state);
      this.props.history.push('/events');
    } catch (error) {
    }
  }

  render() {
    return (
      <form onSubmit={this.onHandleSubmit} className="form event-form">
        <h2 className="form-title">Login bij je account</h2>
        <Link className="form-redirect" to="/register">Nog geen account? Klik dan hier</Link>
        <input name="email" onChange={this.onHandleChange} className="form-input" type="email" placeholder="email" />
        <input name="password" onChange={this.onHandleChange} className="form-input" type="password" placeholder="wachtwoord" />
        {this.props.error.hasError ? (
          <span className="form-error">Er is helaas wat fout gegaan, probeer het opnieuw</span>
        ) : ""}
        <button className="form-button">Login</button>

      </form>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  error: selectError
})

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: user => dispatch(loginUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)