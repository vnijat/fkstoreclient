import {useEffect, useMemo, useRef, useState} from "react";
import {View} from "react-native";
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
import {useEditUserMutation, useGetUserQuery} from "../../modules/api/user.api";
import {User} from "../../types/user.type";
import HELP from "../../services/helpers";
import {Flyout} from "react-native-windows";





const UserContainer = () => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [apiEditUserData] = useEditUserMutation();
    const user = useSelector((state: RootState) => state.user.user);
    const isShowUserMenu = useSelector((state: RootState) => state.appStateSlicer.isShowUserMenu);
    const apiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const token = useSelector((state: RootState) => state.user.tokens?.accessToken);
    const isShowMyAccountModal = useSelector((state: RootState) => state.appStateSlicer.isShowMyAccountModal);
    const [panelWidth, setPanelWidth] = useState(100);
    const panelRef = useRef(null);
    const IconColor = useMemo(() => Colors.DEFAULT_TEXT_COLOR, []);
    const {data: userData} = useGetUserQuery(undefined, {pollingInterval: 10000});


    useEffect(() => {
        dispatch(updateUser(userData));
    }, [userData]);


    const onPressProfileCard = () => {
        dispatch(setIsShowUserMenu(true));
    };

    const handleOnpressMyAccount = () => {
        dispatch(setIsShowUserMenu(false));
        dispatch(setIsShowMyAccountModal(true));

    };

    const handleOpressSettings = () => {
        dispatch(setIsShowSettingsModal(true));
    };

    const handleOnpressLogOut = () => {
        dispatch(setIsShowUserMenu(false));
        dispatch(clearUserData());
    };

    const menuItems: IMenuItem[] = [
        {title: 'My Account', icon: <Icon name={'v-card'} size={15} color={IconColor} />, onPress: handleOnpressMyAccount},
        {title: 'Settings', icon: <Icon name={'cog'} size={15} color={IconColor} />, onPress: handleOpressSettings},
        {title: 'Log Out', icon: <Icon name={'log-out'} size={15} color={IconColor} />, onPress: handleOnpressLogOut},
    ];

    const onCloseAccountModal = () => {
        dispatch(setIsShowMyAccountModal(false));
    };
    const handleMenuDismiss = () => {
        dispatch(setIsShowUserMenu(false));
    };

    const onLayout = (event: {nativeEvent: {layout: {width: number;};};}) => {
        const {width} = event.nativeEvent.layout;
        setPanelWidth(width);
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

    return (
        <View>
            {user &&
                <>
                    <MyAccountModal
                        onClose={onCloseAccountModal}
                        isShowModal={isShowMyAccountModal}
                        data={user}
                        token={token}
                        apiUrl={apiUrl}
                        onPressSave={handleUpdateUserData}
                    />
                    <ProfileCard
                        onLayout={onLayout}
                        onPressCard={onPressProfileCard}
                        {...{user}}
                        ref={panelRef}
                        token={token}
                        apiUrl={apiUrl} />
                </>
            }
            <Flyout
                showMode={'transient'}
                isOpen={isShowUserMenu}
                target={panelRef.current}
                onDismiss={handleMenuDismiss}
            >
                <UserMenuContainer
                    panelWidth={panelWidth}
                    menuItems={menuItems}
                />
            </Flyout>
        </View>
    );
};


export default UserContainer;