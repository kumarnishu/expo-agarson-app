import React, { useContext, useEffect, useState } from 'react'
import { Button, ScrollView, SectionListComponent, Text, TextInput, TextInputComponent, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IArticle, IDye, IMachine, IShoeWeight } from '../../types/production';
import { CreateShoeWeight, GetArticles, GetDyeById, GetDyes, GetMachines } from '../../services/ProductionServices';
import { Picker } from '@react-native-picker/picker';

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
    const [dyeid, setDyeid] = useState<string>('');
    const { data: dyedata, refetch: refetchDye } = useQuery<AxiosResponse<IDye>, BackendError>(["dye", dyeid], async () => GetDyeById(dyeid), { enabled: false })
    const { data: dyes } = useQuery<AxiosResponse<IDye[]>, BackendError>("dyes", async () => GetDyes())
    const { data: machines } = useQuery<AxiosResponse<IMachine[]>, BackendError>("machines", async () => GetMachines())
    const { data: articles } = useQuery<AxiosResponse<IArticle[]>, BackendError>("articles", async () => GetArticles())

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
    console.log(dyeid)
    return (
        <>
            <ScrollView contentContainerStyle={{ paddingTop: 60, justifyContent: 'center', padding: 10 }}>
                <View style={{ flex: 1, gap: 15 }}>
                    <Text>New Shoe Weight</Text>
                    <TextInput

                        placeholder="Machine"
                        value={machine}
                        onChangeText={(value) => setMachine(value)}
                    />
                    <TextInput

                        placeholder="Dye"
                        value={dye}
                        onChangeText={(value) => setDye(value)}

                    />

                    <TextInput

                        keyboardType='numeric'
                        placeholder="Std. Weight"
                        value={st_weight}
                        onChangeText={(value) => setStWeight(value)}

                    />
                    <TextInput

                        keyboardType='numeric'
                        placeholder="Weight"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}

                    />
                    <TextInput

                        keyboardType='numeric'
                        placeholder="Weight"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}

                    />
                    <Text style={{ paddingLeft: 5 }}>Select Dye</Text>
                    <Picker
                        mode='dropdown'
                        selectionColor={'blue'}
                        dropdownIconColor={'blue'}
                        style={{ borderColor: 'blue' }}
                        selectedValue={dyeid}
                        onValueChange={(itemValue) =>
                            setDyeid(itemValue)
                        }>
                        {dyes && dyes.data.map((dye, index) => {
                            return (
                                <Picker.Item key={index} label={dye.dye_number.toString()} value={dye.dye_number} />
                            )
                        })}
                    </Picker>

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



export default NewShoeWeightForm