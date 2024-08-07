import React, { useContext, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../..';
import { queryClient } from '../../app/_layout';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import CameraComponent from '../Camera';
import { CameraCapturedPicture } from 'expo-camera';
import { IArticle, IDye, IMachine, IShoeWeight } from '../../types/production';
import { GetArticles,  GetDyes, GetMachines, UpdateShoeWeight3 } from '../../services/ProductionServices';
import { months } from '../../utils/months';
import { Picker } from '@react-native-picker/picker';

const Add3rdWeightForm = ({ shoeweight }: { shoeweight: IShoeWeight }) => {
    const [machine, setMachine] = useState<string>(shoeweight.machine._id)
    const [article, setArticle] = useState<string>(shoeweight.article._id)
    const [dye, setDye] = useState<string>(String(shoeweight.dye._id))
    const [st_weight, setStWeight] = useState(shoeweight.dye.stdshoe_weight)
    const [size, setSize] = useState(shoeweight.dye.size)
    const [upper_weight, setUpperWeight] = useState(shoeweight.upper_weight||0)
    const [weight, setWeight] = useState(0)
    const [month, setMonth] = useState(shoeweight.month)
    const [validated, setValidated] = useState(false)
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IShoeWeight>, BackendError, { id: string, body: FormData }>
        (UpdateShoeWeight3, {
            onSuccess: () => {
                queryClient.invalidateQueries("shoe_weights")
            }
        })
    const { data: dyesdata, isLoading: dyeLoading } = useQuery<AxiosResponse<IDye[]>, BackendError>("dyes", async () => GetDyes())
    const { data: machinesdata, isLoading: machineLoading } = useQuery<AxiosResponse<IMachine[]>, BackendError>("machines", async () => GetMachines())
    const { data: articlesdata, isLoading: articleLoading } = useQuery<AxiosResponse<IArticle[]>, BackendError>("articles", async () => GetArticles())

    {/* useEffect(() => {
        if (isSuccess) {
            setChoice({ type: ProductionChoiceActions.close_production })
        }
    }, [isSuccess]) */}

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
                    upper_weight:upper_weight

                }

                formdata.append("body", JSON.stringify(Data))
                //@ts-ignore
                formdata.append('media', {
                    uri: photo?.uri,
                    name: 'photo' + new Date().toDateString() + ".jpg",
                    type: 'image/jpeg'
                })
                mutate({
                    id: shoeweight._id,
                    body: formdata
                })
                setChoice({ type: ProductionChoiceActions.close_production })
                Alert.alert("Saved weight successfully", "Warning ! Do not close the app photo is saving in background.");
            }
        }
        submit()
    }


    function handleValidation() {
        if (article && dye && weight && machine && month != undefined && st_weight) {
            setValidated(true)
        }
    }


    return (
        <>
            {!validated ? <>
                <ScrollView contentContainerStyle={{ paddingTop: 20, justifyContent: 'center' }}>
                    <View style={{ flex: 1, gap: 15 }}>
                        <Text style={style.heding}>3RD SHOE WEIGHT</Text>
                        <Text style={style.label}>Machine</Text>

                        <View style={style.picker}>
                            <Picker
                                placeholder="Machine"
                                onValueChange={(v) => setMachine(v)}
                                selectedValue={String(machine)}
                                mode="dropdown" enabled={false}
                            >
                                <Picker.Item style={style.item} key={0} label="Select" value={undefined} />
                                {machinesdata && machinesdata.data.map((machine, index) => {
                                    return (
                                        <Picker.Item style={style.item} key={index + 1} label={machine.display_name} value={machine._id} />
                                    )
                                })}

                            </Picker>
                        </View>
                        <Text style={style.label}>Dye No.</Text>

                        <View style={style.picker}><Picker
                            placeholder="Dye" 
                            enabled={false}
                            onValueChange={(v) => { setDye(v) }}
                            selectedValue={String(dye)}
                            
                        >
                            <Picker.Item style={style.item} key={0} label="Select" value={undefined} />
                            {dyesdata && dyesdata.data.map((dye, index) => {
                                return (
                                    <Picker.Item style={style.item} key={index + 1} label={String(dye.dye_number)} value={dye._id} />
                                )
                            })}

                        </Picker></View>
                        <Text style={style.label}>Upper Weight</Text>
                        <TextInput
                            style={style.textinput}
                            readOnly
                            keyboardType='numeric'
                            placeholder="Upper Weight"
                            onChangeText={(value) => setUpperWeight(Number(value))}
                            value={String(upper_weight)}
                            autoCapitalize='none'
                        />
                        <Text style={style.label}>Weight</Text>
                        <TextInput
                            style={style.textinput}
                            keyboardType='numeric'
                            placeholder="Weight"
                            onChangeText={(value) => setWeight(Number(value))}
                            value={String(weight)}
                            autoCapitalize='none'
                        />
                        <Text style={style.label}>Article</Text>

                        <View style={style.picker}><Picker
                            placeholder="Article"
                            onValueChange={(v) => setArticle(v)}
                            selectedValue={String(article)}
                            enabled={false}
                        >
                            <Picker.Item style={style.item} key={0} label="Select" value={undefined} />
                            {articlesdata && articlesdata.data.map((article, index) => {
                                return (
                                    <Picker.Item style={style.item} key={index + 1} label={article.display_name} value={article._id} />
                                )
                            })}

                        </Picker>
                        </View>
                        <Text style={style.label}>Std. Weight</Text>
                        <TextInput
                            style={style.textinput}
                            readOnly={true}
                            keyboardType='numeric'
                            placeholder="Std. Weight"
                            onChangeText={(val) => setStWeight(Number(val))}
                            value={String(st_weight)}
                        />
                        <Text style={style.label}>Clock In</Text>

                        <View style={style.picker}><Picker
                            placeholder="Clock In"
                            onValueChange={(v) => setMonth(Number(v))}
                            selectedValue={Number(month)}
                            enabled={false}
                        >
                            <Picker.Item style={style.item} key={0} label="Select" value={undefined} />
                            {months && months.map((month, index) => {
                                return (
                                    <Picker.Item style={style.item} key={index + 1} label={month.label} value={month.month} />
                                )
                            })}

                        </Picker>
                        </View>


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
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 10,
    },
    item: { fontSize: 20, paddingLeft: 50, marginHorizontal: 5, },
    label: {
        marginHorizontal: 5,
        fontSize: 20,
        marginVertical: 2,
        textTransform: 'capitalize'
    },
    picker: {
        borderWidth: 1, borderRadius: 4, marginHorizontal: 5,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: 'red',
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

export default Add3rdWeightForm