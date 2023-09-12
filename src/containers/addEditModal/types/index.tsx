interface ICustomComponent {
    [key: string]: ({}: {disableForEdit: boolean;}) => JSX.Element;
}


export type {ICustomComponent};