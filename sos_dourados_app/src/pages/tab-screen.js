import React from 'react';
import { Container, Header, Content, Tab, Tabs, Fab, Button, Icon } from 'native-base';
import ProblemsScreen from './problems-screen';
import ProblemsReadScreen from './problems-read-screen';
import ProblemsResolvedScreen from './problems-resolved-screen';
import { View, Text } from 'react-native';
import LogoTitle from '../components/logo-title';


export default function TabNavigator({navigation}) {
  const [state, setState] = React.useState({active: false});
  return (
    <Container>
      <LogoTitle hasTabs />
      <View style={{flex: 1}}>
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#1E51A4'}}>
          <Tab tabStyle={{backgroundColor: '#F8D253'}} activeTextStyle={{color: '#1E51A4'}} activeTabStyle={{backgroundColor: '#F8D253'}} textStyle={{color: '#1E51A4'}} heading="Todas">
            <ProblemsScreen navigation={navigation} />
          </Tab>
          <Tab tabStyle={{backgroundColor: '#F8D253'}} activeTextStyle={{color: '#1E51A4'}} activeTabStyle={{backgroundColor: '#F8D253'}} textStyle={{color: '#1E51A4'}} heading="Lidas">
            <ProblemsReadScreen navigation={navigation} />
          </Tab>
          <Tab tabStyle={{backgroundColor: '#F8D253'}} activeTextStyle={{color: '#1E51A4'}} activeTabStyle={{backgroundColor: '#F8D253'}} textStyle={{color: '#1E51A4'}} heading="Resolvidas">
            <ProblemsResolvedScreen navigation={navigation} />
          </Tab>
        </Tabs>
        <Fab
          active={state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#F8D253' }}
          position="bottomRight"
          onPress={() => setState({ active: !state.active })}>
          <Icon name="ellipsis-vertical" />
          <Button onPress={() => {navigation.navigate("ProblemCreate")}} style={{ backgroundColor: '#1E51A4' }}>
              <Icon name="add" />
          </Button>
          <Button style={{ backgroundColor: '#1E51A4' }}>
              <Icon name="map-sharp" />
          </Button>
          <Button onPress={() => {navigation.navigate("Profile")}} style={{ backgroundColor: '#1E51A4' }}>
              <Icon name="person" />
          </Button>
        </Fab> 
      </View>
    </Container>
  )
}
