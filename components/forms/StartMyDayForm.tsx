import { useContext, useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import useLocation from '../../components/hooks/useLocation';
import { LocationObject } from 'expo-location';
import { BackendError } from '../..';
import { StartMyDay, getMyTodayVisit } from '../../services/VisitServices';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { IconButton, MD2Colors } from 'react-native-paper';

function StartMydayForm() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const { location } = useLocation()
    const [localLoc, setLocalLoc] = useState<LocationObject | undefined>(location)
    const cameraRef = useRef<Camera | any>()
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<BackendError>()
    const { setChoice } = useContext(ChoiceContext)


    async function clickPicure() {
        if (!cameraRef) return;
        const camera: Camera = cameraRef.current;
        let result = await camera.takePictureAsync()
        setPhoto(result)
    }

    useEffect(() => {
        requestPermission()
    }, [])

    useEffect(() => {
        if (location)
            setLocalLoc(location)
    }, [localLoc, location])
    return (
        <>
            {!localLoc && <Text style={{ color: 'red' }}>Please Allow Location Access</Text>}
            {!permission?.granted && <Text style={{ color: 'red' }}>Please Allow camera Access</Text>}
            {photo ?
                <>
                    <Image style={{ height: 730, width: '100%' }} source={{ uri: photo.uri }} />
                    <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-evenly', backgroundColor: MD2Colors.red500 }}>
                        <TouchableOpacity>
                            <IconButton
                                icon="content-save"
                                iconColor={MD2Colors.white}
                                disabled={loading}
                                size={40}
                                onPress={async () => {
                                    if (localLoc && photo) {
                                        let formdata = new FormData()
                                        formdata.append("body", JSON.stringify({
                                            start_day_credientials: {
                                                latitude: localLoc?.coords.latitude,
                                                longitude: localLoc?.coords.longitude,
                                                timestamp: new Date(localLoc?.timestamp)
                                            }
                                        }))
                                        //@ts-ignore
                                        formdata.append('media', {
                                            uri: photo.uri,
                                            name: 'photo.jpg',
                                            type: 'image/jpeg'
                                        })
                                        setLoading(true)
                                        await StartMyDay(formdata).then((data) => {
                                            setChoice({ type: VisitChoiceActions.close_visit })
                                            getMyTodayVisit()
                                            return console.log(data)
                                        }).catch((err: BackendError) => { console.log(err.response.data.message) })
                                        setLoading(false)
                                    }

                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <IconButton
                                disabled={loading}
                                icon="lock-reset"
                                iconColor={MD2Colors.white}
                                size={40}
                                onPress={() => setPhoto(undefined)}
                            />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <Camera style={{ minHeight: 730 }} type={type} ref={cameraRef}>
                    </Camera>
                    <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-evenly', backgroundColor: MD2Colors.red500 }}>
                        <TouchableOpacity>
                            <IconButton
                                icon="flip-horizontal"
                                iconColor={MD2Colors.white}
                                size={40}
                                onPress={() => {
                                    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <IconButton
                                icon="camera"
                                iconColor={MD2Colors.white}
                                size={40}
                                onPress={clickPicure}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            }
        </>
    )
}


export default StartMydayForm
