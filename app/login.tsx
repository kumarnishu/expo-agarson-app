import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Login } from '../services/UserServices';
import { Image, ScrollView, View } from 'react-native';
import { Button, MD2Colors, Snackbar, Text, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user.types';
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
  }, [isSuccess])
  
  return (
    <>
      <Snackbar
        visible={Boolean(error)}
        onDismiss={() => null}
        action={{
          label: 'Undo',
          onPress: () => {
            null
          },
        }}>
        {error && error.response.data.message || ""}
      </Snackbar>
      <ScrollView contentContainerStyle={{ flex: 1, gap: 15, justifyContent: 'flex-start', padding: 10, marginTop: 40 }}>
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <Image style={{ height: 150, width: 150 }} source={require("../assets/icon.png")} />
          <Text>Long Lasting safety shoes</Text>
        </View>

        <TextInput
          mode="outlined"
          style={{ borderRadius: 10, borderWidth: 1, borderColor: MD2Colors.blue400, paddingTop: 5 }}
          outlineStyle={{ display: 'none' }}
          label="Username,email or mobile"
          autoCapitalize='none'
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          mode="outlined"
          style={{ borderRadius: 10, borderWidth: 1, borderColor: MD2Colors.blue400, paddingTop: 5 }}
          outlineStyle={{ display: 'none' }}
          label='Password'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {<Button
          mode="contained"
          disabled={isLoading}
          style={{ borderRadius: 10, marginTop: 10, padding: 10 }}
          onPress={() => handleSubmit()}>
          {!isLoading ? "SIGN IN" : "LOGGING IN ..."}
        </Button>}
      </ScrollView>
    </>
  )
}



export default LoginScreen