import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useThemeContext } from '../../theme';
import { NavigationInterface } from '../../constants';

import Button from '../../components/button';
import InputFiled from '../../components/inputField';

import UserIcon from '../../../assets/icons/user';
import MailIcon from '../../../assets/icons/mail';
import PhoneIcon from '../../../assets/icons/phone';
import PrivacyIcon from '../../../assets/icons/privacy';
import boxShadow from '../../utils/boxShadows';

import {
  Container,
  Logo,
  FormFields,
  FormControls,
  TermsAndCondition,
  TermsLabel,
  TermsLink
} from './styles';

export default function SignUp({ navigation }: NavigationInterface) {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    password: ''
  });

  const { colors, fonts } = useThemeContext();

  const onHandleChange = (field: string) => (value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = () => {
    // dispatch action to submit form

    // on success navigate to profile setup screen
    navigation.navigate('ProfileSetupScreen');
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ alignItems: 'center', width: '100%' }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Logo
          testID="appLogo"
          source={require('../../../assets/images/logo.png')}
          style={{ resizeMode: 'contain' }}
        />
        <FormFields>
          <InputFiled
            placeholder="Username"
            testID="userName"
            onChangeText={onHandleChange('userName')}
            defaultValue={values.userName}
            textContentType="name"
            style={{
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            }}
          >
            <UserIcon />
          </InputFiled>
          <InputFiled
            placeholder="Email"
            testID="email"
            onChangeText={onHandleChange('email')}
            defaultValue={values.email}
            textContentType="emailAddress"
            keyboardType="email-address"
          >
            <MailIcon />
          </InputFiled>
          <InputFiled
            placeholder="Phone"
            testID="phone"
            onChangeText={onHandleChange('phone')}
            defaultValue={values.phone}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          >
            <PhoneIcon />
          </InputFiled>
          <InputFiled
            placeholder="Password"
            testID="password"
            onChangeText={onHandleChange('password')}
            defaultValue={values.password}
            secureTextEntry={true}
            returnKeyType="done"
            style={{
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10
            }}
          >
            <PrivacyIcon />
          </InputFiled>
        </FormFields>
      </KeyboardAvoidingView>
      <FormControls>
        <Button
          testID="submitButton"
          buttonStyle={[
            {
              backgroundColor: colors.POST_TIP_COLOR,
              borderRadius: 2
            },
            boxShadow({
              elevation: 2,
              color: 'rgba(175, 163, 180, 1)',
              opacity: 0.3,
              radius: 1,
              height: 2.5
            })
          ]}
          textStyle={{
            color: colors.BG_LIGHT_COLOR,
            textTransform: 'uppercase',
            fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
            fontSize: fonts.MEDIUM_SIZE - 1
          }}
          title="Submit"
          onPress={handleSubmit}
        />
        <Button
          title="Log in"
          testID="loginButton"
          onPress={() => navigation.navigate('LoginScreen')}
          textStyle={{
            color: colors.POST_TIP_COLOR,
            fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
            fontSize: fonts.MEDIUM_SIZE,
            textTransform: 'capitalize'
          }}
          buttonStyle={[
            {
              borderRadius: 2
            },
            boxShadow({
              elevation: 0.3,
              color: 'rgba(175, 163, 180, 0.45)',
              opacity: 0.5,
              radius: 10,
              height: 0
            })
          ]}
        />
      </FormControls>
      <TermsAndCondition>
        <TermsLabel>By signing up you have agreed to our</TermsLabel>
        <TermsLink>Terms of Use & Privacy Policy</TermsLink>
      </TermsAndCondition>
    </Container>
  );
}

SignUp.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
