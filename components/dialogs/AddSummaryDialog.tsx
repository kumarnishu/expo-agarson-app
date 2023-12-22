import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import AddSummaryForm from '../forms/AddSummaryForm';
import { IVisitReport } from '../../types/visit.types';
import { Text } from 'react-native-paper';

function AddSummaryDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.add_summary ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <Text style={{ textAlign: 'center', paddingTop: 20, fontWeight: 'bold', fontSize: 20 }}>{visit.party_name}</Text>
                <AddSummaryForm visit={visit} />
            </Dialog>
        </>
    )
}

export default AddSummaryDialog


