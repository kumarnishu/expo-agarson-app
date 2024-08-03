import React, { useContext, useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, SectionListComponent, StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, ProductionChoiceActions, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IArticle, IDye, IMachine, IShoeWeight } from '../../types/production';
import { CreateShoeWeight, GetArticles, GetDyeById, GetDyes, GetMachines } from '../../services/ProductionServices';
import { months } from '../../utils/months';
import RNPickerSelect from 'react-native-picker-select';

const NewShoeWeightForm = () => {
    const [machineid, setMachineid] = React.useState("");
    const [dye, setDye] = React.useState();
    const [articleid, setArticleid] = React.useState("");
    const [size, setSize] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [st_weight, setStWeight] = React.useState<number>();

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
    const [dyeid, setDyeid] = useState<string>('');
    const { data: remoteDye, refetch: refetchDye } = useQuery<AxiosResponse<IDye>, BackendError>(["dye", dyeid], async () => GetDyeById(dyeid), { enabled: false })
    const { data: dyesdata } = useQuery<AxiosResponse<IDye[]>, BackendError>("dyes", async () => GetDyes())
    const { data: machinesdata } = useQuery<AxiosResponse<IMachine[]>, BackendError>("machines", async () => GetMachines())
    const { data: articlesdata } = useQuery<AxiosResponse<IArticle[]>, BackendError>("articles", async () => GetArticles())

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: ProductionChoiceActions.close_production })
        }
    }, [isSuccess])


    function handleValidation() {
        if (machineid && dye && articleid && size && month && weight && st_weight) {
            setValidated(true)
        }
    }

    useEffect(() => {
        if (remoteDye) {
            setArticleid(remoteDye.data.article._id)
            setStWeight(remoteDye.data.stdshoe_weight)
        }
    }, [remoteDye])
    function handleSubmit() {
        async function submit() {
            if (photo) {
                let formdata = new FormData()
                let Data = {
                    dye: dye,
                    machine: machineid,
                    size: size,
                    st_weight: st_weight,
                    weight: weight,
                    article: articleid,
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
                <View style={{ flex: 1, gap: 15 }}>
                    <Text style={style.heding}>New Shoe Weight</Text>
                    <Text style={style.label}>Select Machine</Text>
                    {machinesdata && <RNPickerSelect
                        style={style.textinput}

                        onValueChange={(itemValue) =>
                            setMachineid(itemValue)
                        }
                        items={machinesdata.data.map((machine) => {
                            return { label: machine.display_name, value: machine._id }
                        })}
                    />}
                    {dyesdata && <RNPickerSelect
                        style={style.textinput}

                        onValueChange={(itemValue) =>
                            setMachineid(itemValue)
                        }
                        items={dyesdata.data.map((dye) => {
                            return { label: dye.dye_number.toString(), value: dye._id }
                        })}
                    />}
                    {articlesdata && <RNPickerSelect
                        style={style.textinput}

                        onValueChange={(itemValue) =>
                            setArticleid(itemValue)
                        }
                        items={articlesdata.data.map((article) => {
                            return { label: article.display_name, value: article._id }
                        })}
                    />}
                    <TextInput
                        keyboardType='numeric'
                        placeholder="Std. Weight"
                        value={String(st_weight)}
                        onChangeText={(value) => setStWeight(Number(value))}

                    />

                    {months && <RNPickerSelect
                        style={style.textinput}

                        onValueChange={(itemValue) =>
                            setMonth(itemValue)
                        }
                        items={months.map((month) => {
                            return { label: month.label, value: month.month }
                        })}
                    />}

                    <TextInput

                        keyboardType='numeric'
                        placeholder="Weight"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}

                    />

                    < Pressable
                        style={style.button}
                        disabled={isLoading}
                        onPress={handleValidation}
                    >
                        <Text style={style.buttontext}>Submit</Text>
                    </Pressable>
                </View>
            </ScrollView >
            {validated && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}

const style = StyleSheet.create({
    textinput: {
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
    switch: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default NewShoeWeightForm