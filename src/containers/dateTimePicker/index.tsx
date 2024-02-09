import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useEffect, useState} from "react";
import {View} from "react-native";
import {Colors} from "../../utils/colors";



interface IDateTimePicker {
    dateValue?: Date;
    getDate: (date: string) => void;
    height?: number;
    width?: number;
}


const DateTimePicker = ({dateValue, getDate, height, width}: IDateTimePicker) => {
    const [date, setDate] = useState(dateValue ? new Date(dateValue) : new Date());



    useEffect(() => {
        setDate(dateValue ? new Date(dateValue) : new Date());
    }, [dateValue]);

    const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
        date && setDate(date);
        date && getDate(date.toISOString());
    };

    return (
        <View style={{backgroundColor: Colors.DEFAULT_TEXT_COLOR}}>
            <RNDateTimePicker value={date} onChange={onChangeDate} style={{width: width || '100%', height}} />
        </View>
    );


};

export default DateTimePicker;