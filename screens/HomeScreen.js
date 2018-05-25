import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';

const SPOTIFY_APP_ID = '6a2f92555e304d5f83673df87483dfd5'; 

class LoginScreen extends React.Component {
  state = {
    result: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let scopes = 'user-read-private user-read-email';
    console.log(redirectUrl);
    let result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize` +
        `?response_type=code` +
        `&client_id=${SPOTIFY_APP_ID}` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { LoginScreen };
