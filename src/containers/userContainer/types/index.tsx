interface IMenuItem {
    onPress: () => void;
    icon: JSX.Element;
    title: string;
}


export type {IMenuItem};