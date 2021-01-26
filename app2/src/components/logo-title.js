import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import * as Font from 'expo-font'

export default class LogoTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }
  render () {
    return (
        <View style={styles.appHeader}>
          <View style={styles.appHeaderTitle}>
            <Image style={styles.appHeaderLogo} source={require('../../assets/logo.png')} />
            {
              this.state.fontLoaded ? (
                <Text style={[styles.appHeaderTitleText, {fontFamily: 'hind-bold',fontSize: 28}]}>DOURADOS</Text>
              ) : null
            }
          </View>
        </View>
    );
  }

  async componentDidMount() {
    await Font.loadAsync({
      'hind-bold': require('../../assets/fonts/Hind-Bold.ttf'),
    });
    this.setState((prevState) => {
      prevState.fontLoaded = true;
      return prevState;
    });
  }
}


const styles = StyleSheet.create({
  appHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    paddingLeft: 16,
    marginTop: 18
  },
  appHeaderTitle: {
    paddingLeft: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row'
  },
  appHeaderTitleText: {
    color: "#1E51A4",
    fontSize: 20,
    margin: 0,
    padding: 0,
    paddingLeft: 7
  },
  appHeaderLogo: {
    height: 56,
    width: 72
  }
});