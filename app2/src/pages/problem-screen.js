import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, Image, Button} from 'react-native';
//import { Camera, Permissions, Location, Constants } from 'expo';
import { Camera } from 'expo-camera'
import Constants from 'expo-constants'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import CheckBox from 'react-native-checkbox';

export default class ProblemScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      step: 1,
      photo: null,
      categories: {1: false, 2: false, 3: false, 4: false},
      location: null,
      address: '',
      number: '',
      description: ''
    },
    this.camera = null
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("Permissão para localização foi negada");
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState(function(prevState){
      prevState.location = location;
      return prevState;
    });
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.problemFormContainer}>
          <View style={styles.problemActualStepContainer}>
            { 
              this.state.step == 1 ? (
                <Camera 
                style={{ flex: 1 }} 
                type={this.state.type} 
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={Camera.Constants.FlashMode.auto}
                ref={ref => { this.camera = ref; }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    <TouchableOpacity onPress={()=>{ this._snap() }}
                      style={{
                        flex: 0.1,
                        alignSelf: 'flex-end', 
                        alignItems: 'center',
                        margin: 16
                      }}>
                      <View style={{width: 64, height: 64, backgroundColor: '#1E51A4', borderRadius: 32}}>
                        <View style={{width: 32, height: 32, backgroundColor: '#F8D253', borderRadius: 16, margin: 16}}></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Camera>
              ) : null
            }
            { 
              this.state.step == 2 ? (
                <ScrollView contentContainerStyle={{padding: 8}} >
                  <Text style={styles.h1}>Categoria do problema</Text>
                  <View style={styles.problemCategory}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <CheckBox label="Dano ao Patrimônio Público" checked={this.state.categories[1]} onChange={(checked) => {this._checkCategory(!checked, 1)}} />
                      <View style={{height: 1, width: '100%', marginTop: 8, marginLeft: 32, backgroundColor: '#1E51A4'}}></View>
                    </View>
                  </View>
                  <View style={styles.problemCategory}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <CheckBox label="Iluminação Pública" checked={this.state.categories[2]} onChange={(checked) => {this._checkCategory(!checked, 2)}} />
                      <View style={{height: 1, width: '100%', marginTop: 8, marginLeft: 32, backgroundColor: '#1E51A4'}}></View>
                    </View>
                  </View>
                  <View style={styles.problemCategory}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <CheckBox label="Limpeza Pública" checked={this.state.categories[3]} onChange={(checked) => {this._checkCategory(!checked, 3)}} />
                      <View style={{height: 1, width: '100%', marginTop: 8, marginLeft: 32, backgroundColor: '#1E51A4'}}></View>
                    </View>
                  </View>
                  <View style={styles.problemCategory}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <CheckBox label="Tapa Buraco" checked={this.state.categories[4]} onChange={(checked) => {this._checkCategory(!checked, 4)}} />
                      <View style={{height: 1, width: '100%', marginTop: 8, marginLeft: 32, backgroundColor: '#1E51A4'}}></View>
                    </View>
                  </View>
                  <Text style={styles.h1}>Localização</Text>
                  <Text style={styles.p}>Endereço:</Text>
                  <TextInput 
                    onChangeText={(text) => this._updateField(text, 'address')}
                    value={this.state.address}
                    style={{height: 40, padding: 8}}
                    underlineColorAndroid= '#1E51A4'
                    placeholder={'Endereço'}
                  />
                  <Text style={styles.p}>Número próximo:</Text>
                  <TextInput 
                    onChangeText={(text) => this._updateField(text, 'number')}
                    value={this.state.number}
                    style={{height: 40, padding: 8}}
                    underlineColorAndroid= '#1E51A4'
                    placeholder={'Número'}
                  />
                  <Text style={styles.p}>Descrição do problema:</Text>
                  <TextInput 
                    onChangeText={(text) => this._updateField(text, 'description')}
                    value={this.state.description}
                    style={{padding: 8, textAlignVertical: 'top'}}
                    underlineColorAndroid= '#1E51A4'
                    multiline={true}
                    numberOfLines={4}
                    placeholder={'Descrição'}
                  />
                </ScrollView>
              ) : null
            }
            { 
              this.state.step == 3 ? (
                <ScrollView contentContainerStyle={{padding: 8}} >
                  <Image style={{width: 340, height: 255}} source={{uri: this.state.photo.uri}} />
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 16}}>
                    <Text style={{fontWeight: 'bold', fontSize: 12}}>Iluminação Pública, Dano ao Patrimônio Público, Limpeza Pública, Tapa Buraco</Text>
                  </View>
                  <Text style={{marginBottom: 16}}>{this.state.description}</Text>
                  <Text>Endereço: {this.state.address}, {this.state.number}</Text>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 16}}>
                    <View style={{width: '50%', paddingRight: 8}}>
                      <Button 
                          onPress={()=>{this.props.navigation.navigate('Tab')}}
                          title='Cancelar'
                          color='#FF0000'
                        />
                    </View>
                    <View style={{width: '50%', paddingLeft: 8}}>
                      <Button 
                          onPress={()=>{this._createProblem()}}
                          title='Confirmar'
                          color='#009900'
                        />
                    </View>
                  </View>
                </ScrollView>
              ) : null
            }
          </View>
          
          <View style={styles.problemStepperContainer} >
            <View style={styles.problemStepNumberContainer}>
              <TouchableOpacity onPress={() => {this._changeTab(1)}}>
                <View style={styles.problemStep}>
                  <View style={[styles.stepNumber, this.state.step == 1?null:{backgroundColor: '#123266'}]}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepDesc}>Material</Text>
                </View>
              </TouchableOpacity>
              <View style={{height: 1, flexGrow: 2, marginTop: 15, backgroundColor: '#ffffff'}}></View>
              <TouchableOpacity onPress={() => {this._changeTab(2)}}>
                <View style={[styles.problemStep]}>
                  <View style={[styles.stepNumber, this.state.step == 2?null:{backgroundColor: '#123266'}]}>
                    <Text style={[styles.stepNumberText]}>2</Text>
                  </View>
                  <Text style={styles.stepDesc}>Descrição</Text>
                </View>
              </TouchableOpacity>
              <View style={{height: 1, flexGrow: 2, marginTop: 15, backgroundColor: '#ffffff'}}></View>
              <TouchableOpacity onPress={() => {this._changeTab(3)}}>
                <View style={styles.problemStep}>
                <View style={[styles.stepNumber, this.state.step == 3?null:{backgroundColor: '#123266'}]}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepDesc}>Revisão</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  _changeTab(step) {
    this.setState(function(prevState){
      prevState.step = step;
      return prevState;
    })
  }

  _checkCategory(checked, categoryId) {
    this.setState(function(prevState){
      prevState.categories[categoryId] = checked;
      return prevState;
    })
  }

  _updateField(value, field) {
    this.setState(function(prevState){
      prevState[field] = value;
      return prevState;
    })
  }

  async _createProblem() {
    this.setState(function(prevState){
      prevState.step = 1;
      prevState.photo = null;
      prevState.categories = {1: false, 2: false, 3: false, 4: false};
      prevState.location = null;
      prevState.address = '';
      prevState.number = '';
      prevState.description = '';
      return prevState;  
    });
    this.props.navigation.navigate('Tab');
  }

  async _snap() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
      this.setState(function(prevState){
        prevState.step = 2;
        prevState.photo = photo;
        return prevState;
      });
    }
  }
};


const styles = StyleSheet.create({
  problemFormContainer: {
    flex: 1,
  },
  problemStepperContainer: {
    height: '15%',
    backgroundColor: '#1E51A4',
    padding: 8,
    paddingTop: 15
  },
  problemStepNumberContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  problemStep: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepNumber: {
    padding: 0,
    margin: 0,
    backgroundColor: '#F8D253', 
    width: 24, 
    height: 24, 
    borderRadius: 12
  },
  stepNumberText: {
    textAlign: 'center',
    margin: 0,
    padding: 0, 
    fontSize: 12, 
    fontWeight: 'bold', 
    lineHeight: 24
  },
  stepDesc: {
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 14
  },
  problemActualStepContainer: {
    height: '85%'
  },
  h1: {
    fontSize: 16, 
    fontWeight: 'bold', 
    fontFamily: 'Roboto'
  },
  p: {
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  problemCategory: {
    height: 34,
    marginTop: 8,
    marginBottom: 8,
    width: '100%'
  }
});