import React, { useContext, useEffect, useState } from 'react'
import { Button, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { IVisit } from '../../types/visit';
import { MakeVisitIn } from '../../services/VisitServices';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { LocationObject } from 'expo-location';


const NewVisitForm = ({ visit, location }: { visit: IVisit, location: LocationObject }) => {
    const [isOld, setIsOld] = React.useState(false);
    const [party, setParty] = React.useState("");
    const [city, setCity] = React.useState("");
    const [mobile, setMobile] = React.useState("");

    const [display, setDisplay] = useState(true)
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
        if (party && city && mobile && String(mobile).length === 10) {
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
                    mobile: mobile,
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


                <View style={{ flex: 1, gap: 15 }}>
                    <Text>NEW VISIT DETAILS</Text>
                    <TextInput
                        placeholder="Party name"
                        value={party}
                        onChangeText={(value) => setParty(value)}
                    />
                    <TextInput

                        placeholder="City"
                        value={city}
                        onChangeText={(value) => setCity(value)}

                    />
                    <TextInput

                        keyboardType='numeric'
                        placeholder="Mobile"
                        value={mobile}
                        onChangeText={(value) => setMobile(value)}

                    />
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>IS OLD PARTY ?</Text>
                        <Switch
                            value={isOld} onValueChange={() => setIsOld(!isOld)}
                        />
                    </View>
                    {!isLoading ? <Button
                        title="Done"
                        disabled={isLoading}
                        onPress={handleValidation} >
                    </Button> : null}
                </View>
            </ScrollView > : null}
            {!display && location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}



export default NewVisitForm