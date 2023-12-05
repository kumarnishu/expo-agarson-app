import { Text, View } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

export default function Index() {
    const { setUser } = useContext(UserContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                onPress={() => {

                    setUser(undefined)
                }}>
                Sign Out
            </Text>
        </View>
    );
}
