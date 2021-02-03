import React, {Component} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';

export default class App extends Component {
  render() {
    const {genre, year} = this.props;
    return <WelcomeScreen genre={genre} year={year} />;
  }
}

App.propTypes = {
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};
