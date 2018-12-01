import React from 'react';
import {View, Text, StyleSheet, } from 'react-native';


export default class Mensage extends React.Component {
  render() {
    return (
    <View>
      <View style={styles.mensageBack}>
        <View style={styles.mensageText}>
          <Text style={styles.mensageTitle}>Prefeitura Municipal de Dourados </Text>
          <Text style={styles.mensageDescription}>Reclamação lida, estamos verificando a pendência.</Text>
        </View>    
      </View>
      
    </View>
    )};
}

const styles = StyleSheet.create({
  mensageBack: {
    height: 64,
    width: 344,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 12,
  },
    
  
  mensageText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mensageTitle: {
    fontSize: 18,
    color: '#333333'
  },
  mensageDescription: {
    fontSize: 14,
    color: '#333333'
  },
 

});

