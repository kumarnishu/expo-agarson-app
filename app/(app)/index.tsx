import { useContext, useEffect, useState } from 'react';
import { IVisit, IVisitReport } from '../../types/visit.types';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { getMyTodayVisit } from '../../services/VisitServices';
import { BackendError } from '../..';
import { Text, View, Pressable } from 'react-native';
import StartMydayDialog from '../../components/dialogs/visit/StartMyDayDialog';

const MyComponent = () => {
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
                  Party : {visit.party_name}
                </Text>
                <Text >
                  Station : {visit.city}
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


      {
        !visit && <View>
          < Pressable
            disabled={isLoading}
            onPress={
              () => {
                setChoice({ type: VisitChoiceActions.start_day })
              }
            }><Text>Start My Day</Text></Pressable >
        </View>
      }
      {!visit && <StartMydayDialog />}

      {
        visit && <View>
          < Pressable
            disabled={isLoading || Boolean(visit.end_day_credentials) || visit.visit_reports.filter((report) => {
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



