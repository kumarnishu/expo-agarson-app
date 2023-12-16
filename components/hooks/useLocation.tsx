import { useEffect, useState } from 'react'
import * as Location from 'expo-location';

function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        (async () => {
            let result = await Location.requestForegroundPermissionsAsync();
            if (!result.granted) {
                return
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return ({ location })
}

export default useLocation