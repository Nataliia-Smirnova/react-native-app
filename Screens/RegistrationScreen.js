import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { AppLoading } from "expo";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular"),
  });
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isReady, setIsReady] = useState(false);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
    }, []);
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View>
        <ImageBackground source={require('../assets/images/photo_bg')}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.form}>
              <View style={styles.header}>
                <View style={styles.profileImg}></View>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder={"Логин"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
              />
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder={"Адрес электронной почты"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
              />
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder={"Пароль"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <Text>
                Уже есть аккаунт? Войти
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    ) 
}


const styles = StyleSheet.create({

})