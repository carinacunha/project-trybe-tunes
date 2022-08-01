import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true });
    const response = await getUser();
    const { name } = response;
    this.setState({
      loading: false, user: name });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        Header
        { loading
          ? <Loading />
          : <h3 data-testid="header-user-name">{ user }</h3>}
      </header>
    );
  }
}
