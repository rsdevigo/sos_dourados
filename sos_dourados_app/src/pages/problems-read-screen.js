import React from 'react';
import { Text, ScrollView, View, NativeModules, RefreshControl } from 'react-native';
import ProblemsScreen from './problems-screen';


export default class ProblemsReadScreen extends ProblemsScreen {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            problems: [],
            loadingProblems: true
        };
        this.filter = 'Lida';
    }
}