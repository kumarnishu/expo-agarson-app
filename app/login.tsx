import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Formik } from 'formik'
import * as yup from "yup";
import { Login } from '../services/UserServices';
import { Image, ScrollView, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user.types';
import { BackendError } from '..';
import { router } from 'expo-router';


const LoginFormSchema = yup.object({
  username: yup.string().required("required field"),
  password: yup.string().required('required field')
})

const LoginScreen = () => {
  const { setUser } = useContext(UserContext)
  const { mutate, data, isSuccess, isLoading, error } = useMutation
    <AxiosResponse<{ user: IUser, token: string }>,
      BackendError,
      { username: string, password: string, multi_login_token?: string }
    >(Login)


  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.user)
      router.replace("/")
    }
  }, [isSuccess])

  return (
    <>
      <Snackbar
        visible={Boolean(error)}
        onDismiss={() => null}
        action={{
          label: 'Undo',
          onPress: () => {
            null
          },
        }}>
        {error && error.response.data.message || ""}
      </Snackbar>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginFormSchema}
        onSubmit={async (values) => {
          mutate({
            ...values,
            multi_login_token: "akknahkh"
          })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>

            <ScrollView contentContainerStyle={{ flex: 1, gap: 15, justifyContent: 'flex-start', padding: 20, marginTop: 40 }}>
              <View style={{ alignItems: 'center' }}>
                <Image style={{ height: 150, width: 150 }} source={require("../assets/icon.png")} />
                <Text>Long Lasting safety shoes</Text>
              </View>

              <TextInput
                mode="outlined"
                style={{ borderRadius: 20, borderWidth: 2, paddingTop: 2 }}
                outlineStyle={{ display: 'none' }}
                label="Username,email or mobile"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                autoCapitalize='none'
                value={values.username}
              />
              <TextInput
                mode="outlined"
                style={{ borderRadius: 20, borderWidth: 2, paddingTop: 2 }}
                outlineStyle={{ display: 'none' }}
                label='Password'
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />

              {<Button
                mode="contained"
                disabled={isLoading}
                style={{ borderRadius: 10 }}
                onPress={() => handleSubmit()}>
                {!isLoading ? "SIGN IN" : "LOGGING IN ..."}
              </Button>}
            </ScrollView>
          </>
        )}
      </Formik >
    </>
  )
}



export default LoginScreen