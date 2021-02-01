import React from 'react';
import { StyleSheet, Image, NativeModules, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { Col, Container, Content, Grid, Text, View, Row, Spinner, Button } from 'native-base';
import LogoTitle from '../components/logo-title';

export default class ProblemDetailsScreen extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				photo: '',
				category: '',
				description: '',
				situation: '',
				date: '',
				id: 0,
				address: '',
				number: '',
				latitude: 0.0,
				longitude: 0.0,
				loadingProblem: true,
				useAddress: false,
				loadError: false
			}
		}

		async componentDidMount () {
			await this._getProblem();
		}

		// async componentDidUpdate() {
		// 	await this._getGeoCode();
		// }


		async _getProblem() {
			let problemId = this.props.route.params.id;
			token = await AsyncStorage.getItem('current_user_token');
			try {
				let result = await fetch(Config.API_URL+'/problem/'+problemId, {
					method: 'GET',
					headers: {
						'Content-Type' : 'application/x-www-form-urlencoded', 
						'Accept' : 'application/json',
						'Authorization' : `Bearer ${token}`
					}
				});
				if (result.status == 200) {
					result = await result.json();
				
					this.setState({
						...this.state,
						photo: result.photo,
						category: result.categories.join(', '),
						description: result.descricao,
						situation: result.states[0].nome_est_rec,
						date: result.reclamacao_criado_em,
						id: result.id,
						address: result.endereco,
						number: result.numero,
						latitude: result.local_lat,
						longitude: result.local_long,
						loadingProblem: false,
						loadError: false,
						useAddress: (result.local_lat == 0.0 && result.local_long == 0.0) ? true : false
					});
				} else if(result.status == 401) {
					await AsyncStorage.clear();
				} else {
					throw result;
				}
				
			} catch(e) {
				this.setState( {
					...this.state,
					loadingProblem: false,
					loadError: true
				});
			}
			
		}

		formatDate (date) {
			let d = new Date(date);
			return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
		}

    render() {
		if (this.state.loadingProblem) {
			return (
				<Container>
					<LogoTitle hasBack />
					<Content>
						<Spinner color='blue' />
					</Content>
				</Container>
			);
		} else if (!this.state.loadError) {
			return (
				<Container>
					<LogoTitle hasBack />
					<Content style={{padding: 0}}>
						<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 250, marginTop: 10}}>
							<Image source={{uri: Config.PHOTOS_URL+this.state.photo}} style={styles.foto} />
						</View>
						<View style={{marginTop: 10, padding: 10, backgroundColor: "#1E51A4"}}>
							<Grid>
								<Row style={{alignItems: 'flex-start', marginBottom: 10}}>
									<Col size={1} style={{alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style={{color: '#ffffff'}}>Categoria</Text>
									</Col>
									<Col size={2} style={{alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style={styles.category}>{this.state.category} - {this.formatDate(this.state.date)}</Text>
									</Col>
								</Row>
								<Row style={{alignItems: 'flex-start', marginBottom: 10}}>
									<Col size={1}>
										<Text style={{color: '#ffffff'}}>Descrição</Text>
									</Col>
									<Col size={2}>
										<Text style={styles.problemaComentario}>{this.state.description}</Text>
									</Col>
								</Row>
								<Row style={{alignItems: 'flex-start', marginBottom: 10}}>
									<Col size={1}>
										<Text style={{color: '#ffffff'}}>Situação</Text>
									</Col>
									<Col size={2}>
										<Text style={styles.problemaComentario}>{this.state.situation} </Text>
									</Col>
								</Row>
								<Row style={{alignItems: 'flex-start'}}>
									<Col size={1}>
										<Text style={{color: '#ffffff'}}>Localização</Text>
									</Col>
									<Col size={2}>
										<Text style={styles.problemaComentario}>{this.state.address}, {this.state.number}</Text>
									</Col>
								</Row>
							</Grid>
						</View>
						{!this.state.useAddress && !this.state.loadingProblem ? (
							<MapView style={styles.map} initialRegion={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.002, longitudeDelta: 0.001}}>
								<Marker title="Endereço" description={`${this.state.address}, ${this.state.number}`} coordinate={{ latitude : this.state.latitude , longitude : this.state.longitude }}/>
							</MapView>
						) : null}
						
					</Content>
				</Container>
			);
		} else {
			return (
			<Container>
				<LogoTitle hasBack />
				<Content>
					<Text style={{textAlign: 'center', margin: 10}}>Houve algum erro no carregamento da reclamação.</Text>
					<Button onPress={async() => {await this._getProblem();}} style={{alignSelf: 'center'}}>
						<Text>Tentar novamente</Text>
					</Button>
				</Content>
			</Container>);
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