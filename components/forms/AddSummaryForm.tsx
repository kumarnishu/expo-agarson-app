import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { Alert, Button, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisitReport } from '../../types/visit';
import { queryClient } from '../../app/_layout';
import { AddVisitSummary } from '../../services/VisitServices';
import { BackendError } from '../..';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';


const Schema = Yup.object({
    mobile: Yup.string().required("required"),
    summary: Yup.string().required("required"),
    is_old_party: Yup.boolean().required("required"),
    dealer_of: Yup.string().required("required"),
    refs_given: Yup.string().required("required"),
    reviews_taken: Yup.number().required("required"),
    turnover: Yup.string().required("required")
})

const AddSummaryForm = ({ visit }: { visit: IVisitReport }) => {
    const [isOld, setIsOld] = React.useState(false);
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<any>, BackendError, {
            id: string;
            body: {
                mobile: string;
                summary: string;
                is_old_party: boolean;
                dealer_of: string;
                refs_given: string;
                reviews_taken: number;
                turnover: string
            }
        }>
        (AddVisitSummary, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])


    return (
        <>
            <Formik
                initialValues={{
                    mobile: visit.mobile || "",
                    summary: "",
                    is_old_party: isOld,
                    dealer_of: "",
                    refs_given: "",
                    turnover: "",
                    reviews_taken: 0
                }}
                validationSchema={Schema}
                onSubmit={async (values) => {
                    let Data = {
                        mobile: values.mobile,
                        summary: values.summary,
                        is_old_party: isOld,
                        dealer_of: values.dealer_of,
                        refs_given: values.refs_given,
                        reviews_taken: values.reviews_taken,
                        turnover: values.turnover,
                    }

                    mutate({ id: visit._id, body: Data })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 10 }}>


                            <View style={{ flex: 1, gap: 15 }}>
                                <TextInput
                                    style={style.textinput}
                                    placeholder="Party Mobile"
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    autoCapitalize='none'
                                    value={values.mobile}
                                />

                                <TextInput
                                    style={style.textinput}
                                    placeholder="Dealer Of"
                                    onChangeText={handleChange('dealer_of')}
                                    onBlur={handleBlur('dealer_of')}
                                    autoCapitalize='none'
                                    value={values.dealer_of}
                                />

                                <TextInput
                                    style={style.textinput}
                                    placeholder="Turn Over"
                                    onChangeText={handleChange('turnover')}
                                    onBlur={handleBlur('turnover')}
                                    autoCapitalize='none'
                                    value={values.turnover}
                                />
                                <TextInput
                                    style={style.textinput}
                                    placeholder="Refs Given"
                                    onChangeText={handleChange('refs_given')}
                                    onBlur={handleBlur('refs_given')}
                                    autoCapitalize='none'
                                    value={values.refs_given}
                                />
                                <TextInput
                                    style={style.textinput}
                                    keyboardType='numeric'
                                    placeholder="Google Review Taken"
                                    onChangeText={handleChange('reviews_taken')}
                                    onBlur={handleBlur('reviews_taken')}
                                    autoCapitalize='none'
                                    maxLength={10}
                                    value={String(values.reviews_taken)}
                                />
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Text style={style.label}>IS OLD PARTY ?</Text>
                                    <Switch
                                        value={isOld} onValueChange={() => setIsOld(!isOld)}
                                    />
                                </View>

                                <TextInput
                                    style={style.textinput}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Summary"
                                    onChangeText={handleChange('summary')}
                                    onBlur={handleBlur('summary')}
                                    autoCapitalize='none'
                                    value={values.summary}
                                />
                                < Pressable
                                    style={style.button}
                                    disabled={isLoading}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={style.buttontext}>Submit</Text>
                                </Pressable>
                             
                            </View>
                        </ScrollView>
                    </>
                )}
            </Formik >
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



export default AddSummaryForm