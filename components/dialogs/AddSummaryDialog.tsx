import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import AddSummaryForm from '../forms/AddSummaryForm';
import { IVisitReport } from '../../types/visit';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';

function AddSummaryDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog fullScreen visible={choice === VisitChoiceActions.add_summary ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
        >
            <GestureHandlerRootView>
                <ScrollView>
                    <Text style={{
                        fontFamily: 'Roboto',
                        padding: 5,
                        textAlign: 'center',
                        fontSize: 30,
                        textTransform:'capitalize',
                        fontWeight: '500'
                    }}>{visit.party_name}</Text>
                    <AddSummaryForm visit={visit} />
                </ScrollView>
            </GestureHandlerRootView>
        </Dialog>
    )
}

export default AddSummaryDialog


