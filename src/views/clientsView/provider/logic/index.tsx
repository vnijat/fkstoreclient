import { IsingelSelectData } from "../../../../containers/customPicker";
import { ClientSort } from "../../../../enums/clientSort";
import { ClientType } from "../../../../enums/clientType";
import { Order } from "../../../../enums/order.enum";
import { setClientsQueryParams } from "../../../../modules/redux/clientsQuerySlicer";
import { setIsShowClientModal } from "../../../../modules/redux/clientsSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { Imeta } from "../../../../types/common/common";

function ClientLogicProvider() {
    const dispatch = useAppDispatch();


    function handlePagination(data: Imeta) {
        dispatch(setClientsQueryParams(data));
    }

    function handleOnPressAddClient() {
        dispatch(setIsShowClientModal(true));

    }

    function handleSearchInput(value: string) {
        dispatch(setClientsQueryParams({ page: 1, search: text.trim() }));

    }

    function handleClientSortBy(value: IsingelSelectData) {
        dispatch(setClientsQueryParams({ page: 1, sort: value.value as ClientSort }));

    }
    function handleClientTypeSort(value: IsingelSelectData) {
        dispatch(setClientsQueryParams({ page: 1, type: value?.value as ClientType & 'all' }));
    }

    function handleClientSortByOrder(data: Order) {
        dispatch(setClientsQueryParams({ page: 1, order: data }));

    }

    return {
        handlePagination,
        handleOnPressAddClient,
        handleSearchInput,
        handleClientSortBy,
        handleClientTypeSort,
        handleClientSortByOrder
    };
}


export default ClientLogicProvider;