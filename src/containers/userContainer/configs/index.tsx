import {GenderType, User} from "../../../types/user.type";
import {IsingelSelectData} from "../../customPicker";

export interface AccountInputConfig<T> {
    placeHolder: string;
    dtoKey: keyof T;
    isEditable?: boolean;
    selectableData?: IsingelSelectData[];
    isDate?: boolean;
}



const accountInputConfigs: AccountInputConfig<User>[] = [
    {
        placeHolder: 'First Name',
        dtoKey: 'firstName',
    },
    {
        placeHolder: 'Last Name',
        dtoKey: 'lastName',
    },
    {
        placeHolder: 'Email',
        dtoKey: 'email',
        isEditable: false
    },
    {
        placeHolder: 'Phone',
        dtoKey: 'phoneNumber'
    },
    {
        placeHolder: 'Gender',
        dtoKey: 'gender',
        selectableData: [{
            value: GenderType.MALE,
            label: 'MALE'
        },
        {
            value: GenderType.FEMALE,
            label: 'FEMALE'
        },
        {
            value: GenderType.OTHER,
            label: 'OTHER'
        }
        ],

    },
    {
        placeHolder: 'Date of Birth',
        dtoKey: 'dateOfBirth',
        isDate: true
    }
];


export {accountInputConfigs};

