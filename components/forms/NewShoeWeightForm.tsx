import React, { useContext, useEffect, useState } from 'react'
import { Button, ScrollView, SectionListComponent, StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, ProductionChoiceActions, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IArticle, IDye, IMachine, IShoeWeight } from '../../types/production';
import { CreateShoeWeight, GetArticles, GetDyeById, GetDyes, GetMachines } from '../../services/ProductionServices';
import { Picker } from '@react-native-picker/picker';

const NewShoeWeightForm = () => {
    const [machine, setMachine] = React.useState("");
    const [machines, setMachines] = React.useState<IMachine[]>([]);
    const [dye, setDye] = React.useState();
    const [article, setArticle] = React.useState("");
    const [articles, setArticles] = React.useState<IArticle[]>([]);
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
    const [dyeid, setDyeid] = useState<string>('');
    const { data: dyedata, refetch: refetchDye } = useQuery<AxiosResponse<IDye>, BackendError>(["dye", dyeid], async () => GetDyeById(dyeid), { enabled: false })
    const { data: dyes } = useQuery<AxiosResponse<IDye[]>, BackendError>("dyes", async () => GetDyes())
    const { data: machinesdata } = useQuery<AxiosResponse<IMachine[]>, BackendError>("machines", async () => GetMachines())
    const { data: articlesdata } = useQuery<AxiosResponse<IArticle[]>, BackendError>("articles", async () => GetArticles())

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: ProductionChoiceActions.close_production })
        }
    }, [isSuccess])

    useEffect(() => {
        if (machinesdata) {
            setMachines(machinesdata.data)
        }
    }, [machinesdata])

    useEffect(() => {
        if (articlesdata) {
            setArticles(articlesdata.data)
        }
    }, [machinesdata])



    function handleValidation() {
        if (machine && dye && article && size && month && weight && st_weight) {
            setValidated(true)
        }
    }

    function handleSubmit() {
        async function submit() {
            if (photo) {
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
                <View style={{ flex: 1, gap: 15 }}>
                    <Text style={style.heding}>New Shoe Weight</Text>
                    <Text style={style.label}>Select Machine</Text>
                    <Picker
                        mode='dropdown'
                        selectionColor={'blue'}
                        dropdownIconColor={'blue'}
                        style={{ borderColor: 'blue', borderWidth: 5 }}
                        selectedValue={dyeid}
                        onValueChange={(itemValue) =>
                            setDyeid(itemValue)
                        }>
                        {dyes && dyes.data.map((dye, index) => {
                            return (
                                <Picker.Item key={index} label={dye.dye_number.toString()} value={dye._id} />
                            )
                        })}
                    </Picker>

                    <Text style={style.label}>Select Dye</Text>
                    <Picker
                        mode='dropdown'
                        selectionColor={'blue'}
                        dropdownIconColor={'blue'}
                        style={{ borderColor: 'blue', borderWidth: 5 }}
                        selectedValue={dyeid}
                        onValueChange={(itemValue) =>
                            setDyeid(itemValue)
                        }>
                        {dyes && dyes.data.map((dye, index) => {
                            return (
                                <Picker.Item key={index} label={dye.dye_number.toString()} value={dye._id} />
                            )
                        })}
                    </Picker>
                    <Picker
                        mode='dropdown'
                        selectionColor={'blue'}
                        dropdownIconColor={'blue'}
                        style={{ borderColor: 'blue', borderWidth: 5 }}
                        selectedValue={dyeid}
                        onValueChange={(itemValue) =>
                            setArticle(itemValue)
                        }>
                        {dyes && dyes.data.map((dye, index) => {
                            return (
                                <Picker.Item key={index} label={dye.dye_number.toString()} value={dye._id} />
                            )
                        })}
                    </Picker>

                    <TextInput
                        style={style.textinput}
                        placeholder="Article"
                        value={article}
                        onChangeText={(value) => setArticle(value)}
                    />

                    <TextInput
                        style={style.textinput}
                        keyboardType='numeric'
                        placeholder="Std. Weight"
                        value={st_weight}
                        onChangeText={(value) => setStWeight(value)}

                    />
                    <TextInput
                        style={style.textinput}
                        keyboardType='numeric'
                        placeholder="Weight"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}

                    />

                    {!isLoading ? <Button
                        title="Next"
                        disabled={isLoading}
                        onPress={handleValidation} >
                    </Button> : null}
                </View>
            </ScrollView >
            {validated && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}

const style = StyleSheet.create({
    textinput: {
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10,
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
    switch: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default NewShoeWeightForm