import React from 'react';
import AppLoading from 'expo-app-loading';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/login';
import RegisterScreen from './src/pages/register';
import TabNavigator from './src/pages/tab-screen';
import ProblemDetailsScreen from './src/pages/problem-details-screen';
import ProblemCreateScreen from './src/pages/problem-create-screen';
import ProfileScreen from './src/pages/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen() {
  return (
    <Container>
      <Text>Home Screen</Text>
    </Container>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoading: true,
      token: null
    };
  }

  async _bootstrapAsync() {
    return await AsyncStorage.getItem('current_user_token');    
  };

  async componentDidMount() {
    var token = await this._bootstrapAsync();
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true, token: token });
  }

  async componentDidUpdate() {
    var token = await this._bootstrapAsync();
    this.setState({ ...this.state, token: token });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {this.state.token == null ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
              </>
            ) : (
              <>
              <Stack.Screen name="Tab" component={TabNavigator} />
              <Stack.Screen name="ProblemDetails" component={ProblemDetailsScreen} />
              <Stack.Screen name="ProblemCreate" component={ProblemCreateScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}
