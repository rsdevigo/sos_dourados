import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';


export default class Problem extends React.Component {
  render() {
    return (
    <View>
      <View style={styles.problemBack}>
        <View style={styles.problemText}>
          <Text style={styles.problemTitle}>Rua Major Capilé, 5193</Text>
          <Text style={styles.problemaCategory}>Iluminação pública</Text>
        </View>
        <View style={styles.problemTime}>
          <TouchableHighlight onPress={()=>{}} underlayColor="transparent">
              <Image
              style={styles.problemDetailsButton}
              source={require('../../assets/details_icon.png')}
              />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.problemDivider}></View>
    </View>
    )};
}

const styles = StyleSheet.create({
  problemBack: {
    height: 64,
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
  problemDetailsButton: {
    width: 24,
    height: 24
  },
  problemDivider: {
    height: 1,
    backgroundColor: '#00000012',
    padding: 0,
    margin: 0,
    marginLeft: 24,
  },  
  problemCategoryImage: {
    width: 40,
    height: 40,
    padding: 0,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 0,
    borderRadius: 50,
  },
  problemText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  problemTitle: {
    fontSize: 16,
    color: '#333333'
  },
  problemaCategory: {
    fontSize: 14,
    color: '#333333'
  },
  problemTime: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

