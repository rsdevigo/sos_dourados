import React from "react";
import { ImageBackground, StyleSheet, StatusBar, Image, NativeModules, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Grid, Col, Row} from 'react-native-easy-grid';
import { Container, Form, Item, Input, Label, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import parse from 'url-parse';
const {hostname} = parse(NativeModules.SourceCode.scriptURL, true);

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        nome: '',
        email: '',
        password: '',
        checkPassword: ''
      }
    };
  }

  render() {
      return (
          <Container>
              <StatusBar hidden={true} />
              <ImageBackground style={styles.backgroundContainer} imageStyle={styles.backgroundImage} source={require('../../assets/initial_bg.png')} style={{width: '100%', height: '100%'}}>
              <Grid>
                <Col style={{ alignItems: 'center', justifyContent: 'center'}}>
                  <Row size={0.9} style={{margin: 0, padding: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={require('../../assets/logo.png')} style={styles.logo} />
                      <Text style={[styles.logotipo, {fontFamily: 'Roboto_medium', fontSize: 32}]} >DOURADOS</Text>
                      <Text style={[styles.logotipo, {fontFamily: 'Roboto_medium', fontSize: 32}]} >Cadastro</Text>
                  </Row>
                  <Row size={2} style={{margin: 0, padding: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Form style={styles.loginForm}>
                        <Item style={styles.inputItem} floatingLabel>
                            <Label style={styles.input}>Nome</Label>
                            <Input style={styles.input} value={this.state.user.nome} onChangeText={text => this.updateField(text, 'nome')} />
                        </Item>
                        <Item style={styles.inputItem} floatingLabel>
                            <Label style={styles.input}>Email</Label>
                            <Input style={styles.input} textContentType='emailAddress' value={this.state.user.email} onChangeText={text => this.updateField(text, 'email')} />
                        </Item>
                        <Item style={styles.inputItem} floatingLabel>
                            <Label style={styles.input}>Senha</Label>
                            <Input style={styles.input} secureTextEntry={true} value={this.state.user.password} onChangeText={text => this.updateField(text, 'password')} />
                        </Item>
                        <Item style={styles.inputItem} floatingLabel>
                            <Label style={styles.input}>Repita a senha</Label>
                            <Input style={styles.input} secureTextEntry={true} value={this.state.user.checkPassword} onChangeText={text => this.updateField(text, 'checkPassword')} />
                        </Item>
                    </Form>
                    <Button onPress={() => {this._submit_register_form()} } full style={styles.loginButton}>
                      <Text>Registrar</Text>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate('Login')}} full style={styles.registerButton}>
                      <Text>Voltar</Text>
                    </Button>
                  </Row>
                </Col>
              </Grid>
              </ImageBackground>
          </Container>
      )
  }

  updateField(text, field) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [field]: text
      }
    })
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
          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
        ],
        { cancelable: false });
      
    } catch (e) {
      console.log(e.message);
    }
  }
}

const styles = StyleSheet.create({
    backgroundContainer: {
      margin: 0,
      padding: 0,
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    backgroundImage: {
      resizeMode: 'cover',
      top: 0,
      left: 0
    },
    logo: {
      width: 130,
      height: 101,
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
    input: {
        color: '#ffffff',
        margin: 0, padding: 0,
        borderWidth: 0
    },
    inputItem: {
      marginLeft: 10, 
      margin: 10, 
      padding: 0, 
    },
    title: {
      color: '#ffffff',
      marginTop: 10
    },
    loginForm: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#1E51A4',
      opacity: 0.7,
      padding: 0
    },
    loginButton: {
      backgroundColor: '#1E51A4',
      padding: 10,
      borderRadius: 2,
      marginBottom: 10
    },
    registerButton: {
      backgroundColor: '#5b7dd6',
      padding: 10,
      borderRadius: 2,
      marginBottom: 10
    }
  });