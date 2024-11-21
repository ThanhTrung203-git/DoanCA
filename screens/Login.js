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
import { View } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

const {brand, darkLight, primary} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");

    const handleLogin = async (values) => {
        const { email, password } = values;
    
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setMessage("Login successful!");
          navigation.navigate("Welcome");
        } catch (error) {
          setMessage(`Error: ${error.message}`);
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
                    onSubmit={(handleLogin)}
                    >
                    {({handleChange, handleBlur, handleSubmit, values})=>(<StyledFormArea>
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
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Đăng nhập</ButtonText>
                        </StyledButton>
                        <Line />
                        <StyledButton google={true} onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={20}/>
                            <ButtonText google={true}>Đăng nhập với Google</ButtonText>
                        </StyledButton>
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