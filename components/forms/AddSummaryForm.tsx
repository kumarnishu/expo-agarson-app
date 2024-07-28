import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { ScrollView, View } from 'react-native';
import { Button, Snackbar, Switch, Text, TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
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
                                <TextInput
                                    mode="outlined"
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Party Mobile"
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    autoCapitalize='none'
                                    value={values.mobile}
                                />

                                <TextInput
                                    mode="outlined"
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Dealer Of"
                                    onChangeText={handleChange('dealer_of')}
                                    onBlur={handleBlur('dealer_of')}
                                    autoCapitalize='none'
                                    value={values.dealer_of}
                                />

                                <TextInput
                                    mode="outlined"
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Turn Over"
                                    onChangeText={handleChange('turnover')}
                                    onBlur={handleBlur('turnover')}
                                    autoCapitalize='none'
                                    value={values.turnover}
                                />
                                <TextInput
                                    mode="outlined"
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Refs Given"
                                    onChangeText={handleChange('refs_given')}
                                    onBlur={handleBlur('refs_given')}
                                    autoCapitalize='none'
                                    value={values.refs_given}
                                />
                                <TextInput
                                    mode="outlined"
                                    keyboardType='numeric'
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Google Review Taken"
                                    onChangeText={handleChange('reviews_taken')}
                                    onBlur={handleBlur('reviews_taken')}
                                    autoCapitalize='none'
                                    maxLength={10}
                                    value={String(values.reviews_taken)}
                                />
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>IS OLD PARTY ?</Text>
                                    <Switch
                                        value={isOld} onValueChange={() => setIsOld(!isOld)}
                                    />
                                </View>

                                <TextInput
                                    mode="outlined"
                                    multiline
                                    style={{ borderRadius: 15,borderColor:MD2Colors.blue400, borderWidth: 1, paddingTop: 10 }}
                                    outlineStyle={{ display: 'none' }}
                                    label="Summary"
                                    onChangeText={handleChange('summary')}
                                    onBlur={handleBlur('summary')}
                                    autoCapitalize='none'
                                    value={values.summary}
                                />
                                {isLoading && <ActivityIndicator size={'large'} animating={true} />}
                                {<Button
                                    mode="contained"
                                    disabled={isLoading}
                                    style={{ padding: 10, borderRadius: 10 }}
                                    onPress={() => handleSubmit()}>
                                    <Text style={{ color: 'white', }}>Submit</Text>
                                </Button>}
                            </View>
                        </ScrollView>
                    </>
                )}
            </Formik >
        </>
    )
}



export default AddSummaryForm