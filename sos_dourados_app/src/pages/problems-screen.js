import React from 'react';
import {NativeModules, RefreshControl, FlatList, Alert } from 'react-native';
import { Fab, Text, Container, Content, View, Button, Spinner, Icon } from 'native-base';
import Problem from '../components/problem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env";

export default class ProblemsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            problems: [],
            loadingProblems: true,
            loadError: false
        };
        this.filter = 'Todas';
        this._unsubscribe;
    }

    async componentDidMount() {
        await this._getProblems();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this._getProblems();
          });
    }

    async componentWillUnmount() {
        this._unsubscribe();
    }

    async _getProblems () {
        console.log(API_URL);
        
        try {
            let token = await AsyncStorage.getItem('current_user_token');
            let result = await fetch(API_URL+'/problems/'+this.filter, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json', 
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            if (result.status == 200) {
                result = await result.json();
                this.setState( {
                    ...this.state,
                    problems: result,
                    loadingProblems: false,
                    loadError: false
                });
            } else if(result.status == 401) {
                await AsyncStorage.clear();
            } else {
                throw result;
            }
        } catch (e) {
            this.setState( {
                ...this.state,
                loadingProblems: false,
                loadError: true
            });
        }
        
    }

    async _onRefresh () {
        this.setState( {
            ...this.state,
            refreshing: true
        });
        await this._getProblems();
        this.setState( {
            ...this.state,
            refreshing: false
        });
    }
    
    renderProblem (problem) {
        return <Problem id={problem.id} endereco={`${problem.endereco}, ${problem.numero}`} categorias={problem.categories.join(', ')} data={problem.reclamacao_criado_em} photo={problem.photo} />
    }

    render() {
        if (this.state.loadingProblems) {
            return (
                <Container>
                    <Content>
						<Spinner color='blue' />
					</Content>
                </Container>
            );
        } else if (!this.state.loadError){
            return (
                <Container>
                    <FlatList
                        data={this.state.problems}
                        renderItem={({item}) => {return this.renderProblem(item)}}
                        keyExtractor={item => item.id.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                </Container>
            );
        } else {
            return (
                <Container>
                   <Content>
                        <Text style={{textAlign: 'center', margin: 10}}>Houve algum erro no carregamento das reclamações.</Text>
                        <Button onPress={async() => {await this._getProblems();}} style={{alignSelf: 'center'}}>
                            <Text>Tentar novamente</Text>
                        </Button>
                   </Content>
                </Container>
            );
        }
        
    }
}