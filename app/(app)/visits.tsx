import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../../types/visit.types';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import StartMydayDialog from '../../components/dialogs/StartMyDayDialog';
import { BackendError } from '../..';
import { getMyTodayVisit } from '../../services/VisitServices';
import { Button, MD2Colors } from 'react-native-paper';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import MakeVisitInDialog from '../../components/dialogs/MakeVisitInDialog';
import MakeVisitOutDialog from '../../components/dialogs/MakeVisitOutDialog';
import AddSummaryDialog from '../../components/dialogs/AddSummaryDialog';
import UpdateSummaryDialog from '../../components/dialogs/UpdateSummaryDialog';
import EndMydayDialog from '../../components/dialogs/EndMydayDialog';
import UploadSamplesDialog from '../../components/dialogs/UploadSamplesDialog';


const Visits = () => {
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
        <>
            {!isLoading && <ScrollView contentContainerStyle={{ flexDirection: 'column', gap: 10, alignItems: 'flex-start', padding: 10 }}>

                {/* new visit */}
                {visit && visit.start_day_credientials &&
                    <>
                        {/* new visit */}

                        <Text style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', padding: 5, fontSize: 15, color: MD2Colors.red400 }} >STARTED DAY AT : <Text style={{ color: 'black' }}>{new Date(visit?.start_day_credientials.timestamp).toLocaleTimeString()}</Text></Text>

                        {!Boolean(visit.end_day_credentials) && <TouchableOpacity style={{ padding: 10, width: '100%' }}>
                            < Button
                                disabled={visit.visit_reports.filter((report) => {
                                    if (!Boolean(report.visit_out_credentials))
                                        return report
                                }).length > 0}
                                style={{ borderRadius: 10, width: '100%' }}
                                mode='outlined'
                                onPress={() => setChoice({ type: VisitChoiceActions.visit_in })}
                            ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>New Visit</Text>
                            </Button>
                        </TouchableOpacity>}
                    </>}

                {/* list visits */}
                {visits && visits.map((visit, index) => {
                    return (
                        <View key={index}
                            style={{
                                backgroundColor: 'white',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 2,
                                    height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 1,
                                padding: 10,
                                width: '100%'
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 5 }}>
                                Party : {visit.party_name}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 5 }}>
                                Station : {visit.city}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 5 }}>
                                Visit In : {new Date(visit.visit_in_credientials && visit.visit_in_credientials.timestamp).toLocaleTimeString()}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 5 }}>
                                Visit Out : {new Date(visit.visit_out_credentials && visit.visit_out_credentials.timestamp).toLocaleTimeString()}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5 }}>
                                {visit && !Boolean(visit.visit_out_credentials) && visit.visit_samples_photo && <Button onPress={() => {
                                    setVisitReport(visit)
                                    setChoice({ type: VisitChoiceActions.visit_out })
                                }}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Visit Out</Text></Button>}
                                {visit && !Boolean(visit.visit_out_credentials) && !visit.visit_samples_photo && <Button onPress={() => {
                                    setVisitReport(visit)
                                    setChoice({ type: VisitChoiceActions.upload_sample })
                                }}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Upload Samples</Text></Button>}
                                {!visit.summary ? <Button onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.add_summary }) }}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Add Summary</Text></Button> : <Button onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.edit_summary }) }}><Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 16 }}>Edit Summary</Text></Button>}
                            </View>

                        </View>
                    )
                })}



                {/* end my day */}
                {
                    visit && <View style={{ width: '100%', padding: 10 }}>
                        < Button
                            mode='outlined'
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
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}> {Boolean(visit.end_day_credentials) ? `Day ended at ${new Date(visit.end_day_credentials.timestamp).toLocaleTimeString()}` : "End My Day"}
                            </Text>
                        </Button>
                    </View>
                }

                {visitReport && <UploadSamplesDialog visit={visitReport} />}
            </ScrollView>}

            {/* start day button */}
            {
                !isLoading && !visit ? <View style={{ flex: 1, alignItems: 'center', marginTop: 50, padding: 10 }}>
                    < Button
                        mode='contained'
                        disabled={isLoading}
                        style={{ position: 'absolute', bottom: 0, width: '100%', paddingVertical: 10, marginBottom: 10 }}
                        onPress={
                            () => {
                                setChoice({ type: VisitChoiceActions.start_day })
                            }
                        }
                    ><Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }}>START MY DAY</Text>
                    </Button>
                </View > : null
            }
            {visitReport && !visitReport.summary && <AddSummaryDialog visit={visitReport} />}
            {visitReport && visitReport.summary && <UpdateSummaryDialog visit={visitReport} />}

            {/* visit out */}
            {visitReport && !Boolean(visitReport.visit_out_credentials) && <MakeVisitOutDialog visit={visitReport} />}
            {visit && <EndMydayDialog visit={visit} />}
            {!visit && <StartMydayDialog />}
            {visit && <MakeVisitInDialog visit={visit} />}
        </>
    )
}

export default Visits;


