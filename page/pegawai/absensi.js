import React, { Component } from "react";
import Constants from "expo-constants";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { format } from 'date-fns';
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
import { doc, setDoc } from "firebase/firestore"; 

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      region: null,
      latitude: 0,
      longitude: 0,
      errorMessage: null,
      jam: 0,
      tanggal: 0,
      namapegawai: "",
      username: "",
      indek:"",
      isLoading: false,
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

  InsertRecord=()=>{
    this.setState({ isLoading: true });
    var jam = this.state.jam;
    var tanggal = this.state.tanggal;
    var username = this.state.username;
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var indek = this.state.indek;
    const kode = indek.concat(username);
    if ((latitude.length==0) || (longitude.length==0)){
        alert("Reload Aplikasi");
        this.setState({ isLoading: false });
    }else{
      setDoc(doc(firebase, "riwayatabsen", kode),{
        kode: kode,
        jam: jam,
        tanggal: tanggal,
        username: username,
        latitude: latitude,
        longitude: longitude,
      })
      .then(() => {
          //jika login berhasil maka masuk halaman login
          this.setState({ isLoading: false });
          console.log("data berhasil submit");
          Alert.alert("Pemberitahuan","Terimakasih Telah Hadir!");
      })
      .catch((error) => {
          //jika mengambil data gagal, akan tampil error
          this.setState({ isLoading: false });
          Alert.alert("Pemberitahuan","Gagal Absen!");
          setError(error.message);
      })
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount(){
    const jam = format(new Date(), 'HH:mm:ss');
    const tanggal = format(new Date(), 'dd-MM-yyyy');
    const indek = format(new Date(), 'yyyyMMddHHmmss');
    this.setState({jam, tanggal, indek});
    this.get();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({ errorMessage: 'Permission to access location was denied'});
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    let latitude = region.latitude;
    let longitude = region.longitude;
    this.setState({ location, region, latitude, longitude }); 
  };
  
  render() {
    
    const tanda = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
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
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <MapView
                    style={{ width: '97%', height: '97%', flex: 1, position: "absolute"}}
                    initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
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
                    <Text style={{fontSize: 21, fontWeight: "bold"}}>{this.state.tanggal}</Text>
                    <Text style={{fontSize: 19, fontWeight: "bold"}}>{this.state.jam}</Text>
                </Box>
                
                <Pressable
                  onPress={() => {this.InsertRecord();}}
                  
                  bg="#57D1D1"
                  borderRadius="15"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "43%",
                    padding: 10,
                  }}
                >
                  <Icon
                        name="map-marker"
                        size={30}
                        color='#000000'
                    />
                  <Text  fontSize="20" color="#000000" fontWeight="bold">
                    Absen Sekarang
                  </Text>
                </Pressable>
            </Center>
          </Box>
          <Box borderRadius="20" borderColor="#57D1D1" borderWidth="3" shadow="5" bg="#FFFFFF" w="95%" h="75" justifyContent={"center"} position={"absolute"} top={20} >
            <Text px="5" fontSize="20" >Selamat Datang {this.state.namapegawai}</Text>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}