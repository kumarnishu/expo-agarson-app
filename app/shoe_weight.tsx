import { Button, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewShoeWeightDialog from '../components/dialogs/NewShoeWeightDialog'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/ModalContext'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const show_weight = () => {
  const { setChoice } = useContext(ChoiceContext)
  return (
    <>
      
      < Button
        title='Add Shoe Weight'
        onPress={
          () => {
            setChoice({ type: ProductionChoiceActions.create_showweight })
          }
        }
      />
      <NewShoeWeightDialog />
    </>


  )
}

export default show_weight