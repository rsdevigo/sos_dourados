import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';
import AppHeader from '../components/app-header';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="Exemplo titulo" icon="https://maxcdn.icons8.com/Share/icon/color/Gaming/pokecoin1600.png" backgroundColor="#009688" />
        <ScrollView style={styles.container}>
          <Text>Home Screen</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
});
