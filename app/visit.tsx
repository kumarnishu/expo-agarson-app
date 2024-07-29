import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../types/visit';
import { ChoiceContext, VisitChoiceActions } from '../contexts/ModalContext';
import { Text, View, ScrollView, Image, Button } from 'react-native';
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
        <View style={{paddingTop:50}}>
            {/* start day Button */}
            {
                !isLoading && !visit ? <View>

                    <Image source={require("../assets/visit_back.jpg")} />
                    < Button
                        title='START MY DAY'
                        disabled={isLoading}
                        onPress={
                            () => {
                                setChoice({ type: VisitChoiceActions.start_day })
                            }
                        }
                   />
                </View > : null
            }
            {!isLoading && <ScrollView contentContainerStyle={{ flexDirection: 'column', gap: 15, alignItems: 'flex-start', padding: 10 }}>

                {visit && visit.start_day_credientials &&
                    <>
                        {/* new visit */}

                        <Text style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', padding: 5, fontSize: 15 }} >STARTED DAY AT : {new Date(visit?.start_day_credientials.timestamp).toLocaleTimeString()}</Text>

                        {!Boolean(visit.end_day_credentials) &&
                            < Button
                                disabled={visit.visit_reports.filter((report) => {
                                    if (!Boolean(report.visit_out_credentials))
                                        return report
                                }).length > 0}
                                title='NEW VISIT'
                                onPress={() => setChoice({ type: VisitChoiceActions.visit_in })}
                            />}
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
                                borderRadius: 15,
                                shadowOpacity: 0.25,
                                shadowRadius: 6,
                                elevation: 4,
                                padding: 15,
                                width: '100%'
                            }}
                        >
                            <Text style={{ textTransform: 'capitalize', fontSize: 14, padding: 5 }}>
                                Party   :   {visit.party_name}
                            </Text>
                            <Text style={{ textTransform: 'capitalize', fontSize: 14, padding: 5 }}>
                                Station   :   {visit.city}
                            </Text>
                            <Text style={{ textTransform: 'capitalize', fontSize: 14, padding: 5 }}>
                                Visit In   :   {new Date(visit.visit_in_credientials && visit.visit_in_credientials.timestamp).toLocaleTimeString()}
                            </Text>
                            <Text style={{ textTransform: 'capitalize', fontSize: 14, padding: 5 }}>
                                Visit Out   :   {new Date(visit.visit_out_credentials && visit.visit_out_credentials.timestamp).toLocaleTimeString()}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5 }}>
                                {visit && !Boolean(visit.visit_out_credentials) && visit.visit_samples_photo && <Button title='visit out'  onPress={() => {
                                    setVisitReport(visit)
                                    setChoice({ type: VisitChoiceActions.visit_out })
                                }}/>}
                                {visit && !Boolean(visit.visit_out_credentials) && !visit.visit_samples_photo && <Button
                                    title='upload_sample'
                                    onPress={() => {
                                        setVisitReport(visit)
                                        setChoice({ type: VisitChoiceActions.upload_sample })
                                    }}></Button>}
                                {!visit.summary ? <Button title='add summary' onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.add_summary }) }} />
                                 :
                                    <Button title='Edit summary' onPress={() => { setVisitReport(visit); setChoice({ type: VisitChoiceActions.edit_summary }) }}/>}
                            </View>

                        </View>
                    )
                })}

                {/* end my day */}
                {
                    visit && <View style={{ width: '100%', padding: 10 }}>
                        < Button
                            title={Boolean(visit.end_day_credentials) ? `Day ended at ${new Date(visit.end_day_credentials.timestamp).toLocaleTimeString()}` : "End My Day"} 
                            disabled={isLoading || Boolean(visit.end_day_credentials) || visit.visit_reports.filter((report) => {
                                if (!Boolean(report.visit_out_credentials))
                                    return report
                            }).length > 0}
                            onPress={
                                () => {
                                    setChoice({ type: VisitChoiceActions.end_day })
                                }
                            }
                        />
                           
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

export default visit;

