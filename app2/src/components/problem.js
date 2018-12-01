import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import { withNavigation } from 'react-navigation';

class Problem extends React.Component {
  constructor(props){
    super(props);
  }
  formatDate (date) {
    let d = new Date(date);
    return d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
  }
  render() {
    return (
    <View>
      <View style={styles.problemBack}>
        <View style={styles.problemText}>
          <Text style={styles.problemTitle}>{this.props.endereco}</Text>
          <Text style={styles.problemaCategory}>{this.props.categorias}</Text>
        </View>
        <View style={styles.problemTime}>
          <TouchableHighlight onPress={()=>{this.props.navigation.navigate('ProblemDetails', {id: this.props.key})}} underlayColor="transparent">
              <Image
              style={styles.problemDetailsButton}
              source={require('../../assets/details_icon.png')}
              />
          </TouchableHighlight>
          <Text style={styles.problemTimeText}>{this.formatDate(this.props.data)}</Text>
        </View>
      </View>
      <View style={styles.problemDivider}></View>
    </View>
    )};
}

export default withNavigation(Problem);

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
  problemTimeText: {
    fontSize: 10,
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

