import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';

import bgImage from './images/image-fundo.png'
import Logo from './images/logo.png'
import Fundo from './images/sombra-fundo.png'

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.imagebackgroundContainer}>
        <ImageBackground source={Fundo} style={styles.fundoContainer}>
          <View style={styles.LogoContainer}>
            <image source={logo} style={styles.logo} />
            <Text style={styles.LogoText}>DOURADOS </Text>
          </View>
          
          <View>
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              placeholderTextColor={'rgba(255,255,255, o.7)'}
              underlineColorAndroid='transparent'
            />

            <TextInput
              style={styles.input}
              placeholder={'Senha'}
              secureTextColor={true}
              placeholderTextColor={'rgba(255,255,255, o.7)'}
              underlineColorAndroid='transparent'
            />
          </View>

          <touchableOpacity style={styles.button}>
            <Text style={styles.btntext}>ENTRAR</Text>
          </touchableOpacity>

          <Button title="ACESSE COM O FACEBOOK" onPress={this.login} />

        </ImageBackground>  
      </ImageBackground>    
    );
  }
}

login = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('412713355930212', {
    permissions: ['public_profile'],
  });
  if (type === 'success') {
    const response = await fetch(
     `https://graph.facebook.com/me?access_token=${14fec1ee013cc2eea329bc14b19c3059}`);
    Alert.alert(
     'Logged in!',
     `Hi ${(await response.json()).name}!`,
    );
  }
 },

const styles = StyleSheet.create({
  imagebackgroundContainer: {
    flex: 1,
    width: null,
    height: 'null',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fundoContainer:{
    flex: 1,
    width: null,
    height: 'null',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },

  LogoContainer:{
    alignItems:'center',
  },

  Logo :{
    width: 190,
    height: 150,
  },

  LogoText:{
    color: '#1E51A4',
    fontSize: 32,
    fontWeight: '500',
    marginTop: 23,
  },

  TextInput:{
    paddingleft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255,255, 0.7)'
    marginHorizontal: 2,
  },

  button: {
    backgroundColor: '#1E51A4',
    alignItems:'center',
  },

  btntext:{
    color:'FFFFFF',
    fontSize: 32,
  }
});
