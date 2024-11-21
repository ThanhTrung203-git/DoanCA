import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  MsgBox,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  Colors,
  Line,
  ButtonText,
} from "./../components/styles";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs8ZFSFw_dfyByJlshJcv8SZKtYEbjJ5U",
  authDomain: "steproject-ec674.firebaseapp.com",
  projectId: "steproject-ec674",
  storageBucket: "steproject-ec674.appspot.com",
  messagingSenderId: "343164681416",
  appId: "1:343164681416:web:25185d192111877b8df9fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleSignup = async (values) => {
    const { fullname, email, password, comfirmpassword } = values;

    if (password !== comfirmpassword) {
        setMessage("Mật khẩu và xác nhận mật khẩu không trung khớp");
        return;
      }
  
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Registration successful! Please log in.");
        navigation.navigate("Login");
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Learn English</PageTitle>
          <SubTitle>Đăng ký tài khoản</SubTitle>

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullname: "",
              email: "",
              dateOfBirth: "",
              password: "",
              comfirmpassword: "",
            }}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Họ và tên"
                  icon="person"
                  placeholder="Nguyễn Văn A"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  value={values.fullname}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="your_email@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Ngày sinh"
                  icon="calendar"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={darkLight}
                  value={dob}
                  editable={false}
                  isDate={true}
                  showDatePicker={showDatePicker}
                />

                <MyTextInput
                  label="Mật khẩu"
                  icon="lock"
                  placeholder="* * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Xác nhận mật khẩu"
                  icon="lock"
                  placeholder="* * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("comfirmpassword")}
                  onBlur={handleBlur("comfirmpassword")}
                  value={values.comfirmpassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox>{message}</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Đăng ký</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Đã có tài khoản? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Đăng nhập</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {isDate ? (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      ) : (
        <StyledTextInput {...props} />
      )}

      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
