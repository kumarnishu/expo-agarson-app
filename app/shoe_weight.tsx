import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const show_weight = () => {
  const { setChoice } = useContext(ChoiceContext)
  return (
    <>
      
     <SafeAreaView>
        <GestureHandlerRootView>
          <ScrollView>

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
     </SafeAreaView>
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
  button: {
    padding: 10,
    bottom:0,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 5
  },
  buttontext: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
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