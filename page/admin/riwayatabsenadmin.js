import React, { Component } from "react";
import Constants from "expo-constants";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
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

export default class Riwayatabsenadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      username: "",
      indek:"",
      kode: "",
      isLoading: false,
    };
  }

  DeleteRecord=()=>{
    this.setState({ isLoading: true });
    var kode = this.state.kode;
    const { navigation } = this.props;
    deleteDoc(doc(firebase,"riwayatabsen", kode))
      .then(() => {
        this.setState({ isLoading: false });
          console.log("data berhasil dihapus");
          Alert.alert("Pemberitahuan","data berhasil dihapus!");
          navigation.goBack();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
          setError(error.message);
          Alert.alert("Pemberitahuan","data gagal dihapus!");
      })
  }

  componentDidMount(){
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
                  {this.state.isLoading ? (
                      <ActivityIndicator size="large" color="#57D1D1" />
                  ) : (
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
                  )}
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
            <Text  px="5" fontSize="20" >Nama pegawai: {data.namapegawai}</Text>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}