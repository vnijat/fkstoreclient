import {View} from "react-native";
import PaginationContainer from "../../../containers/paginationContainer";
import {Imeta} from "../../../types/common/common";
import {Colors} from "../../../utils/colors";


interface IListFooterMobile {
    meta?: Imeta;
    paginationHandler: (data: Imeta) => void;
}
const ListFooterMobile = ({paginationHandler, meta}: IListFooterMobile) => {


    return (
        <View style={{backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: "center", height: 100, padding: 5, borderRadius: 3, }}>
            {meta && <PaginationContainer
                meta={meta}
                paginationHandler={paginationHandler}
            />}
        </View>
    );
};

export default ListFooterMobile;