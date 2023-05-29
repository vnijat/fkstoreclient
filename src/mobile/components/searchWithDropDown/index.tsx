import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import CustomPressable from "../../../components/customPressable";
import { InputItem } from "../../../components/inputItem";
import { Colors } from "../../../utils/colors";
import { getStyle } from "./styles";


interface ISearchWithDropDown<T> {
    getSearchValue: (value: string) => void;
    searchPlaceHolder?: string;
    searchResultData: T[];
    searchResultListItem: ({ data }: { data: T; }) => JSX.Element;
    onPressItem: (data: T) => void;
    isDataLoading: boolean;
}



const SearchWithDropDown = <T extends { [key: string]: any; }>({ getSearchValue, searchPlaceHolder, searchResultData, searchResultListItem, onPressItem, isDataLoading }: ISearchWithDropDown<T>) => {
    const style = useMemo(() => getStyle(), []);
    const [showDropDown, setShowDropDown] = useState(false);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const [searchValue, setSearchValue] = useState('');
    const SearchResultItem = searchResultListItem;


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

    const handleOnpressItem = (data: T) => {
        setShowDropDown(false);
        onPressItem(data);
    };


    return (
        <View style={{ flexGrow: 1 }}>
            <InputItem
                setValue={handleSearch}
                inputValue={searchValue}
                height={30}
                placeHolder={searchPlaceHolder}
                placeholderTextColor={Colors.DEFAULT_TEXT_COLOR}
                onBlur={handleInputOnblur}
            />
            {showDropDown &&
                < View style={style.dropDownContainer}>
                    <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingVertical: 5 }}>
                        {
                            isDataLoading
                                ? <ActivityIndicator color={Colors.METALLIC_GOLD} size={'small'} />
                                :
                                !!searchResultData?.length && searchResultData.map((data, index) => {
                                    return (
                                        <CustomPressable onPress={() => handleOnpressItem(data)} android_ripple={{ color: Colors.METALLIC_GOLD }} key={`${index}-result`}>
                                            <SearchResultItem data={data} key={`${index}`} />
                                        </CustomPressable>
                                    );
                                })

                        }
                    </ScrollView>
                </View>
            }
        </View>
    );
};

export default SearchWithDropDown;