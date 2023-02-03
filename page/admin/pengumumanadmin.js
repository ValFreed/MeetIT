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
  ScrollView,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import firebase from './database/firebase';
import { getDocs, collection, where, updateDoc, doc} from "firebase/firestore"; 
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Pengumumanadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isi: "",
      pengumuman: "",
      isLoading: ""
    };
  }
  
  componentDidMount(){
    this.setState({ isLoading: true });
    getDocs(collection(firebase, "pengumuman")).then((docSnap) => {
        let data = [];
        docSnap.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ isLoading: false });
        this.setState({
            isi: data[0].isi
        });
      });
  }

  UpdateData = () => {
    this.setState({ isLoading: true });
    var pengumuman = this.state.pengumuman;
    var docid = "2gvFwl3moKb045ROZc9O";
    updateDoc(doc(firebase, "pengumuman", docid),{
      isi: pengumuman
    })
    .then(() => {
      this.setState({ isLoading: false });
        console.log("Pengumuman Berhasil DiUpdate");
        Alert.alert("Pemberitahuan","Pengumuman Berhasil DiUpdate");
    })
    .catch(error => {
      this.setState({ isLoading: false });
        console.log(error);
        Alert.alert("Pemberitahuan","Pengumuman Gagal DiUpdate");
    })
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
            <Text mt="10" fontSize="xl" bold>Pengumuman</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <ScrollView>
            <Text mt="10" left="5" fontSize= "23" bold>Pengumuman Lama</Text>
            <Center>
                <Box mt="2" mb="2" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#F0F8FF" w="90%" h="200" justifyContent={"center"} px="5">
                  {this.state.isLoading ? (
                        <ActivityIndicator size="large" color="#57D1D1"/>
                    ): (
                      <Text fontSize="3xl">{this.state.isi}</Text>
                  )}
                </Box>
            </Center>
            <Text mt="1" left="5" fontSize= "23" bold>Pengumuman Baru</Text>
            <Center>
                <FormControl justifyContent={"center"} alignItems={"center"}>
                    <Box mt="2" mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="200" justifyContent={"center"} alignItems={"center"}>
                        <Input
                            w="100%" h="200"
                            borderRadius="10" borderWidth="2"
                            onChangeText={(pengumuman) => this.setState({ pengumuman })}
                            size="2xl"
                            p={2}
                            placeholder="Isi Pengumuman Baru disini"
                            fontWeight="400"
                            fontFamily="mono"
                            placeholderTextColor="#57D1D1"
                        />
                    </Box>
                </FormControl>
                <Pressable
                  onPress={() => {this.UpdateData();}}
                  bg="#57D1D1"
                  borderRadius="30"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    padding: 10,
                  }}
                >
                  <Text fontSize="20" color="#000000" fontWeight="bold" >
                    Update Pengumuman
                  </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    bg="#DC143C"
                    mt="8"
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
            </Center>
            </ScrollView>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}