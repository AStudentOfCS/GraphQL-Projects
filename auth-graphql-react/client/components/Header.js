import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';
import { hashHistory } from 'react-router';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButton() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
       <li>
         <a onClick={this.onLogoutClick.bind(this)}>Log Out</a>
       </li>
     );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Log In</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>
            Home
          </Link>
          <ul className='right'>
            {this.renderButton()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
