import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { Col, Container, Content, Grid, Text, View, Row, Spinner, Button } from 'native-base';
import { StyleSheet, Image, NativeModules, Dimensions, Alert } from 'react-native';
import {API_URL, PHOTOS_URL} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const categorias = ['Iluminação Pública', 'Dano ao Patrimônio Público', 'Limpeza Pública', 'Tapa Buraco'];

export default class ProblemCreateStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatingProblem: false
        }
    }

    render() {
        let categoriesText = [];
        for(var i = 0; i < categorias.length; i++) {
            if (this.props.problem.categorias[i+1]) {
                categoriesText.push(categorias[i]);
            }
        }
        if (this.state.creatingProblem) {
            return (
                <Content style={{padding: 0}}>
					<Spinner color='blue' />
                    <Text style={{textAlign: 'center'}}>Enviando problema para o servidor.</Text>
                </Content>
            );
        } else {
            return (
                <Content style={{padding: 0}}>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, marginTop: 10}}>
                        {this.props.photo && <Image source={{uri: this.props.photo.uri}} style={styles.foto} />}
                        {!this.props.photo && <Text style={{textAlign: 'center'}}>Capture uma foto do problema</Text>}
                    </View>
                    <View style={{marginTop: 10, padding: 10, backgroundColor: "#1E51A4"}}>
                        <Grid>
                            <Row style={{alignItems: 'flex-start', marginBottom: 10}}>
                                <Col size={1} style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={{color: '#ffffff'}}>Categoria</Text>
                                </Col>
                                <Col size={2} style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={styles.category}>{categoriesText.join(', ')}</Text>
                                </Col>
                            </Row>
                            <Row style={{alignItems: 'flex-start', marginBottom: 10}}>
                                <Col size={1}>
                                    <Text style={{color: '#ffffff'}}>Descrição</Text>
                                </Col>
                                <Col size={2}>
                                    <Text style={styles.problemaComentario}>{this.props.problem.descricao}</Text>
                                </Col>
                            </Row>
                            <Row style={{alignItems: 'flex-start'}}>
                                <Col size={1}>
                                    <Text style={{color: '#ffffff'}}>Localização</Text>
                                </Col>
                                <Col size={2}>
                                    <Text style={styles.problemaComentario}>{this.props.problem.endereco}, {this.props.problem.numero} - {this.props.problem.bairro}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    <Button block success style={{marginTop: 10, marginBottom: 10}} onPress={() => {this.initSendingProblem()}}>
                        <Text>Enviar reclamação</Text>
                    </Button>
                </Content>
            );
        }
        
    }

    async componentDidUpdate() {
        if (this.state.creatingProblem) {
            this.createProblem();
        }
    }

    initSendingProblem() {
        if (!this.props.photo) {
            Alert.alert("Capture uma foto do problema");
            return;
        } else {
            this.setState({
                creatingProblem: true
            });
        }
    }

    async createProblem() {
        let result = await this.uploadImageAsync(this.props.photo.uri);
        if (result) {
            let problem = {
                ...this.props.problem,
                id_midia: result.midia.id
            }
            this.sendProblem(problem);
        }
    }

    async sendProblem(problem) {
        let token = await AsyncStorage.getItem('current_user_token');
        try {
            let result = await fetch(API_URL+'/problem', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
                body: JSON.stringify(problem)
            });
            if (result.status == 200) {
                result = await result.json();
                this.setState( {
                    ...this.state,
                    creatingProblem: false
                });
                this.props.navigation.navigate('Tab');
            } else if(result.status == 401) {
                await AsyncStorage.clear();
            } else {
                throw result;
            }
        } catch (e) {
            Alert.alert("Desculpe-nos houve algum erro ao enviar o problema, tente novamente.");
            this.setState( {
                ...this.state,
                creatingProblem: false
            });
            return null;
        }
      }

    async uploadImageAsync(photoUri) {
        let token = await AsyncStorage.getItem('current_user_token');
        let name = photoUri.split('/').pop();
        let uriParts = photoUri.split('.');
        let type = 'image/'+uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('photo', {
            uri: photoUri,
            name: name,
            type: type
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`,
            },
        };
        try {
            let result = await fetch(API_URL+'/midia/', options);
            if (result.status == 200) {
                result = await result.json();
                return result;
            } else if(result.status == 401) {
                await AsyncStorage.clear();
            } else {
                throw result;
            }
        } catch(e) {
            Alert.alert(e.message);
            this.setState( {
                ...this.state,
                creatingProblem: false
            });
            return null;
        }
    }
}

const styles = StyleSheet.create({
    foto: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    category: {
      fontSize: 13,
      color: '#ffffff',
      textAlign: 'justify'
    },
    problemaComentario:{
        fontSize: 13,
      color: '#ffffff',
      textAlign: 'justify',
    },
    map: {
      width: '100%',
      height: 300,
    },
  });