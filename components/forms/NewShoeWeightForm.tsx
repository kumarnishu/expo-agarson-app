import React, { useContext, useEffect, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IArticle, IDye, IMachine, IShoeWeight } from '../../types/production';
import { CreateShoeWeight, GetArticles, GetDyeById, GetDyes, GetMachines } from '../../services/ProductionServices';
import { months } from '../../utils/months';
import RNPickerSelect from 'react-native-picker-select';
import * as Yup from "yup";

const Schema = Yup.object({
    machine: Yup.string().required("required"),
    article: Yup.string().required("required"),
    dye: Yup.boolean().required("required"),
    st_weight: Yup.number().required("required"),
    size: Yup.string().required("required"),
    weight: Yup.number().required("required"),
    month: Yup.number().required("required")
})

const NewShoeWeightForm = () => {
    const [machine, setMachine] = useState("")
    const [article, setArticle] = useState("")
    const [dye, setDye] = useState("")
    const [st_weight, setStWeight] = useState(0)
    const [size, setSize] = useState("")
    const [weight, setWeight] = useState(0)
    const [month, setMonth] = useState(0)
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
    const { data: remoteDye } = useQuery<AxiosResponse<IDye>, BackendError>(["dye", dyeid], async () => GetDyeById(dyeid))
    const { data: dyesdata, isLoading: dyeLoading } = useQuery<AxiosResponse<IDye[]>, BackendError>("dyes", async () => GetDyes())
    const { data: machinesdata, isLoading: machineLoading } = useQuery<AxiosResponse<IMachine[]>, BackendError>("machines", async () => GetMachines())
    const { data: articlesdata, isLoading: articleLoading } = useQuery<AxiosResponse<IArticle[]>, BackendError>("articles", async () => GetArticles())
    const formikRef = useRef();

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: ProductionChoiceActions.close_production })
        }
    }, [isSuccess])

    function handleSubmit() {
        async function submit() {
            if (photo) {
                let formdata = new FormData()
                let Data = {
                    machine: machine,
                    article: article,
                    dye: dye,
                    st_weight: st_weight,
                    size: size,
                    weight: weight,
                    month: month,

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
                    body: formdata
                })
            }
        }
        submit()
    }


    function handleValidation() {
        setValidated(true)
    }
    useEffect(() => {
        if (remoteDye && remoteDye.data) {
            if (remoteDye.data.article) {
                setArticle(remoteDye.data.article._id)
                setStWeight(remoteDye.data.stdshoe_weight)
            }
            else {
                setArticle("")
                setStWeight(0)
            }
        }

    }, [remoteDye])

    return (
        <>
            {!validated ? <>
                <ScrollView contentContainerStyle={{ paddingTop: 20, justifyContent: 'center' }}>
                    <View style={{ flex: 1, gap: 2 }}>
                        <Text style={style.heding}>New Shoe Weight</Text>
                        <Text style={style.label}>Select Machine</Text>
                        {machinesdata && <RNPickerSelect
                            useNativeAndroidPickerStyle={true}
                            placeholder="Machine"
                            onValueChange={(v) => setMachine(v)}
                            value={String(machine)}
                            items={machinesdata.data.map((machine) => {
                                return { label: machine.display_name, value: machine._id }
                            })}
                        />}
                        <Text style={style.label}>Select Dye No.</Text>
                        {dyesdata && <RNPickerSelect
                            useNativeAndroidPickerStyle={true}
                            placeholder="Dye No"
                            onValueChange={(value) => {
                                setDye(value)
                                setDyeid(value)
                            }}
                            value={String(dye)}
                            items={dyesdata.data.map((dye) => {
                                return { label: dye.dye_number.toString(), value: dye._id }
                            })}
                        />}
                        <Text style={style.label}>Article</Text>
                        {articlesdata && <RNPickerSelect
                            useNativeAndroidPickerStyle={true}
                            // style={}
                            placeholder="Article"
                            onValueChange={(v) => setArticle(v)}
                            value={String(article)}
                            items={articlesdata.data.map((article) => {
                                return { label: article.display_name, value: article._id }
                            })}
                        />}
                        <Text style={style.label}>Std. Weight</Text>
                        <TextInput
                            style={style.textinput}
                            keyboardType='numeric'
                            placeholder="Std. Weight"
                            onChangeText={(val) => setStWeight(Number(val))}
                            value={String(st_weight)}
                        />
                        <Text style={style.label}>Clock In</Text>
                        {months && <RNPickerSelect
                            placeholder="Clock In"
                            onValueChange={(val) => setMonth(val)}
                            value={String(month)}
                            items={months.map((month) => {
                                return { label: month.label, value: month.month }
                            })}
                        />}
                        <Text style={style.label}>Weight</Text>
                        <TextInput
                            style={style.textinput}
                            keyboardType='numeric'
                            placeholder="Weight"
                            onChangeText={(value) => setWeight(Number(value))}
                            value={String(weight)}
                            autoCapitalize='none'
                        />

                        < Pressable
                            style={style.button}
                            disabled={isLoading}
                            onPress={handleValidation}
                        >
                            <Text style={style.buttontext}>Submit</Text>
                        </Pressable>
                    </View>
                </ScrollView>


            </> : null}
            {validated && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}

const style = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        padding: 10,
        fontSize: 25,
    },
    label: {
        marginHorizontal: 15,
        fontSize: 20,
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
        padding: 10,
        paddingBottom: 20,
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