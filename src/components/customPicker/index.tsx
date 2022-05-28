import React, { FC, useEffect, useRef, useState, } from 'react';
import { Pressable, Text, View, ScrollView, FlatList } from 'react-native';
import { Flyout } from 'react-native-windows';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';


interface ICustomPicker {
    data: Array<{ id: number; label: string; }>;
    title: string;
    getSelectedId?: Function;
}

const CustomPicker: FC<ICustomPicker> = ({ data, title, getSelectedId }) => {
    const style = getStyle();
    const [isShowContent, setShowContent] = useState(false);
    const buttonRef = useRef(null);
    const [selectedIds, setSelectedIds]: [number[], Function] = useState([]);
    const onPress = () => {
        setShowContent(true);
    };

    const onDismiss = () => {
        setShowContent(false);
    };
    const onPressDataItem = (id: number) => {
        console.log("id====>>>", id);
        if (selectedIds.includes(id)) {
            const filteredArray = selectedIds.filter(selID => selID !== id);
            setSelectedIds(filteredArray);
        } else {
            const currentIds = [...selectedIds];
            currentIds.push(id);
            setSelectedIds(currentIds);
        }
    };


    useEffect(() => {
        if (getSelectedId) {
            getSelectedId(selectedIds);

        }
    }, [selectedIds.length]);
    console.log("Data===>>", data);
    return (
        <>
            <Pressable style={{ width: 70, height: 40, backgroundColor: Colors.OLD_GOLD, justifyContent: 'center' }} ref={buttonRef} onPress={onPress}>
                <Text style={{ color: 'white', fontSize: 14 }}>
                    {title || ''}
                </Text>
            </Pressable>
            <Flyout
                target={buttonRef.current}
                placement={'bottom'}
                isOpen={isShowContent}
                onDismiss={onDismiss}
            >
                <View style={{ flex: 1, maxHeight: 100 }}>
                    <FlatList
                        style={{ flex: 1, backgroundColor: Colors.OLD_GOLD, borderRadius: 3 }}
                        contentContainerStyle={{ padding: 1 }}
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            const isSelected = selectedIds.includes(item.id);
                            return (
                                <Pressable style={{ height: 30, width: 100, margin: 1, justifyContent: 'center' }} onPress={() => onPressDataItem(item.id)} key={`${index}-${item.label}`}>
                                    <Text style={{
                                        color: isSelected ? 'red' : 'black', fontSize: 12,
                                    }} key={`${item.label}`}>
                                        {item.label}
                                    </Text>
                                </Pressable>);
                        }}

                    />
                </View>

                {/* {data?.map((item, index) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                            <Pressable style={{ height: 30, width: 100, backgroundColor: 'blue', margin: 1, justifyContent: 'center' }} onPress={() => console.log("ASDSDASD", item.id)} key={`${index}-${item.label}`}>
                                <Text style={{
                                    color: isSelected ? 'red' : 'black', fontSize: 12,
                                }} key={`${item.label}`}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })} */}
            </Flyout>
        </>


    );
};


export default CustomPicker;