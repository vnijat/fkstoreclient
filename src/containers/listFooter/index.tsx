import React, { FC, useMemo } from "react";
import { View } from "react-native";
import { PagePagination } from "../../components/pagePagination";
import { Imeta } from "../../types/ItemsQuery";
import { getStyle } from "./styles";



interface ListFooterProps {
    meta?: Imeta;
    totalItems: number;
}


const ListFooter: FC<ListFooterProps> = ({ meta, totalItems }) => {
    const style = getStyle();


    const renderPageCount = useMemo(() => {
        return <PagePagination
            pageCount={meta?.pageCount ?? 0}
            page={meta?.page ?? 0}
            hasPreviousPage={meta?.hasPreviousPage!}
            hasNextPage={meta?.hasNextPage!}
            take={meta?.take ?? 0}
            showedItemCount={meta?.itemCount || 0}
            totalItems={totalItems} />;
    }, [meta, totalItems,]);

    return (
        <View style={style.container}  >
            {renderPageCount}
        </View>
    );

};

export default ListFooter;