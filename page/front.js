import React, { Component } from "react";
import Constants from "expo-constants";
import { Image, View,  StyleSheet} from "react-native";
import { NativeBaseProvider, VStack, Center } from "native-base";

export default class front extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("App");
    }, 5000);
  }
  render() {
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#57D1D1">
          <Center style={{ flex: 80 }} justifyContent={"center"} alignItems={"center"}>
            <Image source={require("../assets/logoapp/logo_app.png")} style={{ width: 232, height: 101}}/>
          </Center>
          <Center style={{ flex: 20 }} justifyContent={"center"} alignItems={"center"}>
            <Image style={styles.gambar2} source={require('../assets/valfreed.png')} />
          </Center>
        </VStack>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
    alignItems: 'center',
    justifyContent: 'center',
  },

  gambar1: {
    marginTop: '35%',
    width: 100,
    height: 100,
    marginBottom: 75,
  },
  gambar2: {
    marginTop: '35%',
    width: 150,
    height: 50,
    marginBottom: 75,
  }
});