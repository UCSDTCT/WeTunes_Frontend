import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';

import Button from 'react-native-button';

const SPOTIFY_APP_ID = '6a2f92555e304d5f83673df87483dfd5'; 

class LoginScreen extends React.Component {
  state = {
    result: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.header}>WeTunes</Text>
          <Text style={styles.subheader}>Tired of one person's terrible music choices?</Text>
          <Text style={styles.subheader}>This app may be of use to you then.</Text>
          <Text style={styles.subheader}>Login with your Spotify account to begin.</Text>
        </View>
        <View style={styles.footer}>
          <Button 
            style={styles.spotify}
            onPress={this._handleSpotifyAuth}>
            <Image source={require('../assets/spotify-logo.jpg')} style={{width: 100, height: 100}}/>Connect
          </Button>
          {this.state.result ? (
            <Text>{JSON.stringify(this.state.result)}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  _handleSpotifyAuth = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let scopes = 'user-read-private user-read-email';
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
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginBottom: 50
  },
  header: {
    fontSize: 80
  },
  subheader: {
    marginTop: 20,

  },
  spotify: {
    color: 'white', 
    backgroundColor: '#23CF5F', 
    fontSize: 48,
    padding: 21,
    overflow: 'hidden'
  }
});

export { LoginScreen };
