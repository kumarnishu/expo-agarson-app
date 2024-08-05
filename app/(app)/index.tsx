import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { paths } from '../../utils/paths'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'


const Dashboard = () => {
  const [features, setFeatures] = useState<{ feature: string, url: string }[]>([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    let tmpfeatures: { feature: string, url: string }[] = []
    user?.assigned_permissions.includes("visit_view") && tmpfeatures.push({ feature: 'my visit ', url: paths.visit })
    user?.assigned_permissions.includes("shoe_weight_view") && tmpfeatures.push({ feature: 'shoe weight', url: paths.shoe_weight })
    user?.assigned_permissions.includes("dye_status_view") && tmpfeatures.push({ feature: 'dye status', url: paths.dye_status })

    setFeatures(tmpfeatures)
  }, [])
  return (
    <GestureHandlerRootView>
      <ScrollView>
        {
          features.map((feat, index) => {
            return (
              <Link key={index} style={style.card} href={feat.url}>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                  <Image source={require("../../assets/OIP.jpeg")} style={{
                    width: 50,
                    height: 50,
                    borderRadius:50
                  }} />
                  <Text style={style.cardtext}>{feat.feature.toUpperCase()}</Text>
                </View>
              </Link>
            )
          })
        }
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  card: {
    fontFamily: 'Roboto',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 30,
    paddingHorizontal:10
  },
  cardtext: {
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: '400',
  }
})
export default Dashboard