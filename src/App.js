import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      userName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
    const number = 3;
    const isDisable = value.length < number;
    this.setState({
      buttonDisabled: isDisable,
    });
  }

  render() {
    const { buttonDisabled, userName } = this.state;
    return (
      <section>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              buttonDisabled={ buttonDisabled }
              handleChange={ this.handleChange }
              userName={ userName }
              { ...props }
            />) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact component={ NotFound } />
        </Switch>
      </section>

    );
  }
}

export default App;
