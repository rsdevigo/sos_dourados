import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';

export default class SettingsScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
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
