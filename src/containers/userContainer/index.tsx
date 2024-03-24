import {useEffect, useMemo, useRef, useState} from "react";
import {Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, View} from "react-native";
import {getStyle} from "./styles";
import ProfileCard from "./components/profileCard";
import {RootState, useAppDispatch} from "../../modules/redux/store";
import {useSelector} from "react-redux";
import {Colors} from "../../utils/colors";
import UserMenuContainer from "./components/userMenu";
import {setIsShowMyAccountModal, setIsShowSettingsModal, setIsShowUserMenu} from "../../modules/redux/appStateSlicer";
import MyAccountModal from "./components/myAccountModal";
import Icon from "react-native-vector-icons/Entypo";
import {IMenuItem} from "./types";
import {clearUserData, setUserData, updateUser} from "../../modules/redux/userSlicer";
import {useEditUserMutation, useGetUserQuery, useRemoveAvatarMutation, useUploadAvatarMutation} from "../../modules/api/user.api";
import {User} from "../../types/user.type";
import HELP from "../../services/helpers";
import {SafeAreaView} from "react-native-safe-area-context";
import {InputItem} from "../../components/inputItem";
import {accountInputConfigs} from "./configs";
import CustomPressable from "../../components/customPressable";
import {launchImageLibrary} from "react-native-image-picker";
import CustomModal from "../../components/customModal";





const UserContainer = () => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [apiEditUserData] = useEditUserMutation();
    const user = useSelector((state: RootState) => state.user.user);
    const [newData, setNewData] = useState<User>(user!);
    const apiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const token = useSelector((state: RootState) => state.user.tokens?.accessToken);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [apiUploadAvatar] = useUploadAvatarMutation();
    const [apiRemoveAvatar] = useRemoveAvatarMutation();
    const {data: userData} = useGetUserQuery(undefined, {pollingInterval: 5000});
    const avatarSource = {
        uri: apiUrl + user?.avatarUrl, headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        dispatch(updateUser(userData));
        setNewData(userData!);
    }, [userData]);



    const handleDataChange = (data: string | Date, dtoKey: keyof User) => {
        setNewData((prev) => ({...prev, [dtoKey]: data}));
    };


    const handleUpdateUserData = async (data: User) => {
        try {
            const response = await apiEditUserData(data).unwrap();
            dispatch(setIsShowMyAccountModal(false));
            HELP.showToast('success', response.message, "Success");
        } catch (error) {
            HELP.alertError(error);
        }
    };





    const handleAvatarSelection = async () => {
        setShowAvatarModal(false);
        try {
            const result = await launchImageLibrary({mediaType: 'photo'});
            if (result.didCancel) {
                return;
            }
            const formData = new FormData();
            const {fileName, type, uri, fileSize} = result?.assets[0];
            console.log("handleAvatarSelection=uri", uri, "NAME", fileName, "TYPE=>>", type, fileSize);
            formData.append('file', {uri, name: fileName, type});
            const response = await apiUploadAvatar(formData).unwrap();
            HELP.showToast('success', response.message, "Success");
        }
        catch (error) {
            HELP.alertError(error);
            console.log("handleAvatarSelection=erorr", error);
        }
    };


    const handleRemoveAvatar = async () => {
        setShowAvatarModal(false);
        try {
            const response = await apiRemoveAvatar(undefined).unwrap();
            HELP.showToast('success', response.message, "Success");
        }
        catch (error) {
            HELP.alertError(error);
        }
    };



    const handleOnPressAvatar = async () => {
        if (user?.avatarUrl) {
            setShowAvatarModal(true);
        }
        else {
            setShowAvatarModal(false);
            await handleAvatarSelection();
        }
    };

    const avatarSelectionConfig: {title: string; onPress: () => void;}[] = [
        {title: 'Change Avatar', onPress: handleAvatarSelection},
        {title: 'Remove Avatar', onPress: handleRemoveAvatar},
    ];


    return (
        <>
            <CustomModal
                isShowModal={showAvatarModal}
                closeModal={() => setShowAvatarModal(false)}
                height={150}
            >
                <View style={{flex: 1, backgroundColor: Colors.CARD_COLOR, gap: 5, padding: 5}}>
                    {avatarSelectionConfig.map((item, index) => (
                        <CustomPressable key={index} style={style.avatarModalItem} onPress={item.onPress}>
                            <Text style={style.avatarModalText}>{item.title.toUpperCase()}</Text>
                        </CustomPressable>
                    ))}
                </View>

            </CustomModal >
            <SafeAreaView style={style.container}>
                <View style={style.topContainer}>
                    <CustomPressable style={style.avatarContainer}
                        onPress={handleOnPressAvatar}
                        android_ripple={{color: Colors.METALLIC_GOLD, radius: 50, }}>
                        {!user?.avatarUrl?.length && <Text style={style.avatarHoverText}>
                            {'ADD AVATAR'}
                        </Text>
                        }
                        {!!user?.avatarUrl?.length ?
                            <Image source={avatarSource} style={{height: 90, width: 90, borderRadius: 100}} resizeMode={'cover'} />
                            : <Icon name={'user'} size={60} color={Colors.CARD_COLOR} />}
                    </CustomPressable>
                </View>
                <KeyboardAvoidingView style={style.inputsContainer} keyboardVerticalOffset={20} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView style={{flex: 1}}>
                        {newData && accountInputConfigs.map((item, index) => {
                            const isEditable = item?.isEditable ?? true;
                            const dataValue = item?.isDate ? newData[item?.dtoKey as keyof User] : newData[item?.dtoKey as keyof User]?.toString();
                            return (
                                <InputItem
                                    key={item.dtoKey}
                                    inputTitle={item.placeHolder}
                                    height={40}
                                    inputValue={dataValue}
                                    isDatePicker={item?.isDate}
                                    titleColor={Colors.DEFAULT_TEXT_COLOR}
                                    disabledForEdit={!isEditable}
                                    selectable={!!item?.selectableData?.length}
                                    selectableData={item?.selectableData}
                                    setValue={(value) => handleDataChange(value as string | Date, item.dtoKey as keyof User)}
                                />
                            );
                        })}
                    </ScrollView>
                </KeyboardAvoidingView>
                <CustomPressable
                    onHoverOpacity
                    style={style.saveButton}
                    onPress={() => handleUpdateUserData(newData)}>
                    <Text style={style.buttonText}>
                        {'SAVE'}
                    </Text>
                </CustomPressable>
            </SafeAreaView >
        </>

    );
};


export default UserContainer;;;