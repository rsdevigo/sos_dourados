import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class ProblemScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      step: 1
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.problemFormContainer}>
          <View style={styles.problemStepperContainer} >
            <TouchableOpacity onPress={() => {}}>
              <View>
                <View>
                  <Text>1</Text>
                </View>
                <Text>Material</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View>
                <View>
                  <Text>1</Text>
                </View>
                <Text>Material</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View>
                <View>
                  <Text>1</Text>
                </View>
                <Text>Material</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};


const styles = StyleSheet.create({
  problemFormContainer: {
    flex: 1,
  },
  problemStepperContainer: {
    height: 75,
    backgroundColor: '#1E51A4',
    padding: 8,
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row'
  }
});