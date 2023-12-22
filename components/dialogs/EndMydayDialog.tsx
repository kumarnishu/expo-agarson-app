import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import EndMydayForm from '../forms/EndMyDayForm';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { IVisit } from '../../types/visit.types';

function EndMydayDialog({ visit }: { visit: IVisit }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.end_day ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >

                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 10 }}>END MY DAY</Text>
                <EndMydayForm visit={visit} />
            </Dialog>
        </>
    )
}

export default EndMydayDialog


