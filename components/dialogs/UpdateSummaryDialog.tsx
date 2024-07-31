import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import UpdateSummaryForm from '../forms/UpdateSummaryForm';
import { IVisitReport } from '../../types/visit';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';

function UpdateSummaryDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog fullScreen visible={choice === VisitChoiceActions.edit_summary ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
        >
            <GestureHandlerRootView>
                <ScrollView>
                    <Text style={{
                        padding: 5,
                        textAlign: 'center',
                        fontSize: 30,
                        textTransform: 'capitalize',
                        fontWeight: 'bold'
                    }}>{visit.party_name}</Text>
                    <UpdateSummaryForm visit={visit} />
                </ScrollView>
            </GestureHandlerRootView>
        </Dialog>
    )
}

export default UpdateSummaryDialog


