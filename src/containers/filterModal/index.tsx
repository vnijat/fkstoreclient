import { forwardRef, Ref } from "react";
import { memo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Flyout } from "react-native-windows";
import CustomPressable from "../../components/customPressable";
import { Colors } from "../../utils/colors";

interface IFilterModal {
    onClose: () => void;
    isOpen: boolean;
}



const FilterModal = forwardRef(({ onClose, isOpen }: IFilterModal, ref: Ref<View>) => {
    const onDissmiss = () => {
        onClose();
    };
    const [showContent, setShowContent] = useState(false);


    const toggleShowContent = () => {
        setShowContent(!showContent);
    };


    return (
        <Flyout
            isOpen={isOpen}
            onDismiss={onDissmiss}
            target={ref?.current}
            showMode={'standard'}
            placement={'right-edge-aligned-top'}
        >
            <View style={{ flex: 1, backgroundColor: Colors.CULTURED, width: 300, minHeight: 500, maxHeight: 600 }}>
                <ScrollView style={{ flex: 1 }}>
                    <CustomPressable style={{ width: '100%', height: 30, backgroundColor: 'blue' }} onPress={toggleShowContent}>
                        <Text>
                            {'Toggle'}
                        </Text>
                    </CustomPressable>
                    {showContent && <View style={{ width: '100%', paddingVertical: 10, backgroundColor: Colors.CARD_HEADER_COLOR, paddingHorizontal: 5, borderRadius: 2 }}>
                        <Text>
                            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}
                        </Text>
                    </View>}
                </ScrollView>
            </View>
        </Flyout>
    );

});

export default memo(FilterModal);