import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import StartMydayForm from '../forms/StartMyDayForm';
import { LocationObject } from "expo-location";
import * as Location from "expo-location"


function StartMydayDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [location, setLocation] = useState<LocationObject>();

    useEffect(() => {
        (async () => {
            let result = await Location.requestForegroundPermissionsAsync();
            if (!result.granted) {
                return
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.start_day ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                {location && <StartMydayForm location={location} />}
            </Dialog>
        </>
    )
}

export default StartMydayDialog


