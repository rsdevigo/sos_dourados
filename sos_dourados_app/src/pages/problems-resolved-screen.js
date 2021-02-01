import React from 'react';
import { NativeModules } from 'react-native';
import ProblemsScreen from './problems-screen';



export default class ProblemsResolvedScreen extends ProblemsScreen {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            problems: [],
            loadingProblems: true
        };
        this.filter = 'Resolvida';
    }
}