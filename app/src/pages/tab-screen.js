import { createMaterialTopTabNavigator } from 'react-navigation';
import ProblemsScreen from './problems-screen';

const TabNavigator = createMaterialTopTabNavigator(
  {
    AllProblems: {
      screen: ProblemsScreen,
      navigationOptions: {
        swipeEnabled: true,
        tabBarLabel: 'Todas'
      }
    },
    ReadProblems: {
      screen: ProblemsScreen,
      navigationOptions: {
        swipeEnabled: true,
        tabBarLabel: 'Lidas'
      }
    },
    ResolvedProblems: {
      screen: ProblemsScreen,
      navigationOptions: {
        swipeEnabled: true,
        tabBarLabel: 'Resolvidas'
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#F8D253',
      },
      indicatorStyle: {
        backgroundColor: '#1E51A4'
      },
      labelStyle: {
        color: '#1E51A4'
      }
    }
  });

  export default TabNavigator;