import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import Problem from '../components/problem';
import MapView from 'react-native-maps';

export default class ProblemsScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff'}}>
               	<View style={styles.perfilProblem}>
               		<Image source={require('../../assets/lampada.jpg')} style={styles.foto}/>
               		<Text style={styles.category}>Iluminação pública - 22/06/2018 às 15:00</Text>              	
               		<Text style={styles.problemaComentario}>Lorem ipsum dolor sit amet, 
               		 consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
               		 gravida dolor sit amet lacus accumsan et viverra justo commodo. 
               		 Proin sodales pulvinar sic tempor. Sociis natoque penatibus et 
               		 magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, 
               		 nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus 
               		 pronin sapien nunc accuan eget.
               		</Text>

               		<MapView
         			 	initialRegion={{
           				 latitude:-22.234199,
           				 longitude:-54.835875,
           			 	latitudeDelta: 0.0142,
           			 	longitudeDelta: 0.0231,
          				}}
          				style={styles.mapView}        
        			>
          
            		<MapView.Marker              
              			coordinate={{
                			latitude: -22.234199,
                			longitude: -54.835875,
              			}}
            		/>
         
        			</MapView>

               	</View>	
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  perfilProblem: {
	height: 64,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 12,
   },
  foto: {
  	width: 340,
    height: 193
  },
  category: {
  	fontSize: 16,
    color: '#333333'
  },
  problemaComentario:{
  	fontSize: 13,
    color: '#333333'
  },
  mapView: {
  	width: 340,
    height: 193
  }
});