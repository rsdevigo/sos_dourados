import { createMaterialTopTabNavigator } from 'react-navigation';
import ProblemMensage from './problem-details-mensage';
import ProblemDetails from './problem-details-screen';

const TabNavigatorDetails = createMaterialTopTabNavigator(
  {
    PerfilProblem: {
      screen: ProblemDetails,
      navigationOptions: {
        swipeEnabled: true,
        tabBarLabel: 'Perfil'
      }
    }
    MesagemProblem: {
      screen: ProblemMensage,
      navigationOptions: {
        swipeEnabled: true,
        tabBarLabel: 'Mensagem'
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

  export default TabNavigatorDetails;