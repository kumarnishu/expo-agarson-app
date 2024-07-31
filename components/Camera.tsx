import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

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

            {!permission?.granted && <Text style={style.errorText}>Please Allow camera Access</Text>}
            {isLoading ? <ActivityIndicator style={{ paddingTop: 40 }} size={'large'} animating={true} /> :
                <>
                    {photo ?
                        <>
                            <Image style={{ flex: 1 }} source={{ uri: photo.uri }} />
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0 }}>
                                {isLoading && <ActivityIndicator size="large" />}
                                {!isLoading && <TouchableOpacity>
                                    <Pressable
                                        style={style.iconbutton}
                                        disabled={isLoading}
                                        onPress={handlePress}
                                    >
                                        <MaterialIcons color={'white'} name="save" size={40} />
                                    </Pressable>
                                </TouchableOpacity>}
                                {!isLoading && <TouchableOpacity>
                                    <Pressable
                                        style={style.iconbutton}
                                        disabled={isLoading}
                                        onPress={() => setPhoto(undefined)}
                                    >
                                        <MaterialIcons color={'white'} name="clear" size={40} />
                                    </Pressable>
                                </TouchableOpacity>}
                            </View>
                        </>
                        :

                        <>

                            <CameraView
                                ref={cameraRef}
                                style={style.camera} facing={facing}
                                zoom={zoom}
                                enableTorch={enableTorch}
                            />


                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', position: 'absolute', bottom: 0 }}>
                                <TouchableOpacity>
                                    <Pressable
                                        style={style.iconbutton}
                                        disabled={isLoading}
                                        onPress={() => {
                                            setFacing(facing => (facing === 'back' ? 'front' : 'back'));
                                        }}
                                    >
                                        <MaterialIcons color={'white'} name="sync" size={40} />
                                    </Pressable>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Pressable
                                        style={style.iconbutton}
                                        disabled={isLoading}
                                        onPress={() => {
                                            if (!enableTorch) {
                                                setEnableTorch(true);
                                            } else {
                                                setEnableTorch(false);
                                            }
                                        }}
                                    >
                                        <MaterialIcons color={'white'} name={enableTorch ? "flashlight-off" :"flashlight-on"} size={40} />
                                    </Pressable>
                                </TouchableOpacity>
                       
                                <TouchableOpacity>
                                    <Pressable
                                        style={style.iconbutton}
                                        disabled={isLoading}
                                        onPress={onClickPicure}
                                    >
                                        <MaterialIcons color={'white'} name="camera" size={40} />
                                    </Pressable>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </>
            }

        </>
    )
}
const style = StyleSheet.create({
    camera: { flex: 1 },
    textinput: {
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    label: {
        padding: 2,
        marginHorizontal: 15,
        marginVertical: 5,
        flex: 1,
        textTransform: 'capitalize'
    },
    iconbutton: {
        padding: 10,
        margin:10,
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white'
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
    },
    buttontext: {
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    },
    errorText: {
        padding: 10,
        color: 'red',
        textAlign: 'center',
        fontSize: 25
    }
})


export default CameraComponent
