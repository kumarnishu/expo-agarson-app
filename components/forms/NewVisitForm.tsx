import React, { useContext, useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
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
                    <Text style={style.heding}>NEW VISIT</Text>
                    <TextInput
                        style={style.textinput}
                        placeholder="Party name"
                        value={party}
                        onChangeText={(value) => setParty(value)}
                    />
                    <TextInput
                        style={style.textinput}
                        placeholder="City"
                        value={city}
                        onChangeText={(value) => setCity(value)}

                    />
                    <TextInput
                        style={style.textinput}
                        keyboardType='numeric'
                        placeholder="Mobile"
                        value={mobile}
                        onChangeText={(value) => setMobile(value)}

                    />
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center',margin:5 }}>
                        <Text style={style.label}>IS OLD PARTY ?</Text>
                        <Switch style={{height:50}}
                            value={isOld} onValueChange={() => setIsOld(!isOld)}
                        />
                    </View>
                   

                    {!isLoading ? < Pressable
                        style={style.button}
                        disabled={isLoading || Boolean(visit.end_day_credentials) || visit.visit_reports.filter((report) => {
                            if (!Boolean(report.visit_out_credentials))
                                return report
                        }).length > 0}
                        onPress={
                            handleValidation
                        }
                    >
                        <Text style={style.buttontext}>Add Party Photo</Text>
                    </Pressable> : null}
                </View>
            </ScrollView > : null}
            { location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}

const style = StyleSheet.create({
    textinput: {
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 5,
        paddingVertical:10,
        fontSize: 30,
        borderWidth: 1,
        borderRadius: 10,
    },
    label: {
        marginHorizontal: 5,
        fontSize: 25,
        marginVertical: 2,
        textTransform: 'capitalize'
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: 'blue',
        borderRadius: 5
    },
    buttontext: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    heding: {
        padding: 5,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    switch:{
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default NewVisitForm