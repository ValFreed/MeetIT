import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert } from "react-native";
import {
  Box,
  Text,
  Pressable,
  Heading,
  Link,
  KeyboardAvoidingView,
  VStack,
  FormControl,
  Input,
  extendTheme,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Slide,
  View,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/FontAwesome';
import 'firebase/firestore';
import firebase from './database/firebase';
import { getDocs, query, collection, where} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "md",
      username: "",
      password: "",
      namapegawai: "",
      dbusername: "",
      dbpassword: "",
      dbnamapegawai: "",
      check_textInputChange: false,
      secureTextEntry: true,
      input: "",
    };
  }

  readData = () => {
    var Username = this.state.username;
    var Password = this.state.password;
    const { navigation } = this.props;
    if (Username.length == 0 || Password.length == 0) {
      alert("Harap Isi Form!");
    } else if (Username === "Admin" && Password === "Admin") {
      Alert.alert("Selamat Datang");
      navigation.navigate('BottomNavigatorpegawai', {
        screen: 'Absensi',
        params: {
          nama: "Guest"
        },
      });
    } else {
      getDocs(
        query(collection(firebase, "pegawai"), where("username", "==", Username))
      ).then((docSnap) => {
        let users = [];
        docSnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          dbpassword: users[0].password,
          dbusername: users[0].username,
          dbnamapegawai: users[0].namapegawai
        });
        this.validasi();
      });
    }
  };

  add = async ()=>{
    var namapegawai = this.state.dbnamapegawai;
    var username = this.state.dbusername;
    try {
      await AsyncStorage.setItem('namapegawai', namapegawai);
      await AsyncStorage.setItem('username', username);
    }
    catch (e){
      console.error(e);
    }
  }

  validasi = () => {
    console.log(this.state.username);
    console.log(this.state.password);
    const { navigation } = this.props;
    this.add();
    if (this.state.username === "Admin" && this.state.password === "Admin") {
      Alert.alert("Selamat Datang");
      navigation.navigate('BottomNavigatorpegawai', {
        screen: 'Absensi',
        params: {
          nama: "Guest"
        },
      });
    } else {
      if (
        this.state.username === this.state.dbusername &&
        this.state.password === this.state.dbpassword
      ){
        Alert.alert("Selamat Datang", this.state.dbnamapegawai);
        console.log("Login Berhasil");
        navigation.navigate('BottomNavigatorpegawai', {
          screen: 'Absensi',
          params: {
            nama: this.state.dbnamapegawai
          },
        });
      } else {
        Alert.alert("Login Gagal");
      }
    }
  };

  validasiDB = () => {};

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#57D1D1" style={{
            marginTop: Constants.statusBarHeight,
          }}>
          <Center style={{ flex: 20 }} justifyContent={"center"} alignItems={"center"}>
            <Image source={require("../assets/logoapp/logo_app.png")} alt="Judul Logo" style={{ width: 232, height: 101}}/>
          </Center>
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 80 }} borderTopRadius="50">
            <View>
                <Text left="5" mt="20" style={{fontSize: 23, fontWeight: "bold"}}>Login</Text>
            </View>
            <Center>
              <FormControl w="92%" pt="20%">
                <Box mb="5" borderRadius="20" shadow="3" bg="#FFFFFF" w="100%" h="75">
                    <Input
                        w="100%" h="75"
                        borderRadius="10" borderWidth="2"
                        onChangeText={(username) => this.setState({ username })}
                        size="xl"
                        p={2}
                        placeholder="Username"
                        fontWeight="400"
                        fontFamily="mono"
                        placeholderTextColor="#57D1D1"
                        InputLeftElement={
                            <Icon
                              name="user"
                              size={30}
                              color='#000000'
                            />
                        }
                    />
                </Box>
                <Box mb="20" borderRadius="20" shadow="3" bg="#FFFFFF" w="100%" h="75">
                    <Input
                        w="100%" h="75"
                        borderRadius="10" borderWidth="2"
                        mb="5"
                        size="2xl"
                        variant="underlined"
                        p={2}
                        placeholder="Password"
                        fontWeight="400"
                        fontFamily="mono"
                        placeholderTextColor="#57D1D1"
                        secureTextEntry={this.state.secureTextEntry ? true : false}
                        onChangeText={(password) => this.setState({ password })}
                        InputLeftElement={
                            <Feather
                                name="key"
                                size={30}
                                color='#000000'
                            />
                        }
                        InputRightElement={
                            <Pressable
                            mr="3"
                            onPress={this.updateSecureTextEntry.bind(this)}
                            >
                            {this.state.secureTextEntry ? (
                                <Feather name="eye-off" color="#000000" size={20} />
                            ) : (
                                <Feather name="eye" color="#808080" size={20} />
                            )}
                            </Pressable>
                        }
                    />
                </Box>
              </FormControl>
                <Pressable
                  onPress={() => {this.readData();}}
                  bg="#57D1D1"
                  borderRadius="15"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "43%",
                    padding: 10,
                  }}
                >
                  <Text fontSize="25" color="#000000" fontWeight="bold" >
                    Login
                  </Text>
                </Pressable>
              <Text mt="10" style={{fontSize: 20 }} fontWeight="thin">Absensi Online</Text>
            </Center>
            <Box
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingBottom: 10,
                position: "absolute",
                bottom: 0,
              }}
            >
                
            </Box>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#DD4F4F",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 34,
    fontSize: 18,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 34,
    fontSize: 24,
    fontWeight: "bold",
  },
});
