import {View} from "react-native";
import {useMemo} from "react";
import {getStyle} from "./styles";
import UserContainer from "../../../../containers/userContainer";



const HeaderComponent = () => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.container}>
            <UserContainer />
        </View>
    );

};

export default HeaderComponent;