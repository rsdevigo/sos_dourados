import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import LogoTitle from '../components/logo-title';
import ProblemCreateStepOne from '../components/problem-create-step1';
import ProblemCreateStepTwo from '../components/problem-create-step2';
import ProblemCreateStepThree from '../components/problem-create-step3';



export default class ProblemCreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            photo: null,
            problem: {
                endereco: '',
                bairro: '',
                numero: '',
                descricao: '',
                categorias: {1: false, 2: false, 3: false, 4: false},
                local_lat: 0,
                local_long: 0
            }
        }
    }

    changePhoto(photo) {
        this.setState({
            ...this.state,
            photo: photo,
            step: 2
        })
    }

    render() {
        return (
            <Container>
                <LogoTitle hasBack />
                {this.state.step == 1 && <ProblemCreateStepOne updatePhoto={(photo) => this.changePhoto(photo)} />}
                {this.state.step == 2 && <ProblemCreateStepTwo photo={this.state.photo} changeStep={(step) => {this.changeStep(step)}} problem={this.state.problem} updateProblem={ (problem) => this.updateProblem(problem)}/>}
                {this.state.step == 3 && <ProblemCreateStepThree photo={this.state.photo} problem={this.state.problem} navigation={this.props.navigation}/>}
                <Footer>
                    <FooterTab>
                    <Button onPress={() => {this.changeStep(1)}} vertical active={this.state.step == 1 ? true : false} >
                        <Icon name="camera" />
                        <Text>Material</Text>
                    </Button>
                    <Button onPress={() => {this.changeStep(2)}} vertical active={this.state.step == 2 ? true : false}>
                        <Icon name="document-text" />
                        <Text>Descrição</Text>
                    </Button>
                    <Button vertical active={this.state.step == 3 ? true : false}>
                        <Icon active name="checkmark" />
                        <Text>Revisão</Text>
                    </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    changeStep(newStep) {
        this.setState({
            ...this.state,
            step: newStep
        })
    }

    updateProblem(problem) {
        this.setState({
            ...this.state,
            problem: problem
        })
    }
}