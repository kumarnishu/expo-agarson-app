import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

const MyComponent = () => {
    return (
        <View>
            <Link href="/(app)/catalouge">Catalouge</Link>
        </View>
    )

}
export default MyComponent;