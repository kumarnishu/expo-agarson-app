import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import NewShoeWeightForm from '../forms/NewShoeWeightForm';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';


function NewShoeWeightDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === ProductionChoiceActions.create_showweight ? true : false} handleClose={() => setChoice({ type: ProductionChoiceActions.close_production })}
            >
                <GestureHandlerRootView>
                    <ScrollView>
                        <NewShoeWeightForm />
                    </ScrollView>
                </GestureHandlerRootView>
            </Dialog>
        </>
    )
}

export default NewShoeWeightDialog


