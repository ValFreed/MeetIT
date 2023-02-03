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
import { doc, setDoc} from "firebase/firestore"; 
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";

export default class Tambahpegawai extends Component {
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
  
  InsertData=()=>{
    var Namapegawai = this.state.namapegawai;
    var username = this.state.username;
    var Password = this.state.password;
    const { navigation } = this.props;
    if ((Namapegawai.length==0) || (Password.length==0) || (username.length==0)){
        alert("Required Field Is Missing!!!");
    }else{
        setDoc(doc(firebase, "pegawai", username),{
            username : username,
            namapegawai : Namapegawai,
            password : Password
        })
        .then(() => {
            //jika login berhasil maka masuk halaman login
            console.log("data berhasil submit");
            Alert.alert("Pemberitahuan","Pegawai Berhasil Ditambahkan");
            navigation.goBack();
        })
        .catch((error) => {
            //jika mengambil data gagal, akan tampil error
            setError(error.message);
        })
    }
  }

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    const {navigation} = this.props;
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
              <FormControl w="92%" pt="20%">
                <FormControl.Label>
                    <Text fontFamily="heading" fontWeight="500" fontSize="xl">Nama Pegawai</Text>
                </FormControl.Label> 
                <Box mb="5" borderRadius="20" shadow="3" bg="#FFFFFF" w="100%" h="75">
                    <Input
                        w="100%" h="75"
                        borderRadius="10" borderWidth="2"
                        onChangeText={(namapegawai) => this.setState({ namapegawai })}
                        size="xl"
                        p={2}
                        placeholder="Nama Pegawai"
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
                <FormControl.Label>
                    <Text fontFamily="heading" fontWeight="500" fontSize="xl">Username</Text>
                </FormControl.Label> 
                <Box mb="5" borderRadius="20" shadow="3" bg="#FFFFFF" w="100%" h="75">
                    <Input
                        w="100%" h="75"
                        borderRadius="10" borderWidth="2"
                        mb="5"
                        size="2xl"
                        variant="underlined"
                        p={2}
                        placeholder="Username"
                        fontWeight="400"
                        fontFamily="mono"
                        placeholderTextColor="#57D1D1"
                        onChangeText={(username) => this.setState({ username })}
                        InputLeftElement={
                            <Feather
                                name="tag"
                                size={30}
                                color='#000000'
                            />
                        }
                    />
                </Box>
                <FormControl.Label>
                    <Text fontFamily="heading" fontWeight="500" fontSize="xl">Password</Text>
                </FormControl.Label> 
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
              <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.InsertData();}}
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
                            Tambah Pegawai
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
        </VStack>
      </NativeBaseProvider>
    );
  }
}