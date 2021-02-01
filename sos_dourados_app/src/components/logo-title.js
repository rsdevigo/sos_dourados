import React from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import {Text, View, Icon, Button, Header, Left, Title, Body, Right } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

export default function LogoTitle({hasTabsProps, hasBack}) {

  const navigation = useNavigation();
  const _logout = async () => {
    await AsyncStorage.removeItem('current_user_token');
  }

  if (hasTabsProps == true) {
    return (
      <Header hasTabs style={styles.appHeader}>
        {hasBack == true ? (
        <Left>
          <Button transparent onPress={() => {navigation.navigate("Tab")}}>
            <Icon style={{color: '#1E51A4'}} name='arrow-back' />
          </Button>
        </Left>) : null }
        <Body style={styles.appHeaderTitle}>
          <Image style={styles.appHeaderLogo} source={require('../../assets/logo.png')} />
          <Title style={[styles.appHeaderTitleText, {fontFamily: 'Roboto_medium',fontSize: 18}]}>DOURADOS</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => {_logout()}}>
            <Icon style={{color: '#1E51A4'}} name='exit' />
          </Button>
        </Right>
      </Header>
    );
  } else {
    return (
      <Header style={styles.appHeader}>
        {hasBack == true ? (
        <Left>
          <Button transparent onPress={() => {navigation.navigate("Tab")}}>
            <Icon style={{color: '#1E51A4'}} name='arrow-back' />
          </Button>
        </Left>) : null }
        <Body style={styles.appHeaderTitle}>
          <Image style={styles.appHeaderLogo} source={require('../../assets/logo.png')} />
          <Title style={[styles.appHeaderTitleText, {fontFamily: 'Roboto_medium',fontSize: 18}]}>DOURADOS</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => {_logout()}}>
            <Icon style={{color: '#1E51A4'}} name='exit' />
          </Button>
        </Right>
      </Header>
    );
  }
}


const styles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8D253'
  },
  appHeaderTitle: {
    paddingLeft: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
  },
  appHeaderTitleText: {
    color: "#1E51A4",
    fontSize: 15,
    margin: 0,
    padding: 0,
    paddingLeft: 7
  },
  appHeaderLogo: {
    height: 39,
    width: 50
  }
});