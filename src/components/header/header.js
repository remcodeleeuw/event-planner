import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from '../../redux/auth/auth.action';
import { selectUser, selectLoggedinStatus } from '../../redux/auth/auth.selector';

class Header extends React.Component {
  render() {
    const { loggedin } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <header className="menu">
        <ul className="menu-list menu-left">
          <li className="menu-item">
            <Link to={user ? '/events' : '/'} className="menu-link">Home</Link >
          </li>

        </ul>
        <ul className="menu-list menu-right">
          <li className="menu-item">
            {
              loggedin ? (
                <Link className="menu-link" to="/" onClick={() => this.props.onLogout()}>Logout</Link>
              ) : (
                  <Link className="menu-link" to="/login">Login</Link>
                )
            }
          </li>
        </ul>
      </header>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  loggedin: selectLoggedinStatus
})


const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);