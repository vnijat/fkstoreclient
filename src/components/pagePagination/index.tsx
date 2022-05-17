import React, { FC, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


interface IPagePAgination {
    page?: number;
    take?: number;
    pageCount?: number;
    setPage?: () => void;

}


export const PagePagination: FC<IPagePAgination> = ({ page, pageCount, take, setPage }) => {
    const renderPages = useMemo(() => {
        let pageArray = [];
        if (pageCount) {
            for (let number = page ?? 0 + 1; number <= 5; number++) {
                pageArray.push(number);
            }
        }
        const onPressPageNumber = (number: number) => {
        };

        return (
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                {pageArray.map((item, index) => {
                    return (<Pressable key={index} onPress={() => onPressPageNumber(index)} style={{ paddingLeft: 3, alignItems: "center", }}>
                        {({ pressed }) =>
                            <Text style={{ color: pressed ? 'yellow' : 'black' }} key={`${index}-${item}`}>
                                {item}
                            </Text>
                        }

                    </Pressable>);
                })}
            </View>
        );
    }, [pageCount, page]);






    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={() => console.log("pressed-angless")}>
                <Icon name="align-left" size={17} color={'black'} />
            </Pressable>
            <Pressable onPress={() => console.log("pressed-angles")}>
                <Icon name="chevron-small-left" size={22} color={'black'} />
            </Pressable>
            {renderPages}
        </View>
    );


};