import React, { FC, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { useAppDispatch } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import { getStyle } from './styles';

interface IPagePAgination {
    page?: number;
    take?: number;
    pageCount?: number;
    setPage?: () => void;
    hasNextPage: boolean,
    hasPreviousPage: boolean;

}

export const PagePagination: FC<IPagePAgination> = ({ page, pageCount, take, setPage, hasNextPage, hasPreviousPage }) => {
    const dispatch = useAppDispatch();
    const styles = getStyle();
    const pageCountToNumbers = useMemo(() => {
        let pageArray = [];
        if (pageCount) {
            for (let num = 1; num <= pageCount; num++) {
                pageArray.push(num);
            }
        }
        return pageArray;
    }, [pageCount]);


    const onPressPageNumber = (pageNumber: number) => {
        dispatch(setQueryParams({ page: pageNumber }));
    };

    const renderPageNumbers = useMemo(() => {
        if (page && pageCountToNumbers?.length) {
            let diffFromMax = 2;
            let diff = pageCount! - page;
            if (diff <= 2) {
                for (let i = 5; diff >= 0; i--) {
                    diff--;
                    diffFromMax = i;
                }
            }
            const sliceStart = page >= 5 ? (page - diffFromMax) : 0;
            const sliceEnd = page >= 5 ? page + 3 : 5;
            return pageCountToNumbers?.slice(sliceStart, sliceEnd).map((item, index) => {
                const selectedPage = item === page;
                return (<Pressable key={index} onPress={() => onPressPageNumber(Number(item))} style={({ pressed }) => [{ backgroundColor: (pressed || selectedPage) ? Colors.OLD_GOLD : Colors.ALABASTER }, styles.pageButtons]}>
                    <Text style={styles.pageText} key={`${index}-${item}`}>
                        {item}
                    </Text>
                </Pressable>);
            });
        } else {
            return null;
        }
    }, [page, pageCountToNumbers.length, pageCount]);


    const renderPages = useMemo(() => {
        return (
            <View style={{ flexDirection: "row", width: 160, justifyContent: 'center' }}>
                {renderPageNumbers}
            </View>
        );
    }, [pageCountToNumbers.length, page]);


    const onPressAlignLeft = () => {
        const toFirstPage = (page! + 1) - page!;
        dispatch(setQueryParams({ page: toFirstPage }));
    };

    const onPressLeft = () => {
        dispatch(setQueryParams({ page: page! - 1 }));
    };

    const onPressRight = () => {
        dispatch(setQueryParams({ page: page! + 1 }));
    };

    const onPressAlignRight = () => {
        const toLastPage = pageCount;
        dispatch(setQueryParams({ page: toLastPage }));
    };

    const renderLeftButtons = useMemo(() => {
        const iconColor = hasPreviousPage ? Colors.OLD_GOLD : Colors.ALABASTER;
        return (
            <>
                <Pressable onPress={onPressAlignLeft} style={styles.buttonsStyle} disabled={!hasPreviousPage}>
                    <Icon name="align-left" size={17} color={iconColor} />
                </Pressable>
                <Pressable onPress={onPressLeft} style={styles.buttonsStyle} disabled={!hasPreviousPage}>
                    <Icon name="chevron-small-left" size={20} color={iconColor} />
                </Pressable>
            </>
        );
    }, [page, hasPreviousPage]);


    const renderRightButtons = useMemo(() => {
        const iconColor = hasNextPage ? Colors.OLD_GOLD : Colors.ALABASTER;
        return (
            <>
                <Pressable onPress={onPressRight} style={styles.buttonsStyle} disabled={!hasNextPage} >
                    <Icon name="chevron-small-right" size={20} color={iconColor} />
                </Pressable>
                <Pressable onPress={onPressAlignRight} style={styles.buttonsStyle} disabled={!hasNextPage}>
                    <Icon name="align-right" size={17} color={iconColor} />
                </Pressable>
            </>
        );

    }, [page, hasNextPage]);


    return (
        <View style={styles.paginationContainer}>
            {renderLeftButtons}
            {renderPages}
            {renderRightButtons}
        </View>
    );


};