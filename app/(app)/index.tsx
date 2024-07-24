import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { paths } from '../../utils/paths'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {  Divider,  MD2Colors,  Text } from 'react-native-paper'
import { View } from 'react-native'
import { Link } from 'expo-router'

const Dashboard = () => {
  const [features, setFeatures] = useState<{ feature: string, url: string }[]>([])
  const { user } = useContext(UserContext)
  //process feature and access
  useEffect(() => {
    let tmpfeatures: { feature: string, url: string }[] = []
    tmpfeatures.push({ feature: 'my visit ', url: paths.visit })
    user?.is_admin && tmpfeatures.push({ feature: 'shoe weight', url: paths.shoe_weight })
    setFeatures(tmpfeatures)
  }, [])
  return (
    <GestureHandlerRootView>
      <ScrollView>
        {
          features.map((feat, index) => {
            return (
            <>
                <View  key={index} style={{ flex: 1, borderRadius:5,backgroundColor:MD2Colors.white }}>
                  <Link style={{ flex: 1, paddingTop: 40, paddingBottom: 20,paddingLeft:5, fontSize: 20}} href={feat.url}>
                    <Text variant='displaySmall'>{feat.feature.toUpperCase()}</Text>
                  </Link>
                </View >
            </>
            )
          })
        }
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Dashboard