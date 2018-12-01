import React from 'react';
import { Text, ScrollView, View, AsyncStorage, NativeModules, RefreshControl } from 'react-native';
import Problem from '../components/problem';
import { FloatingAction } from 'react-native-floating-action';
import parse from 'url-parse';
const {hostname} = parse(NativeModules.SourceCode.scriptURL, true);

const actions = [{
    text: 'Criar uma nova reclamação',
    icon: require('../../assets/details_icon.png'),
    name: 'add_problem',
    position: 1
  }, {
    text: 'Visualizar Mapa',
    icon: require('../../assets/details_icon.png'),
    name: 'map_view',
    position: 2
  }];

export default class ProblemsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            problems: []
        };
        this.filter = 'Todas';
    }

    async componentDidMount() {
        await this._getProblems();
    }
    async _getProblems () {
        token = await AsyncStorage.getItem('current_user_token');
        console.log(token);
        let result = await fetch('http://'+hostname + ':3000/api/v1/problems/'+this.filter, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
        result = await result.json();

        this.setState(function(prevState){
            prevState.problems = result;
            return prevState;
        });
    }

    async _onRefresh () {
        this.setState(function(prevState){
            prevState.refreshing = true;
            return prevState;
        });
        await this._getProblems();
        this.setState(function(prevState){
            prevState.refreshing = false;
            return prevState;
        });
    }
    
    renderProblem (problem) {
        
        return <Problem key={problem.id} endereco={`${problem.endereco}, ${problem.numero}`} categorias={problem.categories.join(', ')} data={problem.reclamacao_criado_em} />
    }

    render() {
        return (
            <View>
                <ScrollView style={{backgroundColor: '#ffffff', height: '100%'}} refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />
                    }
                >
                {
                    this.state.problems.length > 0 ? (
                        this.state.problems.map(this.renderProblem.bind(this))
                    ) : null
                }
                </ScrollView>
                <FloatingAction
                actions={actions}
                onPressItem={
                    (name) => {
                        switch(name) {
                            case 'add_problem':
                                this.props.navigation.navigate('Problem');
                            break;
                            case 'map_view':
                            break;
                        }
                    }
                }
                />
            </View>
        );
    }
}