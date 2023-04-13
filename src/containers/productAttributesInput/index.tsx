import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/redux/store";
import { ProductAttributesDto } from "../../types/item";




interface IProudctsAttributesInput {

}


const ProductsAttributesInput = ({ }: IProudctsAttributesInput) => {
    const isProductForEdit = useSelector((state: RootState) => state.itemsSlicer.isItemForEdit);
    const productAttributesData = useSelector((state: RootState) => state.itemsSlicer.itemforPost.properties);
    const [inputsData, setInputsData] = useState<ProductAttributesDto>();






    return (
        <View>
         

        </View>
    );

};