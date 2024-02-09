import React from 'react'
import Visits from './visits'
import { RefreshControl, ScrollView } from 'react-native';
import { queryClient } from '../_layout';

const index = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            queryClient.invalidateQueries('profile')
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <Visits />
        </ScrollView>

    )
}

export default index