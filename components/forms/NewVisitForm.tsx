import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native';
import { Button, Snackbar, Switch, Text, TextInput } from 'react-native-paper';
import { MD2Colors } from 'react-native-paper';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { IVisit } from '../../types/visit.types';
import { MakeVisitIn } from '../../services/VisitServices';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { LocationContext } from '../../contexts/LocationContext';
import { CameraCapturedPicture } from 'expo-camera';


const NewVisitForm = ({ visit }: { visit: IVisit }) => {
    const [isOld, setIsOld] = React.useState(false);
    const [party, setParty] = React.useState("");
    const [city, setCity] = React.useState("");

    const [display, setDisplay] = useState(true)
    const { location } = useContext(LocationContext)
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IVisit>, BackendError, { id: string, body: FormData }>
        (MakeVisitIn, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])

    function handleValidation() {
        if (party && city) {
            setDisplay(false)
        }
    }

    function handleSubmit() {
        async function submit() {
            if (location && photo) {
                let formdata = new FormData()
                let Data = {
                    visit_in_credientials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    },
                    party_name: party,
                    city: city,
                    is_old_party: isOld
                }

                formdata.append("body", JSON.stringify(Data))
                //@ts-ignore
                formdata.append('media', {
                    uri: photo?.uri,
                    name: 'photo' + new Date().toDateString() + ".jpg",
                    type: 'image/jpeg'
                })
                console.log(formdata)
                mutate({
                    id: visit._id,
                    body: formdata
                })
            }
        }
        submit()
    }

    return (
        <>
            {display ? <ScrollView contentContainerStyle={{ paddingTop: 60, justifyContent: 'center', padding: 10 }}>
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
                    <Text style={{ textAlign: 'center',fontWeight:'bold', fontSize: 20}}>NEW VISIT FORM</Text>
                    <TextInput
                        mode="outlined"
                        style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5, fontSize: 20 }}
                        contentStyle={{ fontSize: 20 }}
                        outlineStyle={{ display: 'none' }}
                        label="Party name"
                        value={party}
                        onChangeText={(value) => setParty(value)}
                    />
                    <TextInput
                        mode="outlined"
                        style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5, fontSize: 20 }}
                        contentStyle={{ fontSize: 20 }}
                        outlineStyle={{ display: 'none' }}
                        label="City"
                        value={city}
                        onChangeText={(value) => setCity(value)}

                    />
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>IS OLD PARTY ?</Text>
                        <Switch
                            value={isOld} onValueChange={() => setIsOld(!isOld)}
                        />
                    </View>
                    {!isLoading ? <Button
                        mode="contained"
                        disabled={isLoading}
                        style={{ padding: 10, borderRadius: 10 }}
                        onPress={handleValidation} >
                        <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
                    </Button> : null}
                </View>
            </ScrollView > : null}
            {!display && location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}



export default NewVisitForm