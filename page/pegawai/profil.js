import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert, ActivityIndicator  } from "react-native";
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
  Flex,
  Spacer,
  Center,
  NativeBaseProvider,
  Slide,
  View,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/FontAwesome';
import 'firebase/firestore';
import firebase from './database/firebase';
import { doc, setDoc, updateDoc, where } from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Riwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      namapegawai: "",
      check_textInputChange: false,
      secureTextEntry: true,
    };
  }

  get = async () => {
    try {
      const nama = await AsyncStorage.getItem('namapegawai');
      const username = await AsyncStorage.getItem('username');
      if(nama !== null && username !== null) {
          this.setState({namapegawai: nama, username: username });
      }
    }  catch (e){
      console.error(e);
    }
  }

  componentDidMount(){
    this.get();
  }

  UpdateData = () => {
    var Username = this.state.username
    var Password = this.state.password;
    var kosong = null;
    updateDoc(doc(firebase, "pegawai", Username),{
      password: Password
    })
    .then(() => {
        console.log("Password Berhasil DiUpdate");
        Alert.alert("Pemberitahuan","Password Berhasil DiUpdate");
        this.setState({Password: kosong})
    })
    .catch(error => {
        console.log(error);
    })
  };

  logOut = async() => {
    const { navigation } = this.props;
    AsyncStorage.clear();
    navigation.navigate('Login');
}

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
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require("./media/logo_app.png")} alt="Judul Logo"  style={{ width: 158, height: 69}}/>
            <Spacer />
            <Text mt="10" fontSize="xl" bold>Profil</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <Center>
                <Box mt="10" borderRadius="100" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="75" h="75" justifyContent={"center"} alignItems={"center"}>
                    <Icon
                        name="user"
                        size={30}
                        color='#000000'
                    />
                </Box>
                <FormControl w="95%" pt="20%" >
                  <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Nama Pegawai</Text>
                    </FormControl.Label> 
                    <Center>
                        <Box mb="5" borderRadius="20" shadow="3" bg="#F0FFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3" justifyContent={"center"} px="5">
                            <Text fontSize="2xl">{this.state.namapegawai}</Text>
                        </Box>
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Username</Text>
                    </FormControl.Label> 
                    <Center>
                        <Box mb="5" borderRadius="20" shadow="3" bg="#F0FFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3" justifyContent={"center"} px="5">
                            <Text fontSize="2xl">{this.state.username}</Text>
                        </Box>
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Password</Text>
                    </FormControl.Label>
                    <Center>
                        <Box mb="10" borderRadius="20" shadow="3" bg="#FFFFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3">
                            <Input
                                w="100%" h="70"
                                borderRadius="20" borderWidth="1"
                                mb="5"
                                size="2xl"
                                variant="underlined"
                                p={2}
                                fontWeight="400"
                                fontFamily="mono"
                                placeholderTextColor="#57D1D1"
                                secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(password) => this.setState({ password })}
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
                    </Center>
                </FormControl>
                <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.UpdateData();}}
                        bg="#57D1D1"
                        borderRadius="15"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 10,
                        }}
                    >
                        <Text  fontSize="20" color="#000000" fontWeight="bold">
                            Update Profil
                        </Text>
                    </Pressable>
                    <Spacer/>
                    <Pressable
                        onPress={() => {this.logOut();}}
                        bg="#DC143C"
                        borderRadius="15"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 10,
                        }}
                    >
                        <Text  fontSize="20" color="#DCDCDC" fontWeight="bold">
                            LogOut
                        </Text>
                    </Pressable>
                </HStack>
            </Center>
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
