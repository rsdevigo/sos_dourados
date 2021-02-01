import { Content, Text, Form, Item, Input, Label, Textarea, H2, H3, ListItem, CheckBox, Body, Button, View} from 'native-base';
import React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';

export default class ProblemCreateStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.problem;
    }
    render() {
        return (
            <Content padder >
                {
                    this.props.photo != null &&
                    <View style={styles.alertSuccess}>
                        <Text style={styles.alertSuccessText}>Foto capturada com sucesso!</Text>
                    </View>
                }
                {
                    this.props.photo == null &&
                    <View style={styles.alertDanger}>
                        <Text style={styles.alertDangerText}>Foto ainda não capturada</Text>
                    </View>
                }
                <H2>Informações adicionais</H2>
                
                <Form>
                    <Item style={styles.inputItem} floatingLabel>
                        <Label>Endereço</Label>
                        <Input value={this.state.endereco} onChangeText={(text) => {this.updateField(text, 'endereco')}}/>
                    </Item>
                    <Item style={styles.inputItem} floatingLabel>
                        <Label>Número próximo</Label>
                        <Input value={this.state.numero} onChangeText={(text) => {this.updateField(text, 'numero')}}/>
                    </Item>
                    <Item style={styles.inputItem} floatingLabel>
                        <Label>Bairro</Label>
                        <Input value={this.state.bairro} onChangeText={(text) => {this.updateField(text, 'bairro')}}/>
                    </Item>

                    <Textarea value={this.state.descricao} onChangeText={(text) => {this.updateField(text, 'descricao')}} style={{marginTop: 20, marginBottom: 20}} rowSpan={5} bordered placeholder="Descrição da reclamação" />
                </Form>
                <H3>Categoria(s) da reclamação</H3>
                <ListItem style={styles.inputItem}>
                    <CheckBox onPress={() => {this.updateCategory(!this.state.categorias[1], 1)}} checked={this.state.categorias[1]} />
                    <Body>
                        <Text>Iluminação Pública</Text>
                    </Body>
                </ListItem>
                <ListItem style={styles.inputItem}>
                    <CheckBox onPress={() => {this.updateCategory(!this.state.categorias[2], 2)}} checked={this.state.categorias[2]}/>
                    <Body>
                        <Text>Dano ao Patrimônio Público</Text>
                    </Body>
                </ListItem>
                <ListItem style={styles.inputItem}>
                    <CheckBox onPress={() => {this.updateCategory(!this.state.categorias[3], 3)}} checked={this.state.categorias[3]}/>
                    <Body>
                        <Text>Limpeza Pública</Text>
                    </Body>
                </ListItem>
                <ListItem style={styles.inputItem}>
                    <CheckBox onPress={() => {this.updateCategory(!this.state.categorias[4], 4)}} checked={this.state.categorias[4]}/>
                    <Body>
                        <Text>Tapa Buraco</Text>
                    </Body>
                </ListItem>
                <Button block onPress={() => {this.validate()}}>
                    <Text>Próximo passo</Text>
                </Button>
            </Content>
        )
    }

    updateField(text, field) {
        let newState = {
            ...this.state,
            [field]: text
        }
        this.props.updateProblem(newState);
        this.setState(newState);
    }

    updateCategory(state, id) {
        let newState = {
            ...this.state,
            categorias: {...this.state.categorias, [id]: state}
        }
        this.props.updateProblem(newState);
        this.setState(newState);
    }

    validate() {
        if (this.state.endereco == '') {
            Alert.alert("Preencha o endereço");
            return;
        }

        if (this.state.bairro == '') {
            Alert.alert("Preencha o bairro");
            return;
        }

        if (this.state.numero == '') {
            Alert.alert("Preencha o numero");
            return;
        }

        if (this.state.descricao == '') {
            Alert.alert("Preencha a descrição da reclamação");
            return;
        }
        this.props.changeStep(3);
    }
}

const styles = StyleSheet.create({
    inputItem: {
        marginLeft: 0, 
        margin: 0, 
        padding: 0, 
    },
    alertSuccess : {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5
    },
    alertSuccessText: {
        color: '#155724'
    },
    alertDanger : {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5
    },
    alertDangerText: {
        color: '#721c24'
    }
})