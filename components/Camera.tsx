import { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { ActivityIndicator, IconButton, MD2Colors } from 'react-native-paper';

type Props = {
    isLoading: boolean,
    handlePress: () => void,
    photo: CameraCapturedPicture | undefined,
    setPhoto: React.Dispatch<React.SetStateAction<CameraCapturedPicture | undefined>>
}
function CameraComponent({ isLoading, handlePress, photo, setPhoto }: Props) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera | any>()

    async function onClickPicure() {
        if (!cameraRef) return;
        const camera: Camera = cameraRef.current;
        let result = await camera.takePictureAsync()
        setPhoto(result)
    }

    useEffect(() => {
        requestPermission()
    }, [])


    return (
        <>

            {!permission?.granted && <Text style={{ color: 'red' }}>Please Allow camera Access</Text>}
            {isLoading ? <ActivityIndicator style={{ paddingTop: 40 }} size={'large'} animating={true} /> :
                <>
                    {photo ?
                        <>
                            <Image style={{ height: 730, width: '100%' }} source={{ uri: photo.uri }} />
                            <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-evenly', backgroundColor: MD2Colors.red500 }}>
                                {isLoading && <ActivityIndicator size="large" />}
                                {!isLoading && <TouchableOpacity>
                                    <IconButton
                                        icon="content-save"
                                        iconColor={MD2Colors.blue600}
                                        disabled={isLoading}
                                        size={40}
                                        onPress={handlePress}
                                    />
                                </TouchableOpacity>}
                                {!isLoading && <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="lock-reset"
                                        iconColor={MD2Colors.yellow400}
                                        size={40}
                                        onPress={() => setPhoto(undefined)}
                                    />
                                </TouchableOpacity>}
                            </View>
                        </>
                        :
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Camera style={{ minHeight: 730 }} autoFocus type={type} ref={cameraRef}>
                            </Camera>
                            <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-evenly', backgroundColor: MD2Colors.red500 }}>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="flip-horizontal"
                                        iconColor={MD2Colors.yellow400}
                                        size={40}
                                        onPress={() => {
                                            setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="camera"
                                        iconColor={MD2Colors.blue400}
                                        size={40}
                                        onPress={onClickPicure}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </>
            }

        </>
    )
}


export default CameraComponent
