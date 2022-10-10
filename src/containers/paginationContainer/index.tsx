import React, { FC, memo, useMemo } from "react";
import { View } from "react-native";
import { useAppDispatch } from "../../modules/redux/store";
import { Imeta } from "../../types/common/common";
import { PagePagination } from "./components/pagePagination";
import { getStyle } from "./styles";



interface IPaginationContainer {
    meta: Imeta;
    actionFunction: Function;
}


const PaginationContainer = ({ meta, actionFunction }: IPaginationContainer) => {
    const style = getStyle();
    const dispatch = useAppDispatch();

    const onPressNext = (data: Imeta) => {
        dispatch(actionFunction(data));
    };


    const onPressPrevious = (data: Imeta) => {
        dispatch(actionFunction(data));
    };


    const onPressToLast = (data: Imeta) => {
        dispatch(actionFunction(data));
    };

    const onPressToFirst = (data: Imeta) => {
        dispatch(actionFunction(data));
    };

    const setPage = (data: Imeta) => {
        dispatch(actionFunction(data));
    };

    const onSelectTakeValue = (data: Imeta) => {
        dispatch(actionFunction(data));
    };


    const renderPagination = useMemo(() => {
        return <PagePagination
            pageCount={meta?.pageCount ?? 0}
            page={meta?.page ?? 0}
            hasPreviousPage={meta?.hasPreviousPage!}
            hasNextPage={meta?.hasNextPage!}
            take={meta?.take ?? 0}
            showedItemCount={meta?.count || 0}
            onPressNext={onPressNext}
            onPressPrevious={onPressPrevious}
            onPressToLast={onPressToLast}
            onPressToFirst={onPressToFirst}
            setPage={setPage}
            onSelectTakeValue={onSelectTakeValue}
        />;
    }, [meta, onPressNext, onPressPrevious, onPressToFirst, setPage, onSelectTakeValue, onPressToLast]);

    return (
        <View style={style.container}  >
            {renderPagination}
        </View>
    );

};

export default memo(PaginationContainer);