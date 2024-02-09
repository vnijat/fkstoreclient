import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {endOfDay, endOfToday, parse, parseISO, startOfDay} from "date-fns";
import {useEffect, useMemo, useState} from "react";
import {Text, View} from "react-native";
import HELP from "../../services/helpers";
import {Colors} from "../../utils/colors";
import FONT from "../../utils/font";
import {getStyle} from "./styles";


interface IMulitDateTimePicker {
    startDate: Date;
    endDate?: Date;
    getDates: (data: {startDate: string; endDate: string;}) => void;
}


const MulitDateTimePicker = ({startDate, endDate, getDates}: IMulitDateTimePicker) => {
    const style = useMemo(() => getStyle(), []);
    const defaultStartDate = startOfDay(new Date(startDate));
    const startDateUTC = HELP.getUTCSubTZ(defaultStartDate);
    const [start, setStartDate] = useState(startDateUTC);
    const endOfTodayUTC = HELP.getUTCAddTZ(endOfToday());
    const [end, setEndDate] = useState(endOfTodayUTC);
    const minimumEndDate = start;

    useEffect(() => {
        const startDayOfStartDate = startOfDay(start);
        const endDayOfEndDate = endOfDay(end);
        const startDate = HELP.getUTCSubTZ(startDayOfStartDate).toISOString();
        const endDate = HELP.getUTCSubTZ(endDayOfEndDate).toISOString();
        if (Number(start) > Number(end)) {
            setEndDate(start);
        }
        getDates({startDate, endDate});
    }, [start, end]);

    const onChangeStartDate = (event: DateTimePickerEvent, date: Date) => {
        setStartDate(date);
    };
    const onChangeEndDate = (event: DateTimePickerEvent, date: Date) => {
        setEndDate(date);
    };

    return (
        <View style={style.container}>
            <View style={style.dateContainer}>
                <Text style={style.dateTitle}>
                    {'START'}
                </Text>
                <RNDateTimePicker value={start} onChange={onChangeStartDate} />
            </View>
            <View style={style.dateContainer}>
                <Text style={style.dateTitle}>
                    {'END'}
                </Text>
                <RNDateTimePicker value={end} onChange={onChangeEndDate} minimumDate={minimumEndDate} />
            </View>
        </View>
    );


};

export default MulitDateTimePicker;