import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { paths } from '../../utils/paths'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
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
              <Link key={index} style={style.button} href={feat.url}>
                <Text style={style.buttontext}>{feat.feature.toUpperCase()}</Text>
              </Link>
            )
          })
        }
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  button: {
    flex: 1, paddingTop: 50,
    backgroundColor:'white',
    borderBottomWidth:1
  },
  buttontext: {
    fontSize: 40,
    fontWeight:'bold',
    margin:10
  }
})
export default Dashboard