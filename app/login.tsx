import { View, Image } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../components/forms/LoginForm';
import { LoadingContext } from '../contexts/LoadingContext';
import { AntDesign } from '@expo/vector-icons';

const login = () => {
  const { user } = useContext(UserContext)
  const { loading } = useContext(LoadingContext)
  if (!loading && user)
    return <Stack />
  if (!loading && !user)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AntDesign name="stepforward" size={24} color="black" />
        <LoginForm />
      </View>
    )
}

export default login