import { useContext } from 'react';
import Dialog from '../../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../../contexts/ModalContext';
import { Text, View } from 'react-native';
import StartMydayForm from '../../forms/visit/StartMyDayForm';

function StartMydayDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.start_day ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <View>
                    <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>Start My day</Text>
                    <StartMydayForm />
                </View>
            </Dialog>
        </>
    )
}

export default StartMydayDialog



