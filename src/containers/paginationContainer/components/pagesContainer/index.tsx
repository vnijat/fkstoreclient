import React, {useMemo} from "react";
import {FlatList, View} from "react-native";
import HELP from "../../../../services/helpers";
import PageButton from "../pageButton";
import {getStyle} from "./styles";



interface IPagesContainer {
    pageCount: number;
    currentPage: number;
    setNewPage: (value: number) => void;
}



const PagesContainer = ({pageCount, currentPage, setNewPage}: IPagesContainer) => {
    const style = useMemo(() => getStyle(), []);
    const pageNumbersArray = useMemo(() => Array.from(Array(pageCount).keys(), (n) => n + 1), [pageCount]);
    // const { sliceStart, sliceEnd } = useMemo(() => HELP.getSlicesForPaginationPage(currentPage, pageCount), [pageCount, currentPage]);
    // const slicedPageNumbers = useMemo(() => pageNumbersArray.slice(sliceStart, sliceEnd), [pageNumbersArray.length, sliceStart, sliceEnd]);
    return (
        <View
            style={style.pageNumbersContainer}>
            <FlatList
                data={pageNumbersArray}
                keyExtractor={item => item.toString()}
                horizontal
                contentContainerStyle={{gap: 3, padding: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}
                renderItem={({item}) => {
                    return (
                        <PageButton value={item} isCurrent={item === currentPage} onPressPageButton={setNewPage} />
                    );
                }}
            />
            {/* {pageNumbersArray.map((page, index) => {
                const isCurrent = page === currentPage;
                return <PageButton key={`${index}`} value={page} isCurrent={isCurrent} onPressPageButton={setNewPage} />;
            })} */}
        </View>
    );

};

export default PagesContainer;