import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/stacks/" style={{ fontSize: 30, padding: 10 }}>View Cart</Link>
        </View>
    );
}
