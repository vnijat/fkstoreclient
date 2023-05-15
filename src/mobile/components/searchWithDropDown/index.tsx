import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { InputItem } from "../../../components/inputItem";
import { Colors } from "../../../utils/colors";


interface ISearchWithDropDown {
    children?: React.ReactNode;
    getSearchValue: (value: string) => void;
    hideDropDwon?: boolean;
    searchPlaceHolder?: string;
}



const SearchWithDropDown = ({ children, getSearchValue, hideDropDwon, searchPlaceHolder }: ISearchWithDropDown) => {
    const [showDropDown, setShowDropDown] = useState(false);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        hideDropDwon && setShowDropDown(false);
    }, [hideDropDwon]);

    useEffect(() => {
        timeoutId = setTimeout(() => {
            getSearchValue && getSearchValue(searchValue);
        }, 500);
        return () => {
            clearInterval(timeoutId as ReturnType<typeof setTimeout>);
        };
    }, [searchValue]);


    const handleSearch = (value: any) => {
        if (value.length) {
            setShowDropDown(true);
        } else {
            showDropDown && setShowDropDown(false);
        }
        setSearchValue(value);
    };

    const handleInputOnblur = () => {
        setSearchValue('');
        setShowDropDown(false);
    };

    return (
        <View style={{ flexGrow: 1 }}>
            <InputItem
                setValue={handleSearch}
                inputValue={searchValue}
                // isSearch
                height={30}
                placeHolder={searchPlaceHolder}
                placeholderTextColor={Colors.DEFAULT_TEXT_COLOR}
                onBlur={handleInputOnblur}
            />
            {showDropDown && children && < View style={{ position: 'absolute', width: '97%', height: 250, backgroundColor: Colors.CARD_COLOR, elevation: 3, zIndex: 3, top: 40, alignSelf: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' }}>
                {children}
            </View>}
        </View >
    );
};

export default SearchWithDropDown;