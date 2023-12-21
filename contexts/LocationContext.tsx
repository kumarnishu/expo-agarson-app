import { LocationObject } from "expo-location";
import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location"

// locationcontext
type Context = {
    location: LocationObject | undefined;
    setLocation: React.Dispatch<React.SetStateAction<LocationObject | undefined>>;
};
export const LocationContext = createContext<Context>({
    location: undefined,
    setLocation: () => null,
});


// location provider
export function LocationProvider(props: { children: JSX.Element }) {
    const [location, setLocation] = useState<LocationObject>();

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

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {props.children}
        </LocationContext.Provider>
    );
}
