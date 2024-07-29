import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, Camera } from 'expo-camera';

type Props = {
    isLoading: boolean,
    handlePress: () => void,
    photo: CameraCapturedPicture | undefined,
    setPhoto: React.Dispatch<React.SetStateAction<CameraCapturedPicture | undefined>>
}
function CameraComponent({ isLoading, handlePress, photo, setPhoto }: Props) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [zoom, setZoom] = useState(0.10 * 0)
    const [enableTorch, setEnableTorch] = useState(false)
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);


    async function onClickPicure() {
        if (!cameraRef || !cameraRef.current) return;
        const result = await cameraRef.current.takePictureAsync();
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
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0 }}>
                                {isLoading && <ActivityIndicator size="large" />}
                                {!isLoading && <TouchableOpacity>
                                    <Button
                                        title="save"
                                        disabled={isLoading}
                                        onPress={handlePress}
                                    />
                                </TouchableOpacity>}
                                {!isLoading && <TouchableOpacity>
                                    <Button
                                        disabled={isLoading}
                                        title="reset"
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


                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0 }}>
                                <TouchableOpacity>
                                    <Button
                                        title="flip"
                                        disabled={isLoading}
                                        onPress={() => {
                                            setFacing(facing => (facing === 'back' ? 'front' : 'back'));
                                        }}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity>
                                    <Button
                                        disabled={isLoading}
                                        title={!enableTorch ? "On" : "Off"}
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
                                    <Button
                                        disabled={isLoading || zoom === 1}
                                        title="zoom"
                                        onPress={() => {
                                            if (zoom > 0.9)
                                                setZoom(1)
                                            else
                                                setZoom(zoom + 0.1 * 1)
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Button
                                        disabled={isLoading || zoom === 0}
                                        title="zoom"
                                        onPress={() => {
                                            if (zoom < 0.1)
                                                setZoom(0)
                                            else
                                                setZoom(zoom - 0.1 * 1)
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Button
                                        disabled={isLoading}
                                        title="click"
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
