import React from 'react';
import { Button } from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/pages/login-screen';
import AuthLoadingScreen from './src/pages/auth-loading-screen';
import RegisterScreen from './src/pages/register-screen';
import TabNavigator from './src/pages/tab-screen';
import TabNavigatorDetails from './src/pages/tab-details';
import LogoTitle from './src/components/logo-title';
import LogoutButton from './src/components/logout-button';

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
