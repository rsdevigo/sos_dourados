import React, { useState } from 'react';
import {Container, Content, Spinner, Button, Text, View} from 'native-base';
import LogoTitle from '../components/logo-title';


export default function ProfileScreen({navigation}) {
    const [state, setState] = useState({
        token: '',
        user: {
            nome: '',
            email: '',
            senha: '',
            confirmar_senha: ''
        },
        loadingUser: true
    });

    return (
        <Container>
            <LogoTitle hasBack />
            <Content>
                <Text>Profile</Text>
            </Content>
        </Container>
    );
}