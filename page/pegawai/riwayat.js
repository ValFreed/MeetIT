import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import {
  Box,
  Text,
  Pressable,
  VStack,
  Center,
  NativeBaseProvider,
  Flex, 
  Spacer,
  FlatList,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import firebase from './database/firebase';
import { getDocs, collection, where, query} from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Riwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      username: "",
      data: [],
      isLoading: false,
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
    this.setState({ isLoading: true });
    getDocs(
      collection(firebase, "riwayatabsen")
      ).then(docSnap => {
      let data = [];
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), 
          id: doc.id
        });
        console.log(doc.data());
      });
      this.setState({data});
      this.setState({ isLoading: false });
    });
    
  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    if(item.username == this.state.username){
      const data = {tanggal: item.tanggal, jam: item.jam, latitude: item.latitude, longitude: item.longitude, username: item.username, kode: item.kode };
      console.log(data);
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
                  <Text style={{fontSize: 21, fontWeight: "bold"}}>{data.tanggal}</Text>
                  <Text style={{fontSize: 19, fontWeight: "bold"}}>{data.jam}</Text>
                </Box>
              </Flex> 
            </Pressable>
          </Center>
        </>
      );
    }
  };

  render() {
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
                <Box mt="20" mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="590" justifyContent={"center"} alignItems={"center"}>
                  {this.state.isLoading ? (
                      <ActivityIndicator size="large" color="#57D1D1" />
                  ) : (
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