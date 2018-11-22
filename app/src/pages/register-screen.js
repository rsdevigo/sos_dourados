import React from 'react';
import {Text, View, Button, Alert, StyleSheet, ImageBackground, StatusBar, Image, NativeModules, ScrollView} from 'react-native';
import { Font } from 'expo';
import TextField from 'react-native-md-textinput';
import parse from 'url-parse';
const {hostname} = parse(NativeModules.SourceCode.scriptURL, true);


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      user: {
        email: '',
        password: '',
        checkPassword: ''
      }
    };
  }

  render() {
    return (
      <ImageBackground style={styles.backgroundContainer} imageStyle={styles.backgroundImage} source={require('../../assets/initial_bg.png')} >
        <StatusBar hidden={true} />
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
        {
          this.state.fontLoaded ? (
            <Text style={[styles.logotipo, {fontFamily: 'hind-bold',fontSize: 32}]}>DOURADOS</Text>
          ) : null
        }
        {
          this.state.fontLoaded ? (
            <Text style={[styles.title, {fontFamily: 'hind-bold',fontSize: 20}]}>CADASTRO</Text>
          ) : null
        }
       
        <View style={styles.registerForm}>
          
            
            <TextField label={'Endereço'} dense={true} highlightColor={'#FFFFFF'} textColor={'#ffffff'} wrapperStyle={{width:'100%'}} onChangeText={(text) => this._updateField(text, 'end')} value={this.state.user.end}/>
            <TextField label={'Nome'} dense={true} highlightColor={'#FFFFFF'} textColor={'#ffffff'} wrapperStyle={{width:'100%'}} onChangeText={(text) => this._updateField(text, 'nome')} value={this.state.user.nome}/>
            <TextField label={'Email'} dense={true} highlightColor={'#FFFFFF'} textColor={'#ffffff'} wrapperStyle={{width:'100%'}} onChangeText={(text) => this._updateField(text, 'email')} keyboardType={'email-address'} value={this.state.user.email}/>
            <TextField label={'Senha'} dense={true} highlightColor={'#FFFFFF'} textColor={'#ffffff'} wrapperStyle={{width:'100%'}} onChangeText={(text) => this._updateField(text, 'password')} secureTextEntry={true} value={this.state.user.password}/>
            <TextField label={'Repita a senha'} dense={true} highlightColor={'#FFFFFF'} textColor={'#ffffff'} wrapperStyle={{width:'100%'}} onChangeText={(text) => this._updateField(text, 'checkPassword')} secureTextEntry={true} value={this.state.user.checkPassword}/>
          
         
        </View>

        <View style={{width: '80%', marginBottom: 10}}>
          <Button 
              title='Cadastrar'
              color='#1E51A4'
              onPress={() => {this._submit_register_form()}}
              accessibilityLabel='Botão que realiza o cadastro do usuário'
            />
        </View>
        <View style={{width: '80%'}}>
          <Button 
              title='Voltar'
              color='#d32f2f'
              onPress={() => {this.props.navigation.navigate('AuthLoading')}}
              accessibilityLabel='Botão que realiza o cadastro do usuário'
            />
        </View>
      </ImageBackground>
    );
  }

  async _submit_register_form() {
    if (this.state.user.password == this.state.user.checkPassword) {
      var user = {
        email: this.state.user.email,
        password: this.state.user.password
      }; 
      this._register(user);
    } else {
      Alert.alert('Senhas não conferem');
    }
  }

  async _register(user) {
    try {
      let response = await fetch('http://'+hostname + ':3000/api/v1/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      let responseJson = await response.json();
      
      Alert.alert(
        'Cadastro',
        responseJson.message,
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('AuthLoading')},
        ],
        { cancelable: false });
      
    } catch (e) {
      console.log(e.message);
    }
  }

  _updateField(text, field) {
    this.setState((prevState) => {
      prevState.user[field] = text;
      return prevState;
    });
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
  backgroundContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  backgroundImage: {
    resizeMode: 'cover',
    top: 0,
    left: 0
  },
  logo: {
    width: 193,
    height: 151,
    marginTop: 13,
    padding: 0,
    shadowColor: '#000000',
    shadowOpacity: 30,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  logotipo: {
    color: '#1E51A4'
  },
  title: {
    color: '#ffffff',
    marginTop: 10
  },
  registerForm: {
    width: '80%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#1E51A4',
    opacity: 0.6,
    marginBottom: 20
  },
  registerButton: {
    backgroundColor: '#1E51A4',
    alignItems: 'center',
    padding: 10,
    width: '80%',
    borderRadius: 2,

  }
});