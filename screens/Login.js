import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    ButtonText,
    Colors,
    StyledButton,
    MsgBox,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    Line
} from './../components/styles'
import { ActivityIndicator, View } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs8ZFSFw_dfyByJlshJcv8SZKtYEbjJ5U",
  authDomain: "steproject-ec674.firebaseapp.com",
  projectId: "steproject-ec674",
  storageBucket: "steproject-ec674.appspot.com",
  messagingSenderId: "343164681416",
  appId: "1:343164681416:web:25185d192111877b8df9fd",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
// WebBrowser setup
WebBrowser.maybeCompleteAuthSession();
const {brand, darkLight, primary} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    // Google auth request setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "343164681416-6jf22ak73efkv4jdp9jumm9asnld0988.apps.googleusercontent.com",
    androidClientId: "343164681416-84oos380pkvml0e12vklhskjtg1kbmud.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    console.log("Response:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    } else if (response?.type === "error") {
      console.error("Google Sign-In Error:", response.error);
      setMessage("Đăng nhập với Google thất bại. Vui lòng kiểm tra cấu hình.");
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      setGoogleSubmitting(true);
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = await res.json();
      setUserInfo(user);
      setMessage("Đăng nhập với Google thành công", "SUCCESS");
      setTimeout(() => {
        navigation.navigate("Welcome", {
          email: user.email,
          name: user.name,
          photoUrl: user.picture,
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Lỗi đường truyền. Vui lòng kiểm tra kết nối Internet");
    } finally {
      setGoogleSubmitting(false);
    }
  };

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/tuan.png')}></PageLogo>
                <PageTitle>Learn English</PageTitle>
                <SubTitle>Đăng nhập tài khoản</SubTitle>

                <Formik
                    initialValues={{email:'',password:''}}
                    onSubmit={(values,{setSubmitting}) => {
                        if(values.email =='' || values.password == ''){
                            setMessage('Vui lòng nhập đầy đủ!');
                            setSubmitting(false);
                        }else{
                            handleLogin(values,setSubmitting);
                        }
                    }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting})=>(<StyledFormArea>
                        <MyTextInput
                            label="Địa chỉ Email"
                            icon={"mail"}
                            placeholder="your_email@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value = {values.email}
                            keyboardType="email-address"
                        />

                        <MyTextInput
                            label="Mật khẩu"
                            icon={"lock"}
                            placeholder="*  *   *   *   *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value = {values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>{message}</MsgBox>
                        {!isSubmitting &&<StyledButton onPress={handleSubmit}>
                            <ButtonText>Đăng nhập</ButtonText>
                        </StyledButton>}

                        {isSubmitting &&<StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
                        <Line />
                        
                        {!googleSubmitting &&(
                            <StyledButton google={true} onPress={() => promptAsync()}>
                            <Fontisto name="google" color={primary} size={20}/>
                            <ButtonText google={true}>Đăng nhập với Google</ButtonText>
                        </StyledButton>
                        )}

                        {googleSubmitting &&(
                            <StyledButton google={true} disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                        )}
                        <ExtraView>
                            <ExtraText>Bạn chưa có tài khoản? </ExtraText>
                            <TextLink onPress={() => navigation.navigate("Signup")}>
                                <TextLinkContent>Đăng ký</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({label, icon,isPassword,hidePassword,setHidePassword, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            { isPassword  && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Login;