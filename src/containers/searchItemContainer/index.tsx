import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {ScrollView, View, Text, ActivityIndicator} from "react-native";
import {Flyout} from "react-native-windows";
import {Item} from "../../types/item";
import {getStyle} from "./styles";
import {InputItem} from "../../components/inputItem";
import SearchResultItem from "./components/searchResultItem";
import {Colors} from "../../utils/colors";



interface ISearchItemContainer {
    getSelectedItem: (data: Item) => void;
    searchQueryFunction: (searchValue: string, options: {skip: boolean;}) => {
        data: Item[] | undefined;
        isLoading: boolean;
        isUninitialized: boolean;
    };
}


const SearchItemContainer = ({searchQueryFunction, getSelectedItem}: ISearchItemContainer) => {
    const style = useMemo(() => getStyle(), []);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const [value, setSearchValue] = useState('');
    const [skip, setSkip] = useState(true);
    const [isShowContent, setShowContent] = useState(false);
    const searchRef = useRef(null);
    const {data, isLoading, isUninitialized} = searchQueryFunction(value, {
        skip,
    });
    const searchContentHeight = useMemo(
        () => data?.length &&
            ((data?.length >= 5)
                ? 150
                : (data?.length * 45)), [data?.length]);


    useEffect(() => {
        if (data?.length) {
            data.length > 1 && setShowContent(true);
            if (data?.length === 1) {
                getSelectedItem(data[0]);
            }
        }
    }, [data?.length]);

    useEffect(() => {
        if (!!value.trim().length) {
            timeoutId = setTimeout(() => {
                setSkip(false);
            }, 300);
        }
        return () => {
            setShowContent(false);
            setSkip(true);
            clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
        };
    }, [value]);


    const handleSearch = (text: string) => {
        setSearchValue(text?.trim());
        setSkip(true);
        if (text?.trim() === '') {
            setShowContent(false);
        }
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

    const onSelectItem = (item: Item) => {
        getSelectedItem(item);
        setShowContent(false);
    };

    const handleContentDissmiss = () => {
        setShowContent(false);
        setSkip(true);
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

    return (
        <>
            <View style={style.searchContainer}
                ref={searchRef}
            >
                <InputItem
                    inputValue={value}
                    setValue={(value) => handleSearch(value as string)}
                    isSearch
                    inputTitle={`Search by Item Name or Barcode`}
                    titleColor={Colors.METALLIC_GOLD}
                    height={30}
                    maxLength={60}
                />
                {!isUninitialized && <View style={style.resultInfoContainer}>
                    {
                        (isLoading) ?
                            <ActivityIndicator size={'small'} color={Colors.METALLIC_GOLD} />
                            :
                            <Text style={style.resultInfoText}>
                                {data?.length ? `Found:${data.length}` : 'Not Found :('}
                            </Text>
                    }

                </View>}
            </View>
            <Flyout
                target={searchRef.current}
                isOpen={isShowContent}
                onDismiss={handleContentDissmiss}
                placement={'bottom'}
                showMode={'transient'}
            >
                <View style={[style.floatResultsContainer, {height: searchContentHeight, }]}>
                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingVertical: 5}}>
                        {!!data?.length && data?.map((item, index) => {
                            return <SearchResultItem data={item} onSelect={onSelectItem} key={`${index}-searchItem`} />;
                        })}
                    </ScrollView>
                </View>
            </Flyout>
        </>
    );

};



export default SearchItemContainer;