import React, { FC, memo, useCallback, useMemo } from "react";
import { View } from "react-native";
import { useAppDispatch } from "../../modules/redux/store";
import { Imeta } from "../../types/common/common";
import { PagePagination } from "./components/pagePagination";
import { getStyle } from "./styles";



interface IPaginationContainer {
    meta: Imeta;
    paginationHandler: (data: Imeta) => void;
}


const PaginationContainer = ({ meta, paginationHandler }: IPaginationContainer) => {
    const style = getStyle();

    const onPressNext = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);


    const onPressPrevious = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);


    const onPressToLast = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);

    const onPressToFirst = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);

    const setPage = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);

    const onSelectTakeValue = useCallback((data: Imeta) => {
        paginationHandler(data);
    }, []);


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