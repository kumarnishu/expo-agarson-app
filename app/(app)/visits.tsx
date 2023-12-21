import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../../types/visit.types';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { Text, View, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import StartMydayDialog from '../../components/dialogs/StartMyDayDialog';
import { BackendError } from '../..';
import { getMyTodayVisit } from '../../services/VisitServices';
import { Button, MD2Colors } from 'react-native-paper';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import MakeVisitInDialog from '../../components/dialogs/MakeVisitInDialog';


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
            {isLoading && <Text> Loading....</Text>}

            {visit && visit.start_day_credientials &&
                <>
                    {/* new visit */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', padding: 5, backgroundColor: MD2Colors.red400, color: 'white' }} >Started day at {new Date(visit?.start_day_credientials.timestamp).toLocaleTimeString()}</Text>

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 50 }}>
                            < Button
                                mode='contained'
                                disabled={visit.visit_reports.filter((report) => {
                                    if (!Boolean(report.visit_out_credentials))
                                        return report
                                }).length > 0}
                                onPress={() => {
                                    setChoice({ type: VisitChoiceActions.visit_in })
                                }}
                            ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>New Visit</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </>}

            {/* list visits */}
            <>
                {visits && visits.map((visit, index) => {
                    return (
                        <ScrollView >
                            <View key={index}
                            >
                                <Text >
                                    Party : <b>{visit.party_name}</b>
                                </Text>
                                <Text >
                                    Station : <b>{visit.city}</b>
                                </Text>
                                <Text>
                                    Visit In : {new Date(visit.visit_in_credientials && visit.visit_in_credientials.timestamp).toLocaleTimeString()}
                                </Text>
                                <Text>
                                    Visit Out : {new Date(visit.visit_out_credentials && visit.visit_out_credentials.timestamp).toLocaleTimeString()}
                                </Text>
                                <View >
                                    {visit && !Boolean(visit.visit_out_credentials) && <Pressable onPress={() => {
                                        setVisitReport(visit)
                                        setChoice({ type: VisitChoiceActions.visit_out })
                                    }}><Text>Visit Out</Text></Pressable>}

                                    {!visit.summary ? <Pressable onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.add_summary }) }}><Text>Add Summary</Text></Pressable> : <Pressable onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.edit_summary }) }}><Text>Edit Summary</Text></Pressable>}
                                </View>

                            </View>
                        </ScrollView>
                    )
                })}
            </>

            {/* {visitReport && !Boolean(visitReport.visit_out_credentials) && <MakeVisitOutDialog visit={visitReport} />}
            {visitReport && !visitReport.summary && <AddSummaryInDialog visit={visitReport} />}
            {visitReport && visitReport.summary && <EditSummaryInDialog visit={visitReport} />} */}
            {visit && <MakeVisitInDialog visit={visit} />}

            {/* start day button */}
            {
                !visit && <View style={{ flex: 1, alignItems: 'center', marginTop: 50, padding: 10 }}>
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
                </View >
            }
            {!visit && <StartMydayDialog />}

            {/* end my day */}
            {
                visit && <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 10 }}>
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
            {/* {visit && <EndMydayDialog visit={visit} />} */}
        </>
    )
}

export default Visits;


