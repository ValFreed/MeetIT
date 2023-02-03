import React from 'react';
import { NativeBaseProvider, Icon, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Login from './page/login';
import front from './page/front';
import Absensi from './page/pegawai/absensi';
import Riwayat from './page/pegawai/riwayat';
import Pengumuman from './page/pegawai/pengumuman';
import Profil from './page/pegawai/profil';
import AbsenDetail from './page/pegawai/riwayatabsendetail';
import ListPegawai from './page/admin/listpegawai';
import PengumumanAdmin from './page/admin/pengumumanadmin';
import TambahPegawai from './page/admin/tambahpegawai';
import DetailPegawai from './page/admin/detailpegawai';
import AbsenDetailAdmin from './page/admin/riwayatabsenadmin';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigatorpegawai = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Absensi') {
            iconName = 'check';
          } else if (route.name === 'Riwayat') {
            iconName = 'briefcase';
          } else if (route.name === 'Pengumuman') {
            iconName = 'bell';
          } else if (route.name === 'Profil') {
            iconName = 'home';
          } 
          return (
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size={30}
              color={focused ? 'primary.600' : '#6E8FAD'}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? 'primary.600' : color} mb={2}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 50,
          borderTopWidth: 0,
          backgroundColor: '#57D1D1',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        },
      })}>
      <Tab.Screen
        name="Absensi"
        component={Absensi}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Pengumuman"
        component={Pengumuman}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BottomNavigatoradmin = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ListPegawai') {
            iconName = 'account-group';
          } else if (route.name === 'PengumumanAdmin') {
            iconName = 'bell';
          }
          return (
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size={30}
              color={focused ? 'primary.600' : '#6E8FAD'}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? 'primary.600' : color} mb={2}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 50,
          borderTopWidth: 0,
          backgroundColor: '#57D1D1',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        },
      })}>
      <Tab.Screen
        name="ListPegawai"
        component={ListPegawai}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="PengumumanAdmin"
        component={PengumumanAdmin}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavigatorpegawai"
            component={BottomNavigatorpegawai}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavigatoradmin"
            component={BottomNavigatoradmin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AbsenDetail"
            component={AbsenDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AbsenDetailAdmin"
            component={AbsenDetailAdmin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TambahPegawai"
            component={TambahPegawai}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailPegawai"
            component={DetailPegawai}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const RootNavigator = createSwitchNavigator(
  {
    App: App,
    Splash: front,
  },
  {
    initialRouteName: "Splash",
  }
);
export default createAppContainer(RootNavigator);