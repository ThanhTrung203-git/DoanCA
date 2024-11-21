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
import { View, TouchableOpacity } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

const {brand, darkLight, primary} = Colors

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
  
    // Actual value to be sent
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
      };
    
      const showDatePicker = () => {
        setShow('date');
      };

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Learn English</PageTitle>
                    <SubTitle>Đăng ký tài khoản</SubTitle>

                    {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    style={{
                        backgroundColor: 'yellow',
                    }}
                        />
                    )}

                    <Formik
                        initialValues={{fullname:'',email:'',dateOfBirth:'',password:'',comfirmpassword: ''}}
                        onSubmit={(values)=>{
                            console.log(values);
                            navigation.navigate("Welcome");
                        }}  
                        >
                        {({handleChange, handleBlur, handleSubmit, values})=>(<StyledFormArea>
                            <MyTextInput
                                label="Họ và tên"
                                icon={"person"}
                                placeholder="Nguyễn Văn A"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                value = {values.fullname}
                            />

                            <MyTextInput
                                label="Email Address"
                                icon={"mail"}
                                placeholder="your_email@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value = {values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput
                                label="Ngày sinh"
                                icon={"calendar"}
                                placeholder="YYYY = MM - DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                editable={false}
                                isDate={true}
                                showDatePicker={showDatePicker}
                            />

                            <MyTextInput
                                label="Password"
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

                            <MyTextInput
                                label="Xác nhận lại mật khẩu"
                                icon={"lock"}
                                placeholder="*  *   *   *   *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('comfirmpassword')}
                                onBlur={handleBlur('comfirmpassword')}
                                value = {values.comfirmpassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Đăng ký</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Đã có tài khoản rồi. </ExtraText>
                                <TextLink onPress = {() => navigation.navigate("Login")}>
                                    <TextLinkContent>Đăng nhập</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({label, icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {isDate && (
            <TouchableOpacity onPress={showDatePicker}>
            <StyledTextInput {...props} />
            </TouchableOpacity>
            )}
            {!isDate && <StyledTextInput {...props} />}

            { isPassword  && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;