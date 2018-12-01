import React from 'react';
import { Button } from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/pages/login-screen';
import AuthLoadingScreen from './src/pages/auth-loading-screen';
import RegisterScreen from './src/pages/register-screen';
import ProblemScreen from './src/pages/problem-screen';
import TabNavigator from './src/pages/tab-screen';
import TabNavigatorDetails from './src/pages/tab-details';
import LogoTitle from './src/components/logo-title';
import LogoutButton from './src/components/logout-button';
global.self = global;

const Rotas = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      }
    },
    AuthLoading: {
      screen: AuthLoadingScreen,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null,
      }
    },
    Problem: {
      screen: ProblemScreen,
      navigationOptions: {
        headerTitle: <LogoTitle />,
        headerRight: (
          <LogoutButton />
        ),
        headerTitleContainerStyle: {
          paddingBottom: 12,
        },
        headerLeftContainerStyle: {
          marginRight: 0,
          padding: 0,
        }
      }
    },
    Tab: {
      screen: TabNavigator,
      navigationOptions: {
        headerTitle: <LogoTitle />,
        headerRight: (
          <LogoutButton />
        ),
        headerLeft: null
      }
    }
    TabDetails: {
      screen: TabNavigatorDetails,
      navigationOptions: {
        headerTitle: <LogoTitle />,
        headerRight: (
          <LogoutButton />
        ),
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F8D253',
        elevation: 0,
        shadowOpacity: 0,
        height: 80
      },
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Rotas />
    );
  }
      
  
}
