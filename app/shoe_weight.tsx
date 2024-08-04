import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { IShoeWeight } from '../types/production'
import { BackendError } from '..'
import { GetMytodayShoeWeights } from '../services/ProductionServices'
import { months } from '../utils/months'
import Add2ndWeightDialog from '../components/dialogs/Add2ndWeightDialog'
import Add3rdWeightDialog from '../components/dialogs/Add3rdWeightDialog'

const show_weight = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { setChoice } = useContext(ChoiceContext);
  const [weight, setWeight] = useState<IShoeWeight>()
  const [weights, setWeights] = useState<IShoeWeight[]>([])
  const { data, isLoading, isSuccess, refetch } = useQuery
    <AxiosResponse<IShoeWeight[]>, BackendError>
    ("shoe_weights", GetMytodayShoeWeights);

  useEffect(() => {
    if (isSuccess) {
      setWeights(data.data)
    }
  }, [isSuccess])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      refetch()
    }, 2000);
  }, []);
  return (
    <>

      <GestureHandlerRootView style={{ marginTop: 50, paddingVertical: 10 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 }}>
            <Text style={style.heding}>Weights : {weights.length}</Text>
            < Pressable
              style={style.button}
              onPress={
                () => {
                  setWeight(undefined)
                  setChoice({ type: ProductionChoiceActions.create_showweight })
                }
              }
            >
              <Text style={style.buttontext}>Add New</Text>
            </Pressable>
          </View>
          {
            weights && weights.map((weight, index) => {
              return (
                <View key={index} style={{ gap: 2, padding: 10, borderBottomWidth: 1, backgroundColor: 'whitesmoke', shadowRadius: 10, justifyContent: 'center' }}>
                  <Text style={style.heding}>DYE {weight.dye && weight.dye.dye_number}</Text>
                  <Text style={style.label}>Article : {weight.article && weight.article.display_name}</Text>
                  <Text style={style.label}>Size : {weight.dye && weight.dye.size}</Text>
                  <Text style={style.label}>Machine : {weight.machine && weight.machine.display_name}</Text>
                  <Text style={style.label}>St. Weight : {weight.dye && weight.dye.stdshoe_weight}</Text>
                  <Text style={style.label}>Weight1 : {weight.shoe_weight1 ? weight.shoe_weight1 : 'Pending'}  : {weight.weighttime1 && new Date(weight.weighttime1).toLocaleTimeString()}</Text>
                  <Text style={style.label}>Weight2 : {weight.shoe_weight2 ? weight.shoe_weight2 : 'Pending'}  : {weight.weighttime2 && new Date(weight.weighttime2).toLocaleTimeString()}</Text>
                  <Text style={style.label}>Weight3 : {weight.shoe_weight3 ? weight.shoe_weight3 : 'Pending'}  : {weight.weighttime3 && new Date(weight.weighttime3).toLocaleTimeString()}</Text>
                  <Text style={style.label}>Clock In : {months.find(m => m.month == weight.month)?.label || 'N/A'}</Text>
                  <View style={{ flex: 1, justifyContent: 'space-between', gap: 5, flexDirection: 'row', padding: 10 }}>
                    < Pressable
                      style={!weight.shoe_weight1 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={style.circlebuttontext}>1</Text>
                    </Pressable>
                    < Pressable
                      style={!weight.shoe_weight2 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight2 })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={style.circlebuttontext}>2</Text>
                    </Pressable>
                    < Pressable
                      style={!weight.shoe_weight3 ? style.circleredbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight3 })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={style.circlebuttontext}>3</Text>
                    </Pressable>
                  </View>
                </View>
              )
            })
          }

        </ScrollView>
      </GestureHandlerRootView>
      <NewShoeWeightDialog shoeweight={weight} />
      {weight != undefined && <>
        <Add2ndWeightDialog shoeweight={weight} />
        <Add3rdWeightDialog shoeweight={weight} />
      </>}

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
    paddingBottom: 30,
    paddingLeft: 10,
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
    padding: 5,
    paddingHorizontal: 10,
    bottom: 0,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase'
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