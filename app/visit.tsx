import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../types/visit';
import { ChoiceContext, VisitChoiceActions } from '../contexts/ModalContext';
import { Text, View, ScrollView, Image, Button, StyleSheet, Pressable } from 'react-native';
import StartMydayDialog from '../components/dialogs/StartMyDayDialog';
import { BackendError } from '..';
import { getMyTodayVisit } from '../services/VisitServices';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import MakeVisitInDialog from '../components/dialogs/MakeVisitInDialog';
import MakeVisitOutDialog from '../components/dialogs/MakeVisitOutDialog';
import AddSummaryDialog from '../components/dialogs/AddSummaryDialog';
import UpdateSummaryDialog from '../components/dialogs/UpdateSummaryDialog';
import EndMydayDialog from '../components/dialogs/EndMydayDialog';
import UploadSamplesDialog from '../components/dialogs/UploadSamplesDialog';

const visit = () => {
    const [visits, setVisits] = useState<IVisitReport[]>([])
    const [visitReport, setVisitReport] = useState<IVisitReport>()
    const [visit, setVisit] = useState<IVisit>()
    const { setChoice } = useContext(ChoiceContext)
    const { data, isLoading, isSuccess } = useQuery<AxiosResponse<IVisit>, BackendError>("visit", getMyTodayVisit)

    useEffect(() => {
        if (data && data.data) {
            setVisit(data.data)
            setVisits(data.data.visit_reports)
        }
        else {
            setVisit(undefined)
            setVisits([])
        }

    }, [isSuccess, data])
    return (
        <View style={{ paddingTop: 50 }}>
            {/* start day Button */}
            {
                !isLoading && !visit ? <View>

                    <Image source={require("../assets/visit_back.jpg")} height={300} />
                    < Pressable
                        style={style.button}
                        disabled={isLoading}
                        onPress={
                            () => {
                                setChoice({ type: VisitChoiceActions.start_day })
                            }
                        }
                    >
                        <Text style={style.buttontext}>START MY DAY</Text>
                    </Pressable>
                </View > : null
            }
            {!isLoading && <ScrollView contentContainerStyle={{ flexDirection: 'column', gap: 15, alignItems: 'flex-start', padding: 10 }}>

                {visit && visit.start_day_credientials &&
                    <>
                        {/* new visit */}

                        <Text style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', padding: 5, fontSize: 25 }} >STARTED DAY AT : {new Date(visit?.start_day_credientials.timestamp).toLocaleTimeString()}</Text>

                        {!Boolean(visit.end_day_credentials) &&
                            < Pressable
                                style={style.newvisit}
                                disabled={visit.visit_reports.filter((report) => {
                                    if (!Boolean(report.visit_out_credentials))
                                        return report
                                }).length > 0}
                                onPress={() => setChoice({ type: VisitChoiceActions.visit_in })}
                            >
                                <Text style={style.buttontext}>NEW VISIT</Text>
                            </Pressable>}
                    </>
                }

                {/* list visits */}
                {visits && visits.map((visit, index) => {
                    return (
                        <View key={index}
                            style={style.box}
                        >
                            <Text style={style.label}>
                                Party   :   {visit.party_name}
                            </Text>
                            <Text style={style.label}>
                                Station   :   {visit.city}
                            </Text>
                            <Text style={style.label}>
                                Visit In   :   {new Date(visit.visit_in_credientials && visit.visit_in_credientials.timestamp).toLocaleTimeString()}
                            </Text>
                            <Text style={style.label}>
                                Visit Out   :   {new Date(visit.visit_out_credentials && visit.visit_out_credentials.timestamp).toLocaleTimeString()}
                            </Text>
                            <View style={{ flexDirection: 'row', gap:2, paddingTop: 5 }}>
                                {visit && !Boolean(visit.visit_out_credentials) && visit.visit_samples_photo &&
                                    < Pressable
                                        style={style.buttonsmall}

                                        onPress={() => {
                                            setVisitReport(visit)
                                            setChoice({ type: VisitChoiceActions.visit_out })
                                        }}
                                    >
                                        <Text style={style.label2}>Visit Out</Text>
                                    </Pressable>

                                }
                                {visit && !Boolean(visit.visit_out_credentials) && !visit.visit_samples_photo &&

                                    < Pressable
                                        style={style.buttonsmall}

                                        onPress={() => {
                                            setVisitReport(visit)
                                            setChoice({ type: VisitChoiceActions.upload_sample })
                                        }}
                                    >
                                        <Text style={style.label3}>Upload Sample</Text>
                                    </Pressable>
                                }
                                {!visit.summary ?

                                    < Pressable
                                        style={style.buttonsmall}

                                        onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.add_summary }) }}
                                    >
                                        <Text style={style.label2}>Add Summary</Text>
                                    </Pressable>

                                    :
                                    < Pressable
                                        style={style.buttonsmall}
                                        onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.edit_summary }) }}
                                    >
                                        <Text style={style.label2}>Edit Summary</Text>
                                    </Pressable>
                                }
                            </View>

                        </View>
                    )
                })}

                {/* end my day */}
                {
                    visit && <View style={{ width: '100%', padding: 10 }}>
                        < Pressable
                            style={style.endday}
                            disabled={isLoading || Boolean(visit.end_day_credentials) || visit.visit_reports.filter((report) => {
                                if (!Boolean(report.visit_out_credentials))
                                    return report
                            }).length > 0}
                            onPress={
                                () => {
                                    setChoice({ type: VisitChoiceActions.end_day })
                                }
                            }
                        >
                            <Text style={style.buttontext}>{Boolean(visit.end_day_credentials) ? `Day ended at ${new Date(visit.end_day_credentials.timestamp).toLocaleTimeString()}` : "End My Day"}</Text>
                        </Pressable>
                    </View>
                }

            </ScrollView>}

            {visitReport && <UploadSamplesDialog visit={visitReport} />}
            {visitReport && !visitReport.summary && <AddSummaryDialog visit={visitReport} />}
            {visitReport && visitReport.summary && <UpdateSummaryDialog visit={visitReport} />}

            {/* visit out */}
            {visitReport && !Boolean(visitReport.visit_out_credentials) && <MakeVisitOutDialog visit={visitReport} />}
            {visit && <EndMydayDialog visit={visit} />}
            {!visit && <StartMydayDialog />}
            {visit && <MakeVisitInDialog visit={visit} />}
        </View>
    )
}

const style = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        padding: 15,
        width: '100%'
    },
    textinput: {
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    label2: {
        padding: 2,
        marginHorizontal: 15,
        marginVertical: 5,
        color:'blue',
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        textTransform: 'capitalize'
    },
    label: {
        padding: 2,
        marginHorizontal: 15,
        marginVertical: 5,
        fontSize: 25,
        flex: 1,
        textTransform: 'capitalize'
    },
    label3: {
        padding: 2,
        marginHorizontal: 15,
        marginVertical: 5,
        color: 'black',
        fontWeight:'bold',
        fontSize: 18,
        flex: 1,
        textTransform: 'capitalize'
    },
    button: {
        padding: 10,
        borderRadius:10,
        backgroundColor: 'blue',
    },
    buttonsmall: {
        padding: 3,
        borderRadius:20
    },
    newvisit: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'blue',
        width: '100%'
    },
    
    endday: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'red',
        width: '100%'
    },
    buttontext: {
        padding: 6,
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    }
})


export default visit;

