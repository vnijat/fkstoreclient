import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Colors } from "../../utils/colors";



interface IDateTimePicker {
    dateValue?: Date;
    getDate: (date: string) => void;
}


const DateTimePicker = ({ dateValue, getDate }: IDateTimePicker) => {
    const [date, setDate] = useState(dateValue ? new Date(dateValue) : new Date());



    useEffect(() => {
        setDate(dateValue ? new Date(dateValue) : new Date());
    }, [dateValue]);

    const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
        date && setDate(date);
        date && getDate(date.toISOString());
    };

    return (
        <View style={{ backgroundColor: Colors.DEFAULT_TEXT_COLOR }}>
            <RNDateTimePicker value={date} onChange={onChangeDate} />
        </View>
    );


};

export default DateTimePicker;