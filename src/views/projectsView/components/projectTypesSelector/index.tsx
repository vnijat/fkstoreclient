import {useMemo} from "react";
import {getStyle} from "./styles";
import {View} from "react-native";
import {Text} from "react-native-windows";



interface IProjecTypeSelector {


}

const ProjectTypeSelector = ({}: IProjecTypeSelector) => {
    const style = useMemo(() => getStyle(), []);

    return (
        <View style={{}}>
            <Text>
                {'asdasd'}
            </Text>
        </View>
    );
};
export default ProjectTypeSelector;