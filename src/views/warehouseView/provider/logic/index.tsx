import Clipboard from "@react-native-clipboard/clipboard";
import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { useDeleteManyItemsMutation } from "../../../../modules/api/apiSlice";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
import { clearFilters, setFilterByParams, setSelectedWithLabel } from "../../../../modules/redux/filterSlicer";
import { setItemQueryParams } from "../../../../modules/redux/itemQuerySlicer";
import { clearSelectedItems, setIsEditMode, setIsItemForEdit, setIsShowAddEditModal, setIsShowItemModal, setItemForPost, setItemIdForFullResponse } from "../../../../modules/redux/itemsSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import { Imeta } from "../../../../types/common/common";
import { FilterParamskey, Item } from "../../../../types/item";





function WareHouseLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDelete] = useDeleteManyItemsMutation();
    function paginationHandler(data: Imeta) {
        dispatch(setItemQueryParams(data));
    };

    function onPressRowItem(data: Item) {
        dispatch(setIsShowItemModal(true));
        dispatch(setItemIdForFullResponse(data?.id!));
    }


    function onResetTable() {
        dispatch(resetTable({ tableName: 'item' }));
    }


    function setNewTableConfig(data: ITableDataConfig<Item>[]) {
        dispatch(setNewTableConfigs({ tableName: 'item', data }));
    }

    function handleFilterParamSelect(selected: { id: number; label: string; parent: FilterParamskey; }) {
        dispatch(setSelectedWithLabel(selected));
        dispatch(setFilterByParams({ id: selected.id, parent: selected.parent }));
    }

    function handleSearchValueChange(value: string) {
        dispatch(setItemQueryParams({ search: value, page: 1 }));

    }


    function handleCopyBarcode(data: Item) {
        Clipboard.setString(data.barcode);
        HELP.showToast('success', 'barcode Copied to Clipboard', `${data.barcode}`);
    }

    async function handleDeleteWareHouseItems(itemIds: number[], lang?: ReturnType<typeof UseLanguage>) {
        try {
            const response = await apiDelete(itemIds);
            if (response.error) {
                throw response.error;
            }
            if (lang) {
                HELP.showToast('success', `${lang?.alert.onDelete.product['message']}`.toUpperCase(), `${lang?.alert.onDelete.product['title']}`.toUpperCase());
            }
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }
    }

    function handleClearFilters() {
        dispatch(clearFilters());
        dispatch(setItemQueryParams({ search: '', page: 1 }));
    }

    function onPressEdit(data: Item) {
        const itemForPost = HELP.modifyItemForEdit(data, data.id);
        dispatch(setIsItemForEdit(true));
        dispatch(setItemForPost(itemForPost));
        dispatch(setIsShowAddEditModal(true));
        dispatch(setIsEditMode(false));
    }

    function handleCreateNew() {
        dispatch(setIsShowAddEditModal(true));
    }


    function handleOutofstockSelect(value: boolean) {
        dispatch(setItemQueryParams({ outOfStock: value, page: 1 }));
    }


    return {
        paginationHandler,
        onPressRowItem,
        onResetTable,
        setNewTableConfig,
        onPressEdit,
        handleFilterParamSelect,
        handleSearchValueChange,
        handleClearFilters,
        handleCreateNew,
        handleOutofstockSelect,
        handleDeleteWareHouseItems,
        handleCopyBarcode
    };
}

export default WareHouseLogicProvider;