import { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import { BackendError } from '../..';
import { StartMyDay } from '../../services/VisitServices';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisit } from '../../types/visit.types';
import { queryClient } from '../../app/_layout';
import { LocationContext } from '../../contexts/LocationContext';
import CameraComponent from '../Camera';

function StartMydayForm() {
    const { location } = useContext(LocationContext)
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IVisit>, BackendError, FormData>
        (StartMyDay, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })
    const { setChoice } = useContext(ChoiceContext)

    function handlePress() {
        async function submit() {
            if (location && photo) {
                let formdata = new FormData()
                formdata.append("body", JSON.stringify({
                    start_day_credientials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    }
                }))
                //@ts-ignore
                formdata.append('media', {
                    uri: photo.uri,
                    name: 'photo.jpg',
                    type: 'image/jpeg'
                })
                mutate(formdata)
            }
        }
        submit()
    }

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])
    return (
        <>
           
            {!location && <Text style={{ color: 'red' }}>Please Allow Location Access</Text>}
            {location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handlePress} />}
        </>
    )
}


export default StartMydayForm
