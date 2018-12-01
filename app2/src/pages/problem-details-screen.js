import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image, AsyncStorage, NativeModules } from 'react-native';
import parse from 'url-parse';
const {hostname} = parse(NativeModules.SourceCode.scriptURL, true);

export default class ProblemDetailsScreen extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				photo: '',
				category: '',
				description: '',
				situation: '',
				date: '',
				id: 0
			}
		}

		async componentDidMount () {
			await this._getProblem();
		}

		async _getProblem() {
			let problemId = this.props.navigation.getParam('id');
			token = await AsyncStorage.getItem('current_user_token');
        console.log(token);
        let result = await fetch('http://'+hostname + ':3000/api/v1/problem/'+problemId, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
				result = await result.json();
				this.setState({
					photo: '',
					category: result.categories.join(', '),
					description: result.descricao,
					situation: result.states[0].nome_est_rec,
					date: result.reclamacao_criado_em,
					id: result.id
				})
		}

		formatDate (date) {
			let d = new Date(date);
			return d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
		}

    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff'}} contentContainerStyle={{padding: 8}}>
							<Image source={require('../../assets/lampada.jpg')} style={styles.foto}/>
							<Text style={styles.category}>{this.state.category} - {this.formatDate(this.state.date)}</Text>              	
							<Text style={styles.problemaComentario}>{this.state.description}</Text>
							<Text>Situação: {this.state.situation} </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  foto: {
  	width: 340,
    height: 255
  },
  category: {
  	fontSize: 12,
		color: '#333333',
		marginBottom: 16,
		textAlign: 'justify'
  },
  problemaComentario:{
  	fontSize: 13,
		color: '#333333',
		textAlign: 'justify',
		marginBottom: 16
  }
});