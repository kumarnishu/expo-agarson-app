import React, { useContext, useState } from 'react'
import { Stack, router } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { BackendError } from '..';
import { Formik } from 'formik'
import * as yup from "yup";
import { Login } from '../services/UserServices';
import { Image, ScrollView, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const LoginFormSchema = yup.object({
  username: yup.string().required("required field"),
  password: yup.string().min(4, 'password should be minimum 8 characters').required('required field')
})

const login = () => {
  const { user, setUser } = useContext(UserContext)
  const { loading: remoteLoading } = useContext(LoadingContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<BackendError>()


  if (!remoteLoading && user)
    return <Stack />
  if (!remoteLoading && !user)
    return (
      <>
        {error && <Snackbar
          visible={Boolean(error)}
          onDismiss={() => setError(undefined)}
          action={{
            label: 'Undo',
            onPress: () => {
              setError(undefined)
            },
          }}>
          {error.response.data.message || ""}
        </Snackbar>}
        <Formik
          initialValues={{ username: 'nishu', password: 'nishu' }}
          validationSchema={LoginFormSchema}
          onSubmit={async (values) => {
            setLoading(true)
            await Login({
              ...values,
              multi_login_token: "hshdihi"
            }).then((data) => {
              setUser(data.data.user);
              router.replace("/")
            })
              .catch((err: BackendError) => setError(err))
            setLoading(false)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <ScrollView contentContainerStyle={{ flex: 1, marginTop: 60, justifyContent: 'center', padding: 10 }}>
                <View style={{ flex: 1, gap: 15 }}>
                  <View style={{ alignItems: 'center' }}>
                    <Image style={{ height: 200, width: 200 }} source={require("../assets/icon.png")} />
                  </View>

                  <TextInput
                    style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5 ,fontSize:20}}
                    label="Username,email or mobile"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCapitalize='none'
                    value={values.username}
                  />
                  <TextInput
                    style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5 ,fontSize:20}}
                    label='Password'
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <Button
                    mode="contained"
                    disabled={loading}
                    style={{ padding: 10 }}
                    onPress={() => handleSubmit()}>
                    {loading ?
                      <ActivityIndicator animating={true} color={MD2Colors.white} /> : <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>}
                  </Button>
                </View>
              </ScrollView>
            </>
          )}
        </Formik >
      </>
    )
}



export default login