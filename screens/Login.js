import React, {useState} from "react";
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
const {brand, darkLight, primary} = Colors

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/tuan.png')}></PageLogo>
                <PageTitle>Learn English</PageTitle>
                <SubTitle>Đăng nhập tài khoản</SubTitle>

                <Formik
                    initialValues={{email:'',password:''}}
                    onSubmit={(values)=>{
                        console.log(values);
                    }}  
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
                        <MsgBox>...</MsgBox>
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
                            <TextLink>
                                <TextLinkContent>Đăng ký</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
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