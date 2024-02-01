import { useContext, useEffect, useState } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { IVisit, IVisitReport } from '../../types/visit.types';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { UploadVisitSamplesPhoto } from '../../services/VisitServices';
import { queryClient } from '../../app/_layout';

function UploadSamplesDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<IVisit>, BackendError, {
            id: string;
            body: FormData;
        }>
        (UploadVisitSamplesPhoto, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })

    function handleSubmit() {
        if (photo) {
            let formdata = new FormData()
            //@ts-ignore
            formdata.append('media', {
                uri: photo?.uri,
                name: 'photo' + new Date().toDateString() + ".jpg",
                type: 'image/jpeg'
            })
            mutate({ id: visit._id, body: formdata })
            setPhoto(undefined)
        }
    }
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: VisitChoiceActions.close_visit })
            }, 1000)
        }
    }, [isSuccess, setChoice])

    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.upload_sample ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                {<CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
            </Dialog>
        </>
    )
}

export default UploadSamplesDialog


