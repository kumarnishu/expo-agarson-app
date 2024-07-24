import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import NewVisitForm from '../forms/NewVisitForm';


function NewShoeWeightDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.visit_in ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                {location && <NewVisitForm visit={visit} location={location} />}
            </Dialog>
        </>
    )
}

export default NewShoeWeightDialog


