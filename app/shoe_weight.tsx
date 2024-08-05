import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { IShoeWeight } from '../types/production'
import { BackendError } from '..'
import { GetMytodayShoeWeights } from '../services/ProductionServices'
import { months } from '../utils/months'
import Add2ndWeightDialog from '../components/dialogs/Add2ndWeightDialog'
import Add3rdWeightDialog from '../components/dialogs/Add3rdWeightDialog'
import FuzzySearch from 'fuzzy-search'
import { UserContext } from '../contexts/UserContext'

const show_weight = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { setChoice } = useContext(ChoiceContext);
  const { user } = useContext(UserContext)
  const [filter, setFilter] = useState<string | undefined>()
  const [weight, setWeight] = useState<IShoeWeight>()
  const [weights, setWeights] = useState<IShoeWeight[]>([])
  const [preFilteredData, setPreFilteredData] = useState<IShoeWeight[]>([])
  const { data, isLoading, isSuccess, refetch } = useQuery
    <AxiosResponse<IShoeWeight[]>, BackendError>
    ("shoe_weights", GetMytodayShoeWeights);

  useEffect(() => {
    if (filter) {
      if (weights) {
        const searcher = new FuzzySearch(weights, ["dye.dye_number", "article.name", "machine.name"], {
          caseSensitive: false,
        });
        const result = searcher.search(filter);
        setWeights(result)
      }
    }
    if (!filter)
      setWeights(preFilteredData)

  }, [filter])

  useEffect(() => {
    if (isSuccess) {
      setWeights(data.data)
      setPreFilteredData(data.data)
    }
  }, [isSuccess, data])

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
          <View style={{ flex: 1, flexDirection: 'row', padding: 5, alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text style={style.heding}>Weights : {weights.length}</Text>
            {user?.assigned_permissions.includes('shoe_weight_create') && < Pressable
              style={style.button}
              onPress={
                () => {
                  setWeight(undefined)
                  setChoice({ type: ProductionChoiceActions.create_showweight })
                }
              }
            >
              <Text style={style.buttontext}>Add New</Text>
            </Pressable>}
          </View>
          <TextInput style={style.textinput} value={filter} onChangeText={(value) => setFilter(value)} placeholder='Search Dye,Article,Machine' />

          {isLoading ? <ActivityIndicator /> :
            weights && weights.map((weight, index) => {
              return (
                <View key={index} style={{ gap: 2, padding: 10, borderBottomWidth: 1, backgroundColor: 'whitesmoke', shadowRadius: 10, justifyContent: 'center' }}>
                  <Text style={style.heding}>DYE {weight.dye && weight.dye.dye_number}</Text>
                  <Text style={style.label}>Article : {weight.article && weight.article.display_name}</Text>
                  <Text style={style.label}>Size : {weight.dye && weight.dye.size}</Text>
                  <Text style={style.label}>Machine : {weight.machine && weight.machine.display_name}</Text>
                  <Text style={style.label}>St. Weight : {weight.dye && weight.dye.stdshoe_weight}</Text>
                  {weight.upper_weight && <Text style={style.label}>Upper Weight   : {weight.upper_weight}</Text>}
                  {weight.shoe_weight1 && <Text style={style.label}>Weight1 : {weight.shoe_weight1}   | {weight.weighttime1 && new Date(weight.weighttime1).toLocaleTimeString()}</Text>}
                  {weight.shoe_weight2 && <Text style={style.label}>Weight2 : {weight.shoe_weight2}   | {weight.weighttime2 && new Date(weight.weighttime2).toLocaleTimeString()}</Text>}
                  {weight.shoe_weight3 && <Text style={style.label}>Weight3 : {weight.shoe_weight3}   | {weight.weighttime3 && new Date(weight.weighttime3).toLocaleTimeString()}</Text>}
                  <Text style={style.label}>Clock In : {months.find(m => m.month == weight.month)?.label || 'N/A'}</Text>
                  <Text style={style.label}>By : {weight.created_by && weight.created_by.username.toUpperCase() || 'N/A'}</Text>
                  <View style={{ flex: 1, gap: 5, flexDirection: 'row' }}>

                    < Pressable
                      style={!weight.shoe_weight1 ? style.circleredbutton : weight.shoe_weight1 - weight.dye.stdshoe_weight - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circleyellowbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={weight.shoe_weight1 - weight.dye.stdshoe_weight - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circlebuttonblacktext : style.circlebuttontext}>{weight.shoe_weight1 - weight.upper_weight + 30}</Text>
                    </Pressable>



                    < Pressable
                      style={!weight.shoe_weight2 ? style.circleredbutton : weight.shoe_weight2 - weight.dye.stdshoe_weight - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circleyellowbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight2 })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={weight.shoe_weight2 - weight.dye.stdshoe_weight - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circlebuttonblacktext : style.circlebuttontext}>{weight.shoe_weight2 - weight.upper_weight + 30}</Text>
                    </Pressable>


                    < Pressable
                      style={!weight.shoe_weight3 ? style.circleredbutton : weight.shoe_weight3 - weight.dye.stdshoe_weight - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circleyellowbutton : style.circlebutton}
                      onPress={
                        () => {
                          setWeight(weight)
                          setChoice({ type: ProductionChoiceActions.create_showweight3 })
                        }
                      }
                      disabled={isLoading}
                    >
                      <Text style={weight.shoe_weight3 - weight.upper_weight + 30 > weight.dye.stdshoe_weight ? style.circlebuttonblacktext : style.circlebuttontext}>{weight.shoe_weight3 - weight.dye.stdshoe_weight - weight.upper_weight + 30}</Text>
                    </Pressable>
                  </View>
                </View>
              )
            })
          }

        </ScrollView>
      </GestureHandlerRootView>
      <NewShoeWeightDialog shoeweight={weight} useddyes={weights.map((d) => { return d.dye._id })} />
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
    padding: 15,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 20,
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
    justifyContent: 'center',
    width: 120,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'green'
  },
  circleredbutton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'red'
  },
  circleyellowbutton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'yellow'
  },
  circlebuttonblacktext: {
    padding: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
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
    fontSize: 24,
    fontWeight: 'bold'
  },
  switch: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default show_weight