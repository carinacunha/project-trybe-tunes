import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="favorites" data-testid="link-to-favorites">Favoritas </Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil </Link>
      </header>
    );
  }
}
