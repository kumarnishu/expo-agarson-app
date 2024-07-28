import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { Button } from 'react-native-paper'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const show_weight = () => {
  const { setChoice } = useContext(ChoiceContext)
  return (
    <>
      
      < Button
        mode='contained'
        style={{ width: '100%',position: 'absolute',padding:10, bottom: 0, marginBottom: 10 }}
        onPress={
          () => {
            setChoice({ type: ProductionChoiceActions.create_showweight })
          }
        }
      ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Shoe Weight</Text>
      </Button>
      <NewShoeWeightDialog />
    </>


  )
}

export default show_weight