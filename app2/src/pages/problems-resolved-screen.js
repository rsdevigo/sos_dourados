import React from 'react';
import { Text, ScrollView, View, AsyncStorage, NativeModules, RefreshControl } from 'react-native';
import Problem from '../components/problem';
import { FloatingAction } from 'react-native-floating-action';
import parse from 'url-parse';
import ProblemsScreen from './problems-screen';
const {hostname} = parse(NativeModules.SourceCode.scriptURL, true);


export default class ProblemsResolvedScreen extends ProblemsScreen {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            problems: []
        };
        this.filter = 'Resolvida';
    }
}