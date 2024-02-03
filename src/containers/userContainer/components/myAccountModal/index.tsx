import CustomModal from "../../../../components/customModal";
import {Colors} from "../../../../utils/colors";
import {User} from "../../../../types/user.type";
import {useMemo, useState} from "react";
import {getStyle} from "./styles";
import {Image, Text, TextInput, View} from "react-native";
import {accountInputConfigs} from "../../configs";
import DateTimePicker from "../../../dateTimePicker";
import {InputItem} from "../../../../components/inputItem/index.windows";
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from "../../../../components/customPressable";


interface IMyAccountModal {
    isShowModal: boolean;
    onClose: () => void;
    data: User;
    token?: string;
    apiUrl: string;
    onPressSave: (data: User) => void;
}


const MyAccountModal = ({isShowModal, onClose, data, token, apiUrl, onPressSave}: IMyAccountModal) => {
    const style = useMemo(() => getStyle(), []);
    const [newData, setNewData] = useState<User>(data);
    const avatarSource = {
        uri: apiUrl + data.avatarUrl, headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const handleDataChange = (data: string | Date, dtoKey: keyof User) => {
        setNewData((prev) => ({...prev, [dtoKey]: data}));
    };


    const onCloseModal = () => {
        setNewData(data);
        onClose();
    };

    return (
        <CustomModal
            isShowModal={isShowModal}
            closeModal={onCloseModal}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
            width={600}

        >
            <View style={style.container}>
                <View style={style.leftContainer}>
                    <View style={style.avatarContainer}>
                        {!!data.avatarUrl?.length ?
                            <Image source={avatarSource} style={{height: 100, width: 100, borderRadius: 100}} />
                            : <Icon name={'user'} size={100} color={Colors.CARD_COLOR} />}
                    </View>
                </View>
                <View style={style.rightContainer}>
                    {accountInputConfigs.map((item, index) => {
                        const isEditable = item?.isEditable ?? true;
                        const dataValue = item?.isDate ? newData[item.dtoKey as keyof User] : newData[item.dtoKey as keyof User]?.toString();
                        return (
                            <View key={item.dtoKey} style={style.inputContainer}>
                                <InputItem
                                    inputTitle={item.placeHolder}
                                    height={35}
                                    inputValue={dataValue}
                                    isDatePicker={item?.isDate}
                                    titleColor={Colors.DEFAULT_TEXT_COLOR}
                                    disabledForEdit={!isEditable}
                                    selectable={!!item?.selectableData?.length}
                                    selectableData={item?.selectableData}

                                    setValue={(value) => handleDataChange(value as string | Date, item.dtoKey as keyof User)}
                                />
                            </View>
                        );
                    })}
                    <CustomPressable
                        onHoverOpacity
                        style={style.saveButton}
                        onPress={() => onPressSave(newData)}>
                        <Text style={style.buttonText}>
                            {'SAVE'}
                        </Text>
                    </CustomPressable>
                </View>

            </View>
        </CustomModal >
    );

};


export default MyAccountModal;