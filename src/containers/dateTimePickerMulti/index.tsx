import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { endOfDay, endOfToday, parse, parseISO, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import HELP from "../../services/helpers";
import { Colors } from "../../utils/colors";
import FONT from "../../utils/font";


interface IMulitDateTimePicker {
    startDate: Date;
    endDate?: Date;
    getDates: (data: { startDate: string; endDate: string; }) => void;
}


const MulitDateTimePicker = ({ startDate, endDate, getDates }: IMulitDateTimePicker) => {
    const defaultStartDate = startOfDay(new Date(startDate))
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
        getDates({ startDate, endDate });
    }, [start, end]);

    const onChangeStartDate = (event: DateTimePickerEvent, date: Date) => {
        setStartDate(date);
    };
    const onChangeEndDate = (event: DateTimePickerEvent, date: Date) => {
        setEndDate(date);
    };

    return (
        <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', margin: 2, alignItems: 'center', backgroundColor: Colors.DEFAULT_TEXT_COLOR, }}>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_MEDIUM, fontFamily: FONT.FONT_FAMILY,
                    marginRight: 2,

                }}>
                    {'start'}
                </Text>
                <RNDateTimePicker value={start} onChange={onChangeStartDate} />
            </View>
            <View style={{ flexDirection: 'row', margin: 2, alignItems: 'center', backgroundColor: Colors.DEFAULT_TEXT_COLOR, }}>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_MEDIUM, fontFamily: FONT.FONT_FAMILY,
                    marginRight: 2
                }}>
                    {'end'}
                </Text>
                <RNDateTimePicker value={end} onChange={onChangeEndDate} minimumDate={minimumEndDate} />
            </View>
        </View>
    );


};

export default MulitDateTimePicker;