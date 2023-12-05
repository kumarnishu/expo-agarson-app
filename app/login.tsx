import { View, Image } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router';
import { UserContext } from '../contexts/UserContext';

const login = () => {
  const { user } = useContext(UserContext)

  if (user) return <Stack />

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
    </View>
  )
}

export default login