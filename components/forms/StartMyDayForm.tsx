import { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import { BackendError } from '../..';
import { StartMyDay } from '../../services/VisitServices';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisit } from '../../types/visit';
import { queryClient } from '../../app/_layout';
import CameraComponent from '../Camera';
import { LocationObject } from 'expo-location';

function StartMydayForm({ location }: { location: LocationObject }) {
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
                    name: 'photo' + new Date().toDateString() + ".jpg",
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
