import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { LoginScreen } from './screens/LoginScreen';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    title: "Login"
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}

