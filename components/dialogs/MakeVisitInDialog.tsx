import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import NewVisitForm from '../forms/NewVisitForm';
import { IVisit } from '../../types/visit';
import { LocationObject } from "expo-location";
import * as Location from "expo-location"



function MakeVisitInDialog({ visit }: { visit: IVisit }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [location, setLocation] = useState<LocationObject>();

    useEffect(() => {
        async function getLocation() {
            let result = await Location.requestForegroundPermissionsAsync();
            if (!result.granted) {
                return
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
            if (!loc)
                getLocation()
        }
        getLocation()


    }, []);
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.visit_in ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                {location && <NewVisitForm visit={visit} location={location} />}
            </Dialog>
        </>
    )
}

export default MakeVisitInDialog


