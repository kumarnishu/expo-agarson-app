import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, SectionListComponent, TextInputComponent, View } from 'react-native';
import { Button, Snackbar, Switch, Text, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IShoeWeight } from '../../types/production';
import { CreateShoeWeight } from '../../services/ProductionServices';


const NewShoeWeightForm = () => {
    const [machine, setMachine] = React.useState("");
    const [dye, setDye] = React.useState("");
    const [article, setArticle] = React.useState("");
    const [size, setSize] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [st_weight, setStWeight] = React.useState("");

    const [validated, setValidated] = useState(false)
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IShoeWeight>, BackendError, { body: FormData }>
        (CreateShoeWeight, {
            onSuccess: () => {
                queryClient.invalidateQueries('shoe_weights')
            }
        })

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])

    function handleValidation() {
        if (machine && dye && article && size && month && weight && st_weight) {
            setValidated(true)
        }
    }

    function handleSubmit() {
        async function submit() {
            if (location && photo) {
                let formdata = new FormData()
                let Data = {
                    dye: dye,
                    machine: machine,
                    size: size,
                    st_weight: st_weight,
                    weight: weight,
                    article: article,
                    month: month,

                }

                formdata.append("body", JSON.stringify(Data))
                //@ts-ignore
                formdata.append('media', {
                    uri: photo?.uri,
                    name: 'photo' + new Date().toDateString() + ".jpg",
                    type: 'image/jpeg'
                })
                mutate({
                    body: formdata
                })
            }
        }
        submit()
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ paddingTop: 60, justifyContent: 'center', padding: 10 }}>
                <Snackbar
                    visible={Boolean(error)}
                    onDismiss={() => null}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            null
                        },
                    }}>
                    {error && error.response.data.message || ""}
                </Snackbar>

                <View style={{ flex: 1, gap: 15 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>New Shoe Weight</Text>
                    <TextInput
                        mode="outlined"
                        label="Machine"
                        value={machine}
                        onChangeText={(value) => setMachine(value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Dye"
                        value={dye}
                        onChangeText={(value) => setDye(value)}

                    />
                  
                    <TextInput
                        mode="outlined"
                        keyboardType='numeric'
                        label="Std. Weight"
                        value={st_weight}
                        onChangeText={(value) => setStWeight(value)}

                    />
                    <TextInput
                        mode="outlined"
                        keyboardType='numeric'
                        label="Weight"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}

                    />

                    {!isLoading ? <Button
                        mode="contained"
                        disabled={isLoading}
                        style={{ padding: 10, borderRadius: 10 }}
                        onPress={handleValidation} >
                        <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                    </Button> : null}
                </View>
            </ScrollView > 
            {validated && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}



export default NewShoeWeightForm