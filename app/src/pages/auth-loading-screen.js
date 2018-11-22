import React from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, AsyncStorage} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.props.navigation.addListener('didFocus', this._bootstrapAsync.bind(this));
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const currentUserToken = await AsyncStorage.getItem('current_user_token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(currentUserToken ? 'Tab' : 'Login');
  };

  // Render any loading content that you like here
  render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
