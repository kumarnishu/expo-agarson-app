import { View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../components/LoginForm';
import { LoadingContext } from '../contexts/LoadingContext';
import { Avatar } from '@rneui/themed';

const login = () => {
  const { user } = useContext(UserContext)
  const { loading } = useContext(LoadingContext)
  if (!loading && user)
    return <Stack />
  if (!loading && !user)
    return (
      <>
        <View style={{ flex: 1, flexDirection: 'column', gap: 10, paddingTop: 50 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              size={180}
              source={require("../assets/favicon.png")}
            />
          </View>
          <View>
            <LoginForm />
          </View>
        </View>
      </>

    )
}

export default login