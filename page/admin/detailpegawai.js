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
import { getDocs, collection, where, updateDoc, doc, deleteDoc} from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";

export default class Detailpegawai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namapegawai: "",
      password: "",
      data: [],
      datapegawai: [],
      check_textInputChange: false,
      secureTextEntry: true,
      isLoading: false,
    };
  }
  
  componentDidMount(){
    const datapegawai = this.state.datapegawai;
    const username = datapegawai.username;
    this.setState({ isLoading: true });
    getDocs(
      collection(firebase, "riwayatabsen"),where('username', '==', username)
      ).then(docSnap => {
      let data = [];
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), 
          id: doc.id
        });
      });
      this.setState({ isLoading: false });
      this.setState({data});
    });
    const { data } = this.props.route.params;
    this.setState({datapegawai: data});
  }

  UpdateData = () => {
    this.setState({ isLoading: true });
    var Usernameee = this.state.datapegawai.username;
    var Namapegawai = this.state.namapegawai;
    var Password = this.state.password;
    if (Namapegawai.length == 0 && Password.length != 0) {
        updateDoc(doc(firebase, "pegawai", Usernameee),{
            password: Password
        })
        .then(() => {
          this.setState({ isLoading: false });
          console.log("Berhasil Update Password");
          Alert.alert("Pemberitahuan","Berhasil Update Password");
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.log(error);
          Alert.alert("Pemberitahuan","Data Gagal DiUpdate");
        })
    } else if (Namapegawai.length != 0 && Password.length != 0) {
        updateDoc(doc(firebase, "pegawai", Usernameee),{
            namapegawai: Namapegawai,
            password: Password
        })
        .then(() => {
          this.setState({ isLoading: false });
          console.log("Berhasil Update Nama Pegawai dan Password");
          Alert.alert("Pemberitahuan","Berhasil Update Nama Pegawai dan Password");
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.log(error);
          Alert.alert("Pemberitahuan","Data Gagal DiUpdate");
        })
    } else if ((Namapegawai.length == 0 && Password.length == 0)){
      this.setState({ isLoading: false });
        Alert.alert("Harap isi data");
    } else if ((Namapegawai.length != 0 && Password.length == 0)){
        updateDoc(doc(firebase, "pegawai", Usernameee),{
            namapegawai: Namapegawai
        })
        .then(() => {
          this.setState({ isLoading: false });
          console.log("Berhasil Update Nama Pegawai");
          Alert.alert("Pemberitahuan","Berhasil Update Nama Pegawai");
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.log(error);
          Alert.alert("Pemberitahuan","Data Gagal DiUpdate");
        })
    }
  };
  
  DeleteData=()=>{
    this.setState({ isLoading: true });
    var Username = this.state.datapegawai.username;
    const { navigation } = this.props;
    deleteDoc(doc(firebase,"pegawai", Username))
      .then(() => {
        this.setState({ isLoading: false });
          console.log("Pegawai berhasil dihapus");
          Alert.alert("Pemberitahuan","Pegawai Berhasil diHapus!");
          navigation.goBack();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
          setError(error.message);
          Alert.alert("Pemberitahuan","Pegawai Gagal diHapus!");
      })
  }
  
  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    const datapegawai = this.state.datapegawai;
    if(item.username == datapegawai.username){
      const data = {tanggal: item.tanggal, jam: item.jam, latitude: item.latitude, longitude: item.longitude, username: item.username, kode: item.kode, namapegawai: datapegawai.namapegawai};
      return(
        <>
          <Center>
            <Pressable
              mt='2'
              borderRadius="50" 
              borderColor="#57D1D1" 
              borderWidth="1" 
              bg="#F0FFFF" 
              w="95%" 
              h="75"  
              justifyContent={"center"}
              overflow="hidden"
              onPress={() => navigation.navigate('AbsenDetailAdmin', {data})}
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
            <Text mt="10" fontSize="xl" bold>Detail Pegawai</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <Center>
                <Box mt="10" mb="5" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="670"  alignItems={"center"}>
                    <Box mt="5" mb="2" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="280" justifyContent={"center"} alignItems={"center"} px="5">
                        <FormControl w="100%" mt="5">
                        <Box mb="5" borderRadius="10" borderColor="#DCDCDC" borderWidth="2" shadow="3" bg="#FFFAF0" w="100%" h="50">
                            <Flex w="100%" h="50" borderRadius="10" borderColor="#F8F8FF" borderWidth="2" mb="5"p={2} flexDirection="row">
                                <Feather
                                    name="tag"
                                    size={30}
                                    color='#000000'
                                />
                                <Text fontSize="2xl" fontWeight="400" fontFamily="mono">{this.state.datapegawai.username}</Text>
                            </Flex>
                        </Box>
                        <Box  mb="5" borderRadius="10" shadow="3" bg="#FFFFFF" w="100%" h="50">
                            <Input
                                w="100%" h="50"
                                borderRadius="10" borderWidth="2"
                                onChangeText={(namapegawai) => this.setState({ namapegawai })}
                                size="xl"
                                p={2}
                                placeholder={this.state.datapegawai.namapegawai}
                                fontWeight="400"
                                fontFamily="mono"
                                placeholderTextColor="#000000"
                                InputLeftElement={
                                    <Icon
                                    name="user"
                                    size={30}
                                    color='#000000'
                                    />
                                }
                            />
                        </Box>
                        <Box mb="5" borderRadius="10" shadow="3" bg="#FFFFFF" w="100%" h="50">
                            <Input
                                w="100%" h="50"
                                borderRadius="10" borderWidth="2"
                                mb="5"
                                size="2xl"
                                variant="underlined"
                                p={2}
                                placeholder="Password"
                                fontWeight="400"
                                fontFamily="mono"
                                placeholderTextColor="#57D1D1"
                                defaultValue={this.state.datapegawai.password}
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
                        <HStack mb="5">
                            <Pressable
                                onPress={() => {this.DeleteData();}}
                                bg="#DC143C"
                                borderRadius="15"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "49%",
                                    padding: 10,
                                }}
                            >
                                <Text fontSize="20" color="#DCDCDC" fontWeight="bold">
                                    Hapus Pegawai
                                </Text>
                            </Pressable>
                            <Spacer/>
                            <Pressable
                                onPress={() => {this.UpdateData();}}
                                bg="#57D1D1"
                                borderRadius="15"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "49%",
                                    padding: 10,
                                }}
                            >
                                <Text fontSize="20" color="#000000" fontWeight="bold">
                                    Update Data
                                </Text>
                            </Pressable>
                        </HStack>
                    </Box>
                    <Text fontSize= "23" bold>Riwayat Absen Pegawai</Text>
                    <Box mt="2" mb="3" borderRadius="40" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="250" justifyContent={"center"} alignItems={"center"}>
                      {this.state.isLoading ? (
                              <ActivityIndicator size="large" color="#AA0002"/>
                          ): (
                          <FlatList
                              width="95%"
                              data={this.state.data}
                              renderItem={this.renderItem}
                          />
                      )}
                    </Box>  
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
                </Box>
            </Center>
          </Box>
          <Box borderRadius="20" borderColor="#57D1D1" borderWidth="3" shadow="5" bg="#FFFFFF" w="95%" h="75" justifyContent={"center"} position={"absolute"} top={20} >
            <Text px="5" fontSize="20">Nama Pegawai: {this.state.datapegawai.namapegawai}</Text>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}