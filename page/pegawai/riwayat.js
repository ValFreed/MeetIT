import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
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
  Flex, 
  Spacer,
  Slide,
  View,
  FlatList,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import firebase from './database/firebase';
import { getDocs, collection, where} from "firebase/firestore"; 
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Riwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      username: "",
      data: [],
    };
  }

  get = async () => {
    try {
      const nama = await AsyncStorage.getItem('namapegawai')
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
    getDocs(collection(firebase, "riwayatabsen"), where("username", "==", this.state.username)).then((docSnap) => {
      let data = this.state.data;
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), 
          id: doc.id,
          kode: (doc.data().kode),
          tanggal: (doc.data().tanggal),
          jam: (doc.data().jam),
          username: (doc.data().username),
          latitude: (doc.data().latitude),
          longitude: (doc.data().longitude),
        });
      });
      this.setState({data});
    });
  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    const data ={tanggal: item.tanggal, jam: item.jam, latitude: item.latitude, longitude: item.longitude, username: item.username, kode: item.kode };
    return(
      <>
        <Center>
          <Pressable
            mt='2'
            borderRadius="15" 
            borderColor="#57D1D1" 
            borderWidth="1" 
            shadow="5" 
            bg="#FFFFFF" 
            w="95%" 
            h="75"  
            justifyContent={"center"}
            overflow="hidden"
            onPress={() => navigation.navigate('AbsenDetail', {data})}
          >
            <Flex style={{ flex: 1 }} p={0} direction="row"  px={5} alignItems={"center"}>
              <Icon
                name="map-marker"
                size={30}
                color='#000000'
              />
              <Spacer/>
              <Box>
                <Text style={{fontSize: 21, fontWeight: "bold"}}>{item.tanggal}</Text>
                <Text style={{fontSize: 19, fontWeight: "bold"}}>{item.jam}</Text>
              </Box>
            </Flex> 
          </Pressable>
        </Center>
      </>
    );
  };

  render() {
    const {isLoading} = this.state;
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#57D1D1" style={{
            marginTop: Constants.statusBarHeight,
          }}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require("./media/logo_app.png")} alt="Judul Logo"  style={{ width: 158, height: 69}}/>
            <Spacer />
            <Text mt="10" fontSize="xl" bold>Riwayat Absen</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <Center>
                <Box mt="20" mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="550" justifyContent={"center"} alignItems={"center"}>
                  {isLoading ? (
                        <ActivityIndicator size="large" color="#AA0002"/>
                    ): (
                      <FlatList
                        width="95%"
                        data={this.state.data}
                        renderItem={this.renderItem}
                      />
                  )}
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
    backgroundColor: "white",
  },
  modalView: {
    flex: 1,
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
