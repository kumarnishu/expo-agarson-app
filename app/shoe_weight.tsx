import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { IShoeWeight } from '../types/production'
import { BackendError } from '..'
import { GetMytodayShoeWeights } from '../services/ProductionServices'

const show_weight = () => {
  const { setChoice } = useContext(ChoiceContext);
  const [weights, setWeights] = useState<IShoeWeight[]>([])
  const { data, isLoading, isSuccess, error } = useQuery
    <AxiosResponse<IShoeWeight[]>, BackendError>
    ("weights", GetMytodayShoeWeights);

  useEffect(() => {
    if (isSuccess && data) {
      setWeights(data.data)
    }
  }, [isSuccess])
  console.log(data)
  return (
    <>

      <GestureHandlerRootView style={{ marginTop: 50, paddingVertical: 10 }}>
        <ScrollView>
          {
            weights && weights.map((weight, index) => {
              return (
                <View key={index} style={{ gap: 2, padding: 10, borderBottomWidth: 2, backgroundColor: 'whitesmoke' }}>
                  <Text style={style.heding}>Dye - {weight.dye && weight.dye.dye_number}</Text>
                  <Text style={style.label}>Running Article : {weight.article && weight.article.display_name}</Text>
                  <Text style={style.label}>On Machine : {weight.dye && weight.dye.stdshoe_weight}</Text>
                  <Text style={style.label}>St. Weight : {weight.dye && weight.dye.stdshoe_weight}</Text>
                  <Text style={style.label}>Weight1 : {weight.shoe_weight1 ? weight.shoe_weight1 : 'Pending'}</Text>
                  <Text style={style.label}>Weight2 : {weight.shoe_weight2 ? weight.shoe_weight2 : 'Pending'}</Text>
                  <Text style={style.label}>Weight3 : {weight.shoe_weight3 ? weight.shoe_weight3 : 'Pending'}</Text>
                  <View style={{ flex: 1, justifyContent: 'space-between', gap: 5, flexDirection: 'row', padding: 10 }}>
                    < Pressable
                      style={!weight.shoe_weight1 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          Alert.alert("1")
                        }
                      }
                      disabled={isLoading || Boolean(weight.shoe_weight1)}
                    >
                      <Text style={style.buttontext}>1</Text>
                    </Pressable>
                    < Pressable
                      style={!weight.shoe_weight2 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          Alert.alert("2")
                        }
                      }
                      disabled={isLoading || Boolean(weight.shoe_weight2)}
                    >
                      <Text style={style.buttontext}>2</Text>
                    </Pressable>
                    < Pressable
                      style={!weight.shoe_weight3 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          Alert.alert("3")
                        }
                      }
                      disabled={isLoading || Boolean(weight.shoe_weight3)}
                    >
                      <Text style={style.buttontext}>3</Text>
                    </Pressable>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </GestureHandlerRootView>
      < Pressable
        style={style.button}
        onPress={
          () => {
            setChoice({ type: ProductionChoiceActions.create_showweight })
          }
        }
      >
        <Text style={style.buttontext}>New Shoe Weight</Text>
      </Pressable>
      <NewShoeWeightDialog />

    </>


  )
}
const style = StyleSheet.create({
  textinput: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginHorizontal: 5,
    fontSize: 25,
    marginVertical: 2,
    textTransform: 'capitalize'
  },
  card: {
    fontFamily: 'Roboto',
    backgroundColor: 'white',
    padding: 20,
    paddingLeft: 10,
    borderBottomWidth: 1
  },
  circlebutton: {
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'green'
  },
  circleredbutton: {
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'red'
  },
  circlebuttontext: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    padding: 10,
    bottom: 0,
    marginTop: 5,
    backgroundColor: 'green',
  },
  buttontext: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  heding: {
    padding: 5,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  switch: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default show_weight