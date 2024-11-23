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
    Line,
    styles
} from './../components/styles'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";
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
const auth = getAuth(app);
WebBrowser.maybeCompleteAuthSession();
const {brand, darkLight, primary} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [modalVisible,setModalVisible] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "343164681416-84oos380pkvml0e12vklhskjtg1kbmud.apps.googleusercontent.com",
    androidClientId: "343164681416-84oos380pkvml0e12vklhskjtg1kbmud.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: makeRedirectUri({ scheme: "STE", useProxy: true }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication && authentication.accessToken) {
        fetchUserInfo(authentication.accessToken);
      } else {
        setModalMessage("Không nhận được mã truy cập từ Google.");
        setModalType("error");
        setModalVisible(true);
      }
    } else if (response?.type === "error") {
      setModalMessage("Đăng nhập với Google thất bại. Vui lòng thử lại sau.");
      setModalType("error");
      setModalVisible(true);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      setGoogleSubmitting(true);
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (response.ok) {
        const user = await response.json();
        setUserInfo(user);
        setModalMessage(`Xin chào, ${user.name}!`);
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("Welcome", {
            email: user.email,
            name: user.name,
            photoUrl: user.picture,
          });
        }, 1000);
      } else {
        throw new Error("Không thể lấy thông tin người dùng.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setModalMessage("Lỗi đường truyền. Vui lòng kiểm tra kết nối Internet.");
      setModalType("error");
      setModalVisible(true);
    } finally {
      setGoogleSubmitting(false);
    }
  };

    const handleLogin = async (values) => {
        const { email, password } = values;
    
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setModalMessage("Đăng nhập thành công!");
          setModalType("success");
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("Welcome");
          }, 1500);
        } catch (error) {
            setModalMessage("Tài khoản hoặc mật khẩu của bạn không chính xác!");
            setModalType("error");
            setModalVisible(true);
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
                    {({handleChange, handleBlur, handleSubmit, values,googleSubmitting, isSubmitting})=>(<StyledFormArea>
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
            <Modal style={{height:"100%"}}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                    <View
                        style={[
                        styles.modalContent,
                        { backgroundColor: modalType === "success" ? "#d4edda" : "#f8d7da" },
                        ]}
                    >
                        <Text
                        style={[
                            styles.modalText,
                            { color: modalType === "success" ? "#155724" : "#721c24" },
                        ]}
                        >
                        {modalMessage}
                        </Text>
                        <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#007bff" }]}
                        onPress={() => setModalVisible(false)}
                        >
                        <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
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