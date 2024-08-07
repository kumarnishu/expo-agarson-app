import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import EndMydayForm from '../forms/EndMyDayForm';
import { IVisit } from '../../types/visit';
import { LocationObject } from "expo-location";
import * as Location from "expo-location"

function EndMydayDialog({ visit }: { visit: IVisit }) {
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
            <Dialog fullScreen visible={choice === VisitChoiceActions.end_day ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                {location && <EndMydayForm visit={visit} location={location} />}
            </Dialog>
        </>
    )
}

export default EndMydayDialog


