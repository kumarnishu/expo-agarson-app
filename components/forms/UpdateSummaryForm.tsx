import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisitReport } from '../../types/visit';
import { queryClient } from '../../app/_layout';
import { BackendError } from '../..';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { EditVisitSummary } from '../../services/VisitServices';


const Schema = Yup.object({
    mobile: Yup.string().required("required"),
    summary: Yup.string().required("required"),
    is_old_party: Yup.boolean().required("required"),
    dealer_of: Yup.string().required("required"),
    refs_given: Yup.string().required("required"),
    reviews_taken: Yup.number().required("required"),
    turnover: Yup.string().required("required")
})

const UpdateSummaryForm = ({ visit }: { visit: IVisitReport }) => {
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
        (EditVisitSummary, {
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
                    summary: visit.summary || "NA",
                    is_old_party: visit.is_old_party || isOld,
                    dealer_of: visit.dealer_of || "NA",
                    refs_given: visit.refs_given || "NA",
                    turnover: visit.turnover || "NA",
                    reviews_taken: visit.reviews_taken || 0
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
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 10 }}>


                            <View style={{ flex: 1, gap: 5 }}>
                                <Text style={style.label}>Party Mobile</Text>

                                <TextInput
                                    style={style.textinput}
                                    placeholder="Party Mobile"
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    autoCapitalize='none'
                                    value={values.mobile}
                                />
                                <Text style={style.errorlabel}>{errors.mobile}</Text>

                                <Text style={style.label}>Dealer of</Text>
                                <TextInput
                                    style={style.textinput}
                                    placeholder="Dealer Of"
                                    onChangeText={handleChange('dealer_of')}
                                    onBlur={handleBlur('dealer_of')}
                                    autoCapitalize='none'
                                    value={values.dealer_of}
                                />
                                <Text style={style.label}>Turn Over</Text>
                                <TextInput
                                    style={style.textinput}
                                    placeholder="Turn Over"
                                    onChangeText={handleChange('turnover')}
                                    onBlur={handleBlur('turnover')}
                                    autoCapitalize='none'
                                    value={values.turnover}
                                />
                                <Text style={style.label}>Refs Given</Text>
                                <TextInput
                                    style={style.textinput}
                                    placeholder="Refs Given"
                                    onChangeText={handleChange('refs_given')}
                                    onBlur={handleBlur('refs_given')}
                                    autoCapitalize='none'
                                    value={values.refs_given}
                                />
                                <Text style={style.label}>Google Review Taken</Text>
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
                                {isLoading && <ActivityIndicator size={'large'} animating={true} />}
                                < Pressable
                                    style={style.button}
                                    disabled={isLoading}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={style.buttontext}>Update</Text>
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
        fontFamily: 'Roboto',
        marginHorizontal: 5,
        padding: 15,
        paddingLeft: 10,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 10,
    },
    errorlabel: {
        fontFamily: 'Roboto',
        marginHorizontal: 5,
        fontSize: 15,
        textTransform: 'capitalize',
        color: 'red'
    },
    label: {
        fontFamily: 'Roboto',
        marginHorizontal: 5,
        fontSize: 15,
        textTransform: 'capitalize'
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
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
        fontWeight: '300'
    },
    switch: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})
export default UpdateSummaryForm