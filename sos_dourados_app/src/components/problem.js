import React from 'react';
import {View, StyleSheet, TouchableHighlight, Image, NativeModules} from 'react-native';
import {ListItem, Left, Thumbnail, Body, Text, Right, Button, Icon} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {API_URL, PHOTOS_URL} from "@env";

function Problem({id, photo, data, categorias, endereco}) {

  const navigation = useNavigation();

  const formatDate = (date) => {
    let d = new Date(date);
    return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
  }

  return (
    <ListItem thumbnail onPress={()=>{navigation.navigate('ProblemDetails', {id: id})}} >
      <Left>
        <Thumbnail square source={{uri: PHOTOS_URL+photo}} />
      </Left>
      <Body>
        <Text>{endereco}</Text>
        <Text note numberOfLines={1}>{categorias}</Text>
        <Text style={styles.problemTimeText}>{formatDate(data)}</Text>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="caret-down" />
        </Button>
      </Right>
    </ListItem>
  );
}

export default Problem;

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
    padding: 0,
    margin: 0
  },

});

