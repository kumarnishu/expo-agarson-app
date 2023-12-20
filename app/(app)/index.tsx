import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../../types/visit.types';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { Text, View, Pressable } from 'react-native';
import StartMydayDialog from '../../components/dialogs/navbar/StartMyDayDialog';
import { BackendError } from '../..';
import { getMyTodayVisit } from '../../services/VisitServices';
import { Button } from 'react-native-paper';

const MyComponent = () => {
    const [visits, setVisits] = useState<IVisitReport[]>([])
    const [visitReport, setVisitReport] = useState<IVisitReport>()
    const [visit, setVisit] = useState<IVisit>()
    const { setChoice } = useContext(ChoiceContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<BackendError>()

    useEffect(() => {
        async function myVisits() {
            await getMyTodayVisit().then((data) => {
                setVisit(data.data)
            }).catch((err: BackendError) => {
                setError(err)
            })
            setLoading(false)
        }
        myVisits()
    }, [])

    return (
        <>
            {loading && <Text> Loading....</Text>}

            {visit && visit.start_day_credientials &&
                <>
                    <Text >Started day at {new Date(visit?.start_day_credientials.timestamp).toLocaleTimeString()}</Text>
                    <View >
                        {!Boolean(visit.end_day_credentials) && < Pressable
                            disabled={visit.visit_reports.filter((report) => {
                                if (!Boolean(report.visit_out_credentials))
                                    return report
                            }).length > 0}
                            onPress={() => {
                                setChoice({ type: VisitChoiceActions.visit_in })
                            }}><Text>New Visit</Text></Pressable>}
                    </View >
                </>}

            <>
                {visits && visits.map((visit, index) => {
                    return (
                        <View >
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
                        </View>

                    )
                })}
            </>

            {/* {visitReport && !Boolean(visitReport.visit_out_credentials) && <MakeVisitOutDialog visit={visitReport} />}
            {visitReport && !visitReport.summary && <AddSummaryInDialog visit={visitReport} />}
            {visitReport && visitReport.summary && <EditSummaryInDialog visit={visitReport} />}
            {visit && <MakeVisitInDialog visit={visit} />} */}

            {/* strat day button */}
            {
                !visit && <View style={{ flex: 1, alignItems: 'center', marginTop: 50, padding: 10 }}>
                    < Button
                        mode='contained'
                        disabled={loading}
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

            {
                visit && <View>
                    < Pressable
                        disabled={loading || Boolean(visit.end_day_credentials) || visit.visit_reports.filter((report) => {
                            if (!Boolean(report.visit_out_credentials))
                                return report
                        }).length > 0}
                        onPress={
                            () => {
                                setChoice({ type: VisitChoiceActions.end_day })
                            }
                        }>{Boolean(visit.end_day_credentials) ? <Text>`Day ended at ${new Date(visit.end_day_credentials.timestamp).toLocaleTimeString()}`</Text> : <Text>"End My Day"</Text>}</Pressable >
                </View>
            }
            {/* {visit && <EndMydayDialog visit={visit} />} */}
        </>
    )
}

export default MyComponent;


