import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Login } from '../services/UserServices';
import { ActivityIndicator, Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { isError, useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user';
import { BackendError } from '..';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { mutate, data, isSuccess, isLoading, error } = useMutation
    <AxiosResponse<{ user: IUser, token: string }>,
      BackendError,
      { username: string, password: string, multi_login_token?: string }
    >(Login)

  function handleSubmit() {
    if (username && password)
      mutate({ username, password })
  }
  useEffect(() => {
    if (!username) {
      async function Set() {
        let uname = await AsyncStorage.getItem('uname')
        let passwd = await AsyncStorage.getItem('passwd')
        setUsername(String(uname))
        setPassword(String(passwd))
      }
      Set()
    }
  }, [])

  useEffect(() => {
    async function Set() {
      if (username && password) {
        await AsyncStorage.setItem('uname', username)
        await AsyncStorage.setItem('passwd', password)
      }
    }
    if (isSuccess) {
      setUser(data.data.user)
      router.replace("/")
      Set()
    }
    if (error) {
      Alert.alert(error?.response.data.message || 'unknown error')
    }
  }, [isSuccess, error])

  return (
    <>

      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', marginBottom: 50, paddingTop: 90 }}>
          <Image style={{ height: 180, width: 180 }} source={require("../assets/icon.png")} />
          <Text>Long Lasting safety shoes</Text>
        </View>
        <Text style={style.label} >Username,email or mobile</Text>
        <TextInput
          style={style.textinput}
          autoCapitalize='none'
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={style.label}>Password</Text>
        <TextInput
          style={style.textinput}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Pressable style={style.button} onPress={() => handleSubmit()} disabled={isLoading}>
          {isLoading ? <ActivityIndicator  /> : <Text style={style.buttontext}>SIGN IN</Text>}
        </Pressable>

      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  textinput: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginHorizontal: 15,
    marginVertical: 2,
    flex: 1,
    textTransform: 'capitalize'
  },
  button: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 5
  },
  buttontext: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
})


export default LoginScreen