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
  Flex,
  Spacer,
  Center,
  NativeBaseProvider,
  Slide,
  View,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from './database/firebase';
import { getDocs, query, collection, where} from "firebase/firestore"; 

export default class Pengumuman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isi: "",
      namapegawai: "",
    };
  }

  get = async () => {
    try {
      const nama = await AsyncStorage.getItem('namapegawai')
      if(nama !== null) {
          this.setState({namapegawai: nama})
      }
    }  catch (e){
      console.error(e);
    }
  }

  componentDidMount(){
    this.get();
    getDocs(collection(firebase, "pengumuman")).then((docSnap) => {
      let data = [];
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
          isi: data[0].isi,
      });
    });
  }

  readData = () => {
    var Username = this.state.user;
    var Password = this.state.password;
    if (Username.length == 0 || Password.length == 0) {
      alert("Harap Isi Form!");
    } else if (this.state.user === "Guest" && this.state.password === "Guest") {
      Alert.alert("Selamat Datang");
      this.props.navigation.navigate("HomeScreen");
    } else {
      getDocs(
        query(collection(db, "users"), where("username", "==", Username))
      ).then((docSnap) => {
        let users = [];
        docSnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          dbpassword: users[0].password,
          dbuser: users[0].username,
        });
        this.validasi();
      });
    }
  };

  validasi = () => {
    console.log(this.state.user);
    console.log(this.state.password);

    if (this.state.user === "Guest" && this.state.password === "Guest") {
      Alert.alert("Selamat Datang");
      this.props.navigation.navigate("HomeScreen");
    } else {
      if (
        this.state.user === this.state.dbuser &&
        this.state.password === this.state.dbpassword
      ) {
        Alert.alert("Selamat Datang");
        console.log("Login Berhasil");
        this.props.navigation.navigate("HomeScreen");
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
    const pengumuman = this.state.isi;
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#57D1D1" style={{
            marginTop: Constants.statusBarHeight,
          }}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require("./media/logo_app.png")} alt="Judul Logo"  style={{ width: 158, height: 69}}/>
            <Spacer />
            <Text mt="10" fontSize="xl" bold>Pengumuman</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <Flex direction="row" style={{ flex: 1 }}>
                <Text left="5" mt="20" fontSize="xl" bold>Isi Pengumuman</Text>
            </Flex>
            <Center>
                <Box mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="550" justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize="xl" bold>{pengumuman}</Text>
                </Box>
            </Center>
          </Box>
          <Box borderRadius="20" borderColor="#57D1D1" borderWidth="3" shadow="5" bg="#FFFFFF" w="95%" h="75" justifyContent={"center"} position={"absolute"} top={20} >
            <Text px="5" fontSize="20">Selamat Datang {this.state.namapegawai}</Text>
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
