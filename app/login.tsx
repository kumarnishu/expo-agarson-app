import { View, Image } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../components/LoginForm';
import { LoadingContext } from '../contexts/LoadingContext';

const login = () => {
  const { user } = useContext(UserContext)
  const { loading } = useContext(LoadingContext)
  console.log(user)
  if (!loading && user)
    return <Stack />
  if (!loading && !user)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          flexDirection: 'row',
          height: 250,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={{ uri: 'https://img.icons8.com/fluency/96/null/instagram-new.png', height: 100, width: 100 }} />
        </View>
        <LoginForm />
      </View>
    )
}

export default login