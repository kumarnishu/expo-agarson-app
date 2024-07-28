import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { paths } from '../../utils/paths'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Divider, MD2Colors, Text } from 'react-native-paper'
import { View } from 'react-native'
import { Link } from 'expo-router'


const Dashboard = () => {
  const [features, setFeatures] = useState<{ feature: string, url: string }[]>([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    let tmpfeatures: { feature: string, url: string }[] = []
    user?.is_active && tmpfeatures.push({ feature: 'my visit ', url: paths.visit })
    user?.assigned_permissions.includes("shoe_weight_view") && tmpfeatures.push({ feature: 'shoe weight', url: paths.shoe_weight })

    setFeatures(tmpfeatures)
  }, [])
  return (
    <GestureHandlerRootView>
      <ScrollView>
        {
          features.map((feat, index) => {
            return (
              <View key={index} style={{ flex: 1, borderRadius: 5, backgroundColor: MD2Colors.white }}>
                <Link style={{ flex: 1, paddingTop: 20, paddingBottom: 20, paddingLeft: 10, fontSize: 10,textShadowRadius:2,textShadowColor:'black' }} href={feat.url}>
                  <Text variant='displaySmall'>{feat.feature.toUpperCase()}</Text>
                </Link>
                <Divider />
              </View >
            )
          })
        }
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Dashboard