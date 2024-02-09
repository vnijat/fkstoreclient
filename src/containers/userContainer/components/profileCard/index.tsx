import React, {Ref, useMemo} from "react";
import {User} from "../../../../types/user.type";
import {getStyle} from "./styles";
import {Image, Pressable, PressableProps, Text, View} from "react-native";
import {Colors} from "../../../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from "../../../../components/customPressable";



interface IProfileCard extends PressableProps {
    user: User;
    onPressCard: () => void;
    apiUrl: string;
    token?: string;
}


const ProfileCard = React.forwardRef(({user, onPressCard, apiUrl, token, ...rest}: IProfileCard, ref: Ref<View>) => {
    const {firstName, lastName, email} = user;
    const style = useMemo(() => getStyle(), []);
    const person = (firstName || lastName) ? `${firstName} ${lastName}` : email;
    const avatarSource = {
        uri: apiUrl + user.avatarUrl, headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return (
        <CustomPressable
            ref={ref}
            onHoverOpacity
            onPress={onPressCard}
            {...rest}
            style={style.container}>
            <View style={{}}>
                <Text style={{color: Colors.DEFAULT_TEXT_COLOR}}>
                    {`Welcome, ${person}!`}
                </Text>
            </View>
            <View style={style.avatarContainer}>
                {user.avatarUrl?.length ? <Image source={avatarSource} style={{height: 30, width: 30, borderRadius: 30}} resizeMode={'cover'} />
                    : <Icon name={'user'} size={20} color={Colors.DEFAULT_TEXT_COLOR} />
                }
            </View>
        </CustomPressable >
    );
});

export default ProfileCard;