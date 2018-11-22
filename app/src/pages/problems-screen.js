import React from 'react';
import { Text, ScrollView } from 'react-native';
import Problem from '../components/problem';

export default class ProblemsScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff'}}>
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
            </ScrollView>
        );
    }
}