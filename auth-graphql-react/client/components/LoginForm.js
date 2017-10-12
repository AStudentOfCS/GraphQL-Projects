import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // 'this.props' is the old, current set of props Object
    // 'nextProps' is the next set of props Object that will be in place
    // when the component rerenders
    if (!this.props.data.user && nextProps.data.user) {
      // first render: user is null, when successful authed => user is authed
      // => redirect to dashboard!!!
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
