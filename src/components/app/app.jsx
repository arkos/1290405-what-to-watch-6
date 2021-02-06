import React, {Component} from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

export default class App extends Component {
  render() {
    const {genre, year} = this.props;
    return <Main genre={genre} year={year} />;
  }
}

App.propTypes = {
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};
