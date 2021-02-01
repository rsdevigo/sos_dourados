import React, { useState } from 'react';
import {Container, Content, Spinner, Button, Text, View, Grid, Row, Col, H1, Icon, Input, Item} from 'native-base';
import LogoTitle from '../components/logo-title';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env";
import { LinearGradient } from 'expo-linear-gradient';

const fetcher = async (url) => {
    let token = await AsyncStorage.getItem('current_user_token');
    console.log(url);
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
}

function useUser () {
    const { data, error } = useSWR(`${API_URL}/user`, fetcher)
    return {
        user: data,
        loading: !error && !data,
        error: error
    }
}


export default function ProfileScreen({navigation}) {
    const { user, loading, error } = useUser(fetcher);
    return (
        <Container>
            <LogoTitle hasBack />
            <Content>
                {
                    loading && 
                    <>
                        <Spinner  color="blue" />
                        <Text style={{textAlign: 'center'}}>Carregando informações do usuário</Text>
                    </>
                }
                {
                    !loading && 
                    <>
                        <Grid>
                            <Row>
                                <Col style={{height: 200}}>
                                    <LinearGradient style={{flex: 1, width: '100%', paddingBottom: 60, justifyContent: 'flex-end', alignItems: 'center'}} 
                                        colors={['#4c669f', '#3b5998', '#1E51A4']}>
                                        <H1 style={{textAlign: 'center', fontFamily: 'Roboto_medium', fontSize: 23, color: '#ffffff'}}>{user.nome}</H1>
                                        <Text style={{color: '#ffffff'}}><Icon name="location" style={{color: '#ffffff', fontSize: 24}} /> {user.endereco}, {user.numero_casa}</Text>
                                    </LinearGradient>
                                </Col>
                            </Row>
                            <Row style={{padding: 10, paddingTop: 30}}>
                                <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="mail" style={{color: '#1E51A4', fontSize: 32}} />
                                </Col>
                                <Col size={3} style={{justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'Roboto', fontSize: 16}}>{user.email}</Text>
                                </Col>
                            </Row>
                            <Row style={{padding: 10, paddingTop: 30}}>
                                <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="call" style={{color: '#1E51A4', fontSize: 32}} />
                                </Col>
                                <Col size={3}>
                                    <Text>{user.fone}</Text>
                                </Col>
                            </Row>
                            <Row style={{padding: 10, paddingTop: 30}}>
                                <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="card" style={{color: '#1E51A4', fontSize: 32}} />
                                </Col>
                                <Col size={3}>
                                    <Text>{user.cpf}</Text>
                                </Col>
                            </Row>
                        </Grid>
                        <Item>
            <Icon active name='home' />
            <Input placeholder='Icon Textbox'/>
          </Item>
                    </>
                }
            </Content>
        </Container>
    );
}