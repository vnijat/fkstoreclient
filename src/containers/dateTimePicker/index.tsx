import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useEffect, useRef, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {Colors} from "../../utils/colors";
import CustomPressable from "../../components/customPressable";
import Icon from "react-native-vector-icons/Entypo";



interface IDateTimePicker {
    dateValue?: Date;
    getDate: (date: string) => void;
    height?: number;
    width?: number;
    disabled?: boolean;
}


const DateTimePicker = ({dateValue, getDate, height, width, disabled}: IDateTimePicker) => {
    const [date, setDate] = useState(dateValue ? new Date(dateValue) : new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        setDate(dateValue ? new Date(dateValue) : new Date());
    }, [dateValue]);

    const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
        date && setDate(date);
        date && getDate(date.toISOString());
        setShowPicker(false);
    };


    const handleOnPress = () => {
        if (disabled) return;
        setShowPicker(true);
    };

    return (
        <CustomPressable onPressOut={handleOnPress} style={{flexDirection: 'row', backgroundColor: Colors.CARD_HEADER_COLOR, width, height: height || 40, padding: 5, borderRadius: 3, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: Colors.DEFAULT_TEXT_COLOR}}>
                {date.toLocaleDateString()}
            </Text>
            <Icon name={'calendar'} size={20} color={Colors.DEFAULT_TEXT_COLOR} />

            {showPicker && <RNDateTimePicker
                mode={'date'}
                value={date}
                onChange={onChangeDate}
            />}
        </CustomPressable>
    );


};

export default DateTimePicker;