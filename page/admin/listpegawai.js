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

export default class Listpegawai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      username: "",
      data: [],
      isLoading: false,
    };
  }
  
  componentDidMount(){
    this.setState({ isLoading: true });
    getDocs(collection(firebase, "pegawai")).then((docSnap) => {
      let data = this.state.data;
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), 
          id: doc.id,
        });
      });
      this.setState({ isLoading: false });
      this.setState({data});
    });
    
  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    const data ={username: item.username, namapegawai: item.namapegawai, password: item.password};
    return(
      <>
        <Center>
          <Pressable
            mt='4'
            borderRadius="15" 
            borderColor="#57D1D1" 
            borderWidth="1" 
            shadow="5" 
            bg="#FFFFFF" 
            w="95%" 
            h="50"  
            justifyContent={"center"}
            overflow="hidden"
            onPress={() => navigation.navigate('DetailPegawai', {data})}
          >
            <Flex style={{ flex: 1 }} p={0} direction="row"  px={5} alignItems={"center"}>
              <Icon
                name="user"
                size={30}
                color='#000000'
              />
              <Box>
                <Text left="5" style={{fontSize: 21, fontWeight: "bold"}}>{item.namapegawai}</Text>
              </Box>
            </Flex> 
          </Pressable>
        </Center>
      </>
    );
  };

  render() {
    const {isLoading} = this.state;
    const { navigation } = this.props;
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
            <Flex direction="row"  px={5} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize= "23" style={{ fontWeight: "bold"}}>Daftar Pegawai</Text>
                <Spacer/>
                <Pressable
                    onPress={() => navigation.navigate('TambahPegawai')}
                    bg="#57D1D1"
                    borderRadius="15"
                    style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "43%",
                    height: "30%",
                    }}
                >
                    <Text  fontSize="20" color="#000000" fontWeight="bold">
                        Tambah Pegawai
                    </Text>
                </Pressable>
            </Flex>
            <Center>
                <Box mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="550" justifyContent={"center"} alignItems={"center"}>
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
        </VStack>
      </NativeBaseProvider>
    );
  }
}