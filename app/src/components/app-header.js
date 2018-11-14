import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.appHeader, {backgroundColor: this.props.backgroundColor}]}>
          <StatusBar hidden={true}/>
          <View style={styles.appHeaderTitle}>
            <Image style={styles.appHeaderLogo} source={{uri: this.props.icon}} />
            <Text style={styles.appHeaderTitleText}>{this.props.title}</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this._logout.bind(this)} underlayColor="transparent">
              <Image
                style={styles.appHeaderButton}
                source={require('../../assets/logout_icon.png')}
              />
             </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  
  async _logout () {
    await AsyncStorage.removeItem('current_user_token');
    this.props.navigation.navigate('AuthLoading');
  }
}
export default withNavigation(AppHeader);

const styles = StyleSheet.create({
  container: {
    height: 56,
  },
  appHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appHeaderTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    flex: 1,
    flexDirection: 'row'
  },
  appHeaderTitleText: {
    fontWeight: "500",
    color: "#ffffff",
    fontSize: 20,
    margin: 0,
    padding: 0,
    paddingLeft: 10
  },
  appHeaderLogo: {
    width: 32,
    height: 32
  },
  appHeaderButton: {
    marginRight: 10,
    width: 32,
    height: 32,
  }
});