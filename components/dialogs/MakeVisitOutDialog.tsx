import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { IVisitReport } from '../../types/visit.types';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { MakeVisitOut } from '../../services/VisitServices';
import { queryClient } from '../../app/_layout';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { LocationObject } from "expo-location";
import * as Location from "expo-location"

function MakeVisitOutDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [location, setLocation] = useState<LocationObject>();

   

    const { mutate, isLoading } = useMutation
        <AxiosResponse<any>, BackendError, {
            id: string;
            body: FormData;
        }>
        (MakeVisitOut, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
                setChoice({ type: VisitChoiceActions.close_visit })
            }
        })

    function handleSubmit() {
        async function submit() {
            if (location) {
                let formdata = new FormData()
                let Data = {
                    visit_out_credentials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    }
                }

                formdata.append("body", JSON.stringify(Data))
                mutate({
                    id: visit._id,
                    body: formdata
                })
            }
        }
        submit()
    }
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
            <Dialog fullScreen visible={choice === VisitChoiceActions.visit_out ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 50, alignItems: 'center', marginTop: 200, padding: 10 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{visit.party_name}</Text>
                    < Button
                        mode='outlined'
                        disabled={isLoading}
                        style={{ width: '100%' }}
                        onPress={
                            () => {
                                handleSubmit()
                                setChoice({ type: VisitChoiceActions.visit_out })
                            }
                        }
                    >
                        {isLoading?<ActivityIndicator size="large"/>:
                        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}> VISIT OUT</Text>}
                    </Button>
                </View >
            </Dialog>
        </>
    )
}

export default MakeVisitOutDialog


