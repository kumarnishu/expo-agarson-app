import { View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../components/forms/LoginForm';
import { LoadingContext } from '../contexts/LoadingContext';

const login = () => {
  const { user } = useContext(UserContext)
  const { loading } = useContext(LoadingContext)
  if (!loading && user)
    return <Stack />
  if (!loading && !user)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginForm />
      </View>
    )
}

export default login