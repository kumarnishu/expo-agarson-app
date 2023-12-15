import { View, Text, Pressable } from 'react-native'
import React from 'react'

const leads = () => {
  return (
    <View>
      <Pressable onPress={() => alert("hi")}>
        <Text>leads</Text>
      </Pressable>
    </View>
  )
}

export default leads