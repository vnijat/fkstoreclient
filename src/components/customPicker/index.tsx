import React, { FC, useEffect, useRef, useState, } from 'react';
import { Pressable, Text, View, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Flyout } from 'react-native-windows';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import CustomPressable from '../customPressable';
import { getStyle } from './style';


interface ICustomPicker {
    data: Array<{ id: number; label: string; }>;
    title: string;
    onSelect: (selected: { id: number; label: string; parent: FilterParamskey; }) => void;
    selectedIds: number[];
    parent: FilterParamskey;
}

const CustomPicker = ({ data, title, onSelect, selectedIds, parent }: ICustomPicker) => {
    const style = getStyle();
    const [isShowContent, setShowContent] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const buttonRef = useRef(null);
    const onPress = () => {
        setShowContent(true);
    };

    const onDismiss = () => {
        setShowContent(false);
    };


    return (
        <>
            <View>
                {!!selectedIds.length && <View style={{ position: 'absolute', width: 18, height: 18, borderRadius: 100, backgroundColor: Colors.OLD_GOLD, justifyContent: 'center', alignItems: 'center', top: -5, right: -1, zIndex: 2 }}>
                    <Text style={{ color: Colors.FLORAL_WHITE, fontSize: 8, textAlign: 'center', fontWeight: '700' }}>
                        {selectedIds.length}
                    </Text>
                </View>}
                <CustomPressable
                    style={{ width: 90, height: 30, margin: 3, padding: 5, flexDirection: 'row', alignItems: 'center', borderRadius: 1, borderWidth: 1, borderColor: Colors.OLD_GOLD, justifyContent: 'space-between' }}
                    ref={buttonRef}
                    onPress={onPress}
                    key={title}
                >
                    <Text style={{ color: Colors.OLD_GOLD, fontSize: 14 }}>
                        {title || ''}
                    </Text>
                    <Icon name="chevron-small-down" size={17} color={Colors.OLD_GOLD} />
                </CustomPressable>
            </View>
            <Flyout
                target={buttonRef.current}
                placement={'bottom'}
                isOpen={isShowContent}
                onDismiss={onDismiss}
                showMode={'transient'}

            >
                <View style={{ flex: 1, maxHeight: 100 }}>
                    <FlatList
                        style={{ flex: 1, backgroundColor: Colors.FLORAL_WHITE, borderRadius: 3 }}
                        contentContainerStyle={{ padding: 1 }}
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            const { id, label } = item;
                            const isSelected = selectedIds?.includes(id);
                            return (
                                <Pressable style={{ height: 30, width: 100, margin: 1, justifyContent: 'center' }} onPress={() => onSelect({ id, label, parent })} key={`${index}-${label}`}>
                                    <Text style={{
                                        color: isSelected ? 'red' : 'black', fontSize: 12,
                                    }} key={`${label}`}>
                                        {label}
                                    </Text>
                                </Pressable>);
                        }}

                    />
                </View>
            </Flyout>
        </>


    );
};


export default CustomPicker;