import {DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";
import {DrawerNavigationState, ParamListBase, useRoute} from "@react-navigation/native";
import React, {useMemo} from "react";
import {Text, View} from "react-native";
import {getStyle} from "./styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import ProfileCard from "../../../../containers/userContainer/components/profileCard";
import CustomPressable from "../../../../components/customPressable";
import {PrimaryButton} from "../../../../components/primaryButton";
import Icon from "react-native-vector-icons/Entypo";
import {Colors} from "../../../../utils/colors";
import {RouteNames} from "../../../../enums/routes";
import {IconProps} from "react-native-vector-icons/Icon";



interface IDrawerContentData {
    routeName: string;
    title: string;
    icon: ({color}: Omit<IconProps, 'name'>) => React.ReactNode;
}

interface IDrawerContent {
    navigation: DrawerNavigationHelpers;
    state: DrawerNavigationState<ParamListBase>;
}

const DrawerContent = ({navigation, state}: IDrawerContent) => {
    const style = useMemo(() => getStyle(), []);
    const user = useSelector((state: RootState) => state.user.user);
    const apiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const token = useSelector((state: RootState) => state.user.tokens?.accessToken);
    const currentRouteName = state.routeNames[state.index];

    const drawerContentData: IDrawerContentData[] = [
        {
            title: 'Home',
            routeName: RouteNames.HOME,
            icon: ({color}) => <Icon name={'home'} size={20} color={color || Colors.DEFAULT_TEXT_COLOR} />
        },
        {
            title: 'Profile',
            routeName: RouteNames.PROFILE,
            icon: ({color}) => <Icon name={'user'} size={20} color={color || Colors.DEFAULT_TEXT_COLOR} />
        },
        {
            title: 'Configs',
            routeName: RouteNames.CONFIG,
            icon: ({color}) => <Icon name={'cog'} size={20} color={color || Colors.DEFAULT_TEXT_COLOR} />
        }

    ];

    const handleOnPressProfile = () => {
        navigation.navigate(RouteNames.PROFILE);
    };

    const handleLogout = () => {

    };


    const renderDrawerContent = useMemo(() => {
        return drawerContentData.map((item, index) => {
            const DrawerIcon = item.icon;
            const contentColor = currentRouteName === item.routeName ? Colors.METALLIC_GOLD : Colors.DEFAULT_TEXT_COLOR;
            return (
                <CustomPressable onPress={() => navigation.navigate(item?.routeName)} style={style.contentItem} key={index} android_ripple={{color: Colors.METALLIC_GOLD}}>
                    <View style={style.contentItemIcon}>
                        <DrawerIcon color={contentColor} />
                    </View>
                    <Text style={[style.contentText, {color: contentColor}]}>
                        {item.title.toUpperCase()}
                    </Text>
                </CustomPressable >
            );
        });

    }, [currentRouteName]);





    return (
        <View style={style.container}>
            {user &&
                <View style={style.contentHeader}>
                    <ProfileCard {...{token, apiUrl, user}} onPressCard={handleOnPressProfile} android_ripple={{color: Colors.CARD_HEADER_COLOR}} />
                </View>
            }
            <View style={style.contentBody}>
                {renderDrawerContent}
            </View>
            <View style={style.contentFooter}>
                <PrimaryButton
                    onPress={handleLogout}
                    title={'Log Out'.toUpperCase()}
                    height={40}
                    buttonColor={Colors.DEFAULT_TEXT_COLOR}
                    borderRadius={5}
                    icon={
                        <Icon
                            name={'log-out'}
                            size={20}
                            color={Colors.DEFAULT_TEXT_COLOR}
                        />
                    }
                />
            </View>
        </View>
    );
};
export default DrawerContent;