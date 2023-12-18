import { useEffect, useRef, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import useLocation from '../../components/hooks/useLocation';
import { LocationObject } from 'expo-location';
import { BackendError } from '../..';
import { StartMyDay } from '../../services/VisitServices';
import { GetProfile } from '../../services/UserServices';

function StartMydayForm() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { location } = useLocation()
  const [localLoc, setLocalLoc] = useState<LocationObject | undefined>(location)
  const cameraRef = useRef<Camera | any>()
  const [photo, setPhoto] = useState<CameraCapturedPicture>()

  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<any>, BackendError, FormData>
    (StartMyDay)

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
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
  console.log(error)
  return (
    <>
      {!localLoc && <Text style={{ color: 'red' }}>Please Allow Location Access</Text>}
      {!permission?.granted && <Text style={{ color: 'red' }}>Please Allow camera Access</Text>}
      <View style={styles.container}>
        {photo ?
          <>
            {isSuccess && alert("started day")}
            <Image style={{ height: 700, width: '100%' }} source={{ uri: photo.uri }} />
            <Pressable style={{ padding: 10 }}
              disabled={isLoading}
              onPress={() => {
                let formdata = new FormData()
                formdata.append("body", JSON.stringify({
                  start_day_credientials: {
                    latitude: localLoc?.coords.latitude,
                    longitude: localLoc?.coords.longitude,
                    timestamp: localLoc?.timestamp
                  }
                }))
                // @ts-ignore
                formdata.append('media', {
                  uri: photo.uri,
                  name: 'selfie.jpg',
                  type: 'image/jpg'
                })
                mutate(formdata)
              }}><Text>SUBMIT</Text></Pressable>
          </>
          : <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
                <Text></Text>
                <Text style={styles.text} onPress={clickPicure}>Take Picture</Text>

              </TouchableOpacity>
            </View>
          </Camera>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height: 600
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

export default StartMydayForm
