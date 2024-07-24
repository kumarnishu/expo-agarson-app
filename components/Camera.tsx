import { useEffect, useRef, useState } from 'react';
import { Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, Camera } from 'expo-camera';
import { ActivityIndicator, IconButton, MD2Colors } from 'react-native-paper';

type Props = {
    isLoading: boolean,
    handlePress: () => void,
    photo: CameraCapturedPicture | undefined,
    setPhoto: React.Dispatch<React.SetStateAction<CameraCapturedPicture | undefined>>
}
function CameraComponent({ isLoading, handlePress, photo, setPhoto }: Props) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [zoom, setZoom] = useState(0.10 * 0)
    const [enableTorch, setEnableTorch]=useState(false)
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef <CameraView>(null);
    

    async function onClickPicure() {
        if (!cameraRef || !cameraRef.current) return;
        const result =await cameraRef.current.takePictureAsync();
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
                           
                            <CameraView 
                                ref={cameraRef}
                            style={styles.camera} facing={facing}
                                zoom={zoom}
                                enableTorch={enableTorch}
                            />
                               

                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: MD2Colors.white }}>
                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon="flip-horizontal"
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            setFacing(facing => (facing === 'back' ? 'front' : 'back'));
                                        }}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity>
                                    <IconButton
                                        disabled={isLoading}
                                        icon={!enableTorch ? "car-light-high" : "car-light-fog"}
                                        iconColor={MD2Colors.black}
                                        size={40}
                                        onPress={() => {
                                            if (!enableTorch) {
                                                setEnableTorch(true);
                                            } else {
                                                setEnableTorch(false);
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CameraComponent
