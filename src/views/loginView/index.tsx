import React, {useMemo, useState} from 'react';
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import {Colors} from "../../utils/colors";
import {PrimaryButton} from '../../components/primaryButton';
import CustomPressable from '../../components/customPressable';
import {createUserInputs, loginInputs} from './configs/input.configs';
import {getStyle} from './styles';
import {Role} from '../../enums/userRole';
import CustomPicker from '../../containers/customPicker';
import {useCreateUserWithMasterPasswordMutation, useLoginUserMutation} from '../../modules/api/user.api';
import HELP from '../../services/helpers';
import {useAppDispatch} from '../../modules/redux/store';
import {setUserData} from '../../modules/redux/userSlicer';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../enums/routes';
import {resetAllTables} from '../../modules/redux/tableConfigs';




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
    const navigation = useNavigation();
    const [apiLoginUser] = useLoginUserMutation();
    const [apiCreateUserWithMasterPassword] = useCreateUserWithMasterPasswordMutation();
    const style = useMemo(() => getStyle(), []);
    const [isCreateUser, setIsCreateUser] = useState(false);
    const [userDataForPost, setUserDataForPost] = useState<IUserDataForPost>({
        user: {
            email: '',
            password: ''
        },
        masterCode: '',
        role: Role.STAFF
    });
    const [userDataForLogin, setUserDataForLogin] = useState<{email: string; password: string;}>({email: '', password: ''});
    const inputData = isCreateUser ? userDataForPost : userDataForLogin;
    const inputConfigs = isCreateUser ? createUserInputs : loginInputs;
    const actionButtonTitle = (isCreateUser ? 'Create Account' : 'Login').toUpperCase();
    const bottomActionTitle = (isCreateUser ? 'Login' : 'Create Account').toUpperCase();


    const setInputData = (data: {[key: string]: any;}, parentDtoKey?: string) => {
        if (parentDtoKey) {
            Object.assign(inputData[parentDtoKey], data);
        } else {
            Object.assign(inputData, data);
        }
        if (isCreateUser) {
            setUserDataForPost({...inputData} as IUserDataForPost);
        } else {
            setUserDataForLogin({...inputData} as {email: string; password: string;});
        }
    };





    const handleCreateUser = async () => {
        try {
            const response = await apiCreateUserWithMasterPassword(userDataForPost).unwrap();
            setIsCreateUser(false);
            HELP.showToast('success', response?.message);
        } catch (error) {
            HELP.alertError(error);
        }
    };


    const handleLoginUser = async () => {
        try {
            const response = await apiLoginUser(userDataForLogin).unwrap();
            dispatch(setUserData({
                tokens: response.tokens,
                user: response.user
            }));
            dispatch(resetAllTables());
        } catch (error) {
            HELP.alertError(error);
        }
    };


    const handleOnpressActionButton = () => {
        if (isCreateUser) {
            handleCreateUser();
        } else {
            handleLoginUser();
        }
    };



    const renderInputs = useMemo(() => {
        return inputConfigs.map((inputConfig, index) => {
            const {dtoKey, placeHolder, isSecureText, hintText, parentDtoKey} = inputConfig;
            const pickerData = inputConfig.selectableData ?? [];
            const inputValue = parentDtoKey ? inputData[parentDtoKey][dtoKey] : inputData[dtoKey];
            if (pickerData.length) {
                return (
                    <CustomPicker
                        key={dtoKey}
                        title={`SELECT ${placeHolder}:`.toUpperCase()}
                        singleSelectMode
                        singleSelected={inputValue}
                        singleOnSelect={(data) => setInputData({[dtoKey]: data.value}, parentDtoKey)}
                        singleSelectData={pickerData}
                        buttonStyle={style.pickerButton}
                        itemStyle={style.pickerItem}
                        selectedItemStyle={style.pickerItemSelected}
                        selectedItemTextStyle={style.pickerItemSelectedText}
                        arrowDownColor={Colors.DEFAULT_TEXT_COLOR}

                    />

                );
            }
            return (
                <View key={dtoKey} tooltip={hintText}>
                    <TextInput
                        value={inputValue}
                        onChangeText={(data) => setInputData({[dtoKey]: data}, parentDtoKey)}
                        placeholderTextColor={Colors.DEFAULT_TEXT_COLOR}
                        secureTextEntry={isSecureText}
                        placeholder={placeHolder}
                        style={style.input}
                    />
                </View>
            );
        });

    }, [inputData, inputConfigs]);




    return (
        <View style={style.container} >
            <View style={style.logoContainer}>
                <View style={style.logoBox}>
                    <Image source={require('../../assets/logo/LOGO.svg')} resizeMode={'contain'} style={{height: 80, width: 80}} />
                </View>
            </View>
            <View style={style.inputsContainer}>
                {renderInputs}
                <PrimaryButton title={actionButtonTitle} onPress={handleOnpressActionButton} buttonColor={Colors.DARK_GOLDENROD} width={200} height={35} />
            </View>
            <CustomPressable onHoverOpacity onPress={() => setIsCreateUser((prev) => !prev)}>
                <Text style={style.bottomActionText}  >
                    {bottomActionTitle}
                </Text>
            </CustomPressable>
        </View>
    );
};


export default LoginView;