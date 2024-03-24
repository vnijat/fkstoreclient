import React, {useMemo, useRef, useState} from 'react';
import {Image, ImageBackground, Text, TextInput, TextInputProps, View} from "react-native";
import {getStyle} from './styles';
import {useNavigation} from '@react-navigation/native';
import HELP from '../../../services/helpers';
import {Role} from '../../../enums/userRole';
import {Colors} from '../../../utils/colors';
import {RootState, useAppDispatch} from '../../../modules/redux/store';
import {loginInputs} from '../../../views/loginView/configs/input.configs';
import {PrimaryButton} from '../../../components/primaryButton';
import FONT from '../../../utils/font';
import {setUserData} from '../../../modules/redux/userSlicer';
import {useSelector} from 'react-redux';
import {setApiURL} from '../../../modules/redux/configsSlicer';
import {useLoginUserMutation} from '../../../modules/api/user.api';




export interface IUserDataForPost {
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
        password: string;
    };
    masterCode: string;
    role: Role;
}


const LoginView = () => {
    const dispatch = useAppDispatch();
    const [apiLoginUser] = useLoginUserMutation();
    let inputsRef = useRef<TextInput[] | null>([]);
    const style = useMemo(() => getStyle(), []);
    const [userDataForLogin, setUserDataForLogin] = useState<{email: string; password: string;}>({email: '', password: ''});
    const serverApiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const inputData = userDataForLogin;
    const inputConfigs = loginInputs;
    const actionButtonTitle = ('Login').toUpperCase();


    const setInputData = (data: {[key: string]: any;}, parentDtoKey?: string) => {
        if (parentDtoKey) {
            Object.assign(inputData[parentDtoKey], data);
        } else {
            Object.assign(inputData, data);
        }
        setUserDataForLogin({...inputData} as {email: string; password: string;});
    };



    const handleLoginUser = async () => {
        try {
            const response = await apiLoginUser(userDataForLogin).unwrap();
            dispatch(setUserData({
                tokens: response.tokens,
                user: response.user
            }));
        } catch (error) {
            console.log("error===>>>", error);
            HELP.alertError(error);
        }
    };


    const handleOnpressActionButton = () => {
        handleLoginUser();
    };


    const onSubmitInput = (index: number) => {
        const nextInput = inputsRef?.current[index + 1];
        if (nextInput) {
            nextInput?.focus();
        } else {
            handleOnpressActionButton();
        }
    };



    const renderInputs = useMemo(() => {
        return inputConfigs.map((inputConfig, index) => {
            const {dtoKey, placeHolder, isSecureText, hintText, parentDtoKey} = inputConfig;
            const inputValue = parentDtoKey ? inputData[parentDtoKey][dtoKey] : inputData[dtoKey];
            return (
                <View key={dtoKey} tooltip={hintText}>
                    <TextInput
                        ref={(ref) => (inputsRef.current[index] = ref)}
                        value={inputValue}
                        onChangeText={(data) => setInputData({[dtoKey]: data}, parentDtoKey)}
                        placeholderTextColor={Colors.DEFAULT_TEXT_COLOR}
                        secureTextEntry={isSecureText}
                        placeholder={placeHolder}
                        onSubmitEditing={() => onSubmitInput(index)}
                        style={style.input}
                    />
                </View>
            );
        });

    }, [inputData, inputConfigs]);

    const setServerApiUrl = (data: string) => {
        dispatch(setApiURL(data));
    };


    return (
        <View style={style.container}  >
            <View style={style.logoContainer}>
                <View>
                    <Text style={{fontSize: FONT.FONT_SIZE_MEGA, fontStyle: 'italic', color: Colors.METALLIC_GOLD}}>
                        {'Welcome !\nPlease Login to continue'.toUpperCase()}
                    </Text>
                </View>
                <View style={{gap: 5, padding: 5}}>
                    <Text style={{color: Colors.METALLIC_GOLD, fontWeight: FONT.FONT_BOLD}}>
                        {'Server url'.toUpperCase()}
                    </Text>
                    <TextInput
                        value={serverApiUrl}
                        onChangeText={setServerApiUrl}
                        placeholderTextColor={Colors.DEFAULT_TEXT_COLOR}
                        placeholder={serverApiUrl}
                        style={[style.input, {fontWeight: FONT.FONT_BOLD}]}
                    />
                </View>
            </View>
            <View style={style.inputsContainer}>
                {renderInputs}
                <PrimaryButton title={actionButtonTitle} onPress={handleOnpressActionButton} buttonColor={Colors.DARK_GOLDENROD} width={200} height={35} />
            </View>
        </View>
    );
};


export default LoginView;