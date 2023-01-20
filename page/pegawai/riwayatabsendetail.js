import React, { Component } from "react";
import Constants from "expo-constants";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Image, Alert } from "react-native";
import {
  Box,
  Text,
  Pressable,
  Heading,
  Link,
  KeyboardAvoidingView,
  VStack,
  HStack,
  FormControl,
  Input,
  extendTheme,
  Button,
  Flex,
  Center,
  Spacer,
  NativeBaseProvider,
  Slide,
  View,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import firebase from './database/firebase';
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 

export default class Riwayatabsendetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      username: "",
      indek:"",
      kode: "",
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

  DeleteRecord=()=>{
    var kode = this.state.kode;
    const { navigation } = this.props;
    deleteDoc(doc(firebase,"riwayatabsen", kode))
      .then(() => {
          console.log("data berhasil dihapus");
          Alert.alert("data berhasil dihapus!");
          navigation.goBack();
      })
      .catch((error) => {
          //jika mengambil data gagal, akan tampil error
          setError(error.message);
      })
  }

  componentDidMount(){
    this.get();
    const { data } = this.props.route.params;
    this.setState({kode: data.kode});
  }
  
  render() {
    const { data } = this.props.route.params;
    const { navigation } = this.props;
    const tanda = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#57D1D1" style={{ marginTop: Constants.statusBarHeight}}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
              <Image source={require("./media/logo_app.png")} alt="Judul Logo"  style={{ width: 158, height: 69}}/>
              <Spacer />
              <Text mt="10" fontSize="xl" bold>Absensi</Text>
          </Flex>        
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50">
            <Center>
                <Box mt="20" mb="3" shadow="4" borderColor="#57D1D1" borderWidth="1" borderRadius="10" bg="#808080" w="90%" h="400" justifyContent={"center"} alignItems={"center"}>
                    <MapView
                        style={{ width: '97%', height: '97%', flex: 1, position: "absolute"}}
                        initialRegion={{
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={tanda}
                            title="My Location"
                            description={`Latitude: ${this.state.latitude}, Longitude: ${this.state.longitude}`}
                        />
                    </MapView>
                </Box>
                <Box mb="4" borderRadius="20" borderWidth="1" shadow="5" bg="#FFFFFF" w="90%" h="75" justifyContent={"center"} alignItems={"center"}>
                    <Text style={{fontSize: 21, fontWeight: "bold"}}>{data.tanggal}</Text>
                    <Text style={{fontSize: 19, fontWeight: "bold"}}>{data.jam}</Text>
                </Box>
                <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.DeleteRecord();}}
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
                            Hapus Absen
                        </Text>
                    </Pressable>
                    <Spacer/>
                    <Pressable
                        onPress={() => navigation.goBack()}
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
                            Kembali
                        </Text>
                    </Pressable>
                </HStack>
            </Center>
          </Box>
          <Box borderRadius="20" borderColor="#57D1D1" borderWidth="3" shadow="5" bg="#FFFFFF" w="95%" h="75" justifyContent={"center"} position={"absolute"} top={20} >
            <Text style={{paddingLeft: 10}} >Nama pegawai: {this.state.namapegawai}</Text>
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
