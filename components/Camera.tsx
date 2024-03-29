import { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { ActivityIndicator, IconButton, MD2Colors } from 'react-native-paper';

type Props = {
    isLoading: boolean,
    handlePress: () => void,
    photo: CameraCapturedPicture | undefined,
    setPhoto: React.Dispatch<React.SetStateAction<CameraCapturedPicture | undefined>>
}
function CameraComponent({ isLoading, handlePress, photo, setPhoto }: Props) {
    const [flashlight, setFlashLight] = useState(FlashMode.off)
    const [zoom, setZoom] = useState(0.10 * 0)
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
        if (!permission?.granted) {
            requestPermission()
        }
    }, [])
    return (
        <>

            {!permission?.granted && <Text style={{ color: 'red' }}>Please Allow camera Access</Text>}
            {isLoading ? <ActivityIndicator style={{ paddingTop: 40 }} size={'large'} animating={true} /> :
                <>
                    {photo ?
                        <>
                            <Image style={{ flex: 1 }} source={{ uri: photo.uri }} />
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: MD2Colors.white }}>
                                {isLoading && <ActivityIndicator size="large" />}
                                {!isLoading && <TouchableOpacity>
                                    <IconButton
                                        icon="content-save"
                                        disabled={isLoading}
                                        size={40}
                                        onPress={handlePress}
                                    />
                                </TouchableOpacity>}
                                {!isLoading && <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="lock-reset"
                                        iconColor={MD2Colors.red400}
                                        size={40}
                                        onPress={() => setPhoto(undefined)}
                                    />
                                </TouchableOpacity>}
                            </View>
                        </>
                        :

                        <>
                            <Camera style={{ flex: 1 }}
                                zoom={zoom}
                                ratio='16:9'
                                flashMode={flashlight}
                                type={type} ref={cameraRef}>
                            </Camera>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: MD2Colors.white }}>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="flip-horizontal"
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
                                        }}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon={flashlight === FlashMode.off ? "car-light-high" : "car-light-fog"}
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            if (flashlight === FlashMode.off) {
                                                setFlashLight(FlashMode.torch);
                                            } else {
                                                setFlashLight(FlashMode.off);
                                            }
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading || zoom === 1}
                                        icon={"plus-circle"}
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            if (zoom > 0.9)
                                                setZoom(1)
                                            else
                                                setZoom(zoom + 0.1 * 1)
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading || zoom === 0}
                                        icon="minus-circle-outline"
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            if (zoom < 0.1)
                                                setZoom(0)
                                            else
                                                setZoom(zoom - 0.1 * 1)
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="camera"
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={onClickPicure}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    }
                </>
            }

        </>
    )
}


export default CameraComponent
