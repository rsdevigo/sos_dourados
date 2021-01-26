import React from "react";
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  NativeModules,
  AsyncStorage
} from "react-native";
import * as Font from "expo-font";
import TextField from "react-native-md-textinput";
import parse from "url-parse";
const { hostname } = parse(NativeModules.SourceCode.scriptURL, true);

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      user: {
        email: "",
        password: ""
      }
    };
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundContainer}
        imageStyle={styles.backgroundImage}
        source={require("../../assets/initial_bg.png")}
      >
        <StatusBar hidden={true} />
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        {this.state.fontLoaded ? (
          <Text
            style={[styles.logotipo, { fontFamily: "hind-bold", fontSize: 32 }]}
          >
            DOURADOS
          </Text>
        ) : null}
        <View style={styles.loginForm}>
          <TextField
            label={"Email"}
            dense={true}
            highlightColor={"#FFFFFF"}
            textColor={"#ffffff"}
            wrapperStyle={{ width: "100%" }}
            onChangeText={text => this._updateField(text, "email")}
            keyboardType={"email-address"}
            value={this.state.user.email}
          />
          <TextField
            label={"Senha"}
            dense={true}
            highlightColor={"#FFFFFF"}
            textColor={"#ffffff"}
            wrapperStyle={{ width: "100%" }}
            onChangeText={text => this._updateField(text, "password")}
            secureTextEntry={true}
            value={this.state.user.password}
          />
        </View>
        <View style={{ width: "80%", marginBottom: 10 }}>
          <Button
            title="Entrar"
            color="#1E51A4"
            onPress={() => {
              this._submit_login_form();
            }}
            accessibilityLabel="Botão que realiza o login do usuário"
          />
        </View>
        <View style={{ width: "80%", marginBottom: 10 }}>
          <Button
            title="Registrar"
            color="#5b7dd6"
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
            accessibilityLabel="Botão que realiza o cadastro do usuário"
          />
        </View>
      </ImageBackground>
    );
  }

  async _submit_login_form() {
    var user = {
      email: this.state.user.email,
      password: this.state.user.password
    };
    console.log("asd");
    this._login(user);
  }

  async _login(user) {
    try {
      let response = await fetch("http://" + hostname + ":3000/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let responseJson = await response.json();
      if (response.status == 200) {
        // Adiciona token no user storage
        await AsyncStorage.setItem("current_user_token", responseJson.token);
        this.props.navigation.navigate("AuthLoading");
      } else if (response.status == 401) {
        Alert.alert(responseJson.message);
      } else {
        throw responseJson;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  _updateField(text, field) {
    this.setState(prevState => {
      prevState.user[field] = text;
      return prevState;
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      "hind-bold": require("../../assets/fonts/Hind-Bold.ttf")
    });
    this.setState(prevState => {
      prevState.fontLoaded = true;
      return prevState;
    });
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  backgroundImage: {
    resizeMode: "cover",
    top: 0,
    left: 0
  },
  logo: {
    width: 193,
    height: 151,
    marginTop: 13,
    padding: 0,
    shadowColor: "#000000",
    shadowOpacity: 30,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  logotipo: {
    color: "#1E51A4"
  },
  title: {
    color: "#ffffff",
    marginTop: 10
  },
  loginForm: {
    width: "80%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: 10,
    paddingBottom: 40,
    borderRadius: 2,
    backgroundColor: "#1E51A4",
    opacity: 0.6,
    marginBottom: 20
  },
  loginButton: {
    backgroundColor: "#1E51A4",
    alignItems: "center",
    padding: 10,
    width: "80%",
    borderRadius: 2
  }
});
