import React, {Component} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';

export default class App extends Component {
  render() {
    const {genre, year} = this.props;
    return <WelcomeScreen genre={genre} year={year} />;
  }
}
