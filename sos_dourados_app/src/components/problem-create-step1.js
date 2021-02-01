import { Content, Text, View, Grid, Col, Row, Button, Icon } from 'native-base';
import React from 'react';
import { Camera } from 'expo-camera';
import { Alert, TouchableOpacity } from 'react-native';

export default class ProblemCreateStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            type: Camera.Constants.Type.back
        }
        this.camera = null;
    }

    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({
            ...this.state,
            hasPermission: status === 'granted'
        });
    }
    render() {
        if (this.state.hasPermission === null) {
            return <View />;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <Camera
            style={{flex: 1}}
            type={this.state.type} 
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.auto}
            ref={ref => { this.camera = ref; }}>
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={()=>{ this._snap(); }}
                        style={{
                        flex: 0.1,
                        alignSelf: 'flex-end', 
                        alignItems: 'center',
                        margin: 16
                        }}>
                        <View style={{width: 64, height: 64, backgroundColor: '#1E51A4', borderRadius: 32}}>
                        <View style={{width: 32, height: 32, backgroundColor: '#F8D253', borderRadius: 16, margin: 16}}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
        )
    }

    async _snap() {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({skipProcessing : true});
          this.props.updatePhoto(photo);
        }
      }
}