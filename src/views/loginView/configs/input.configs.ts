import {IsingelSelectData} from "../../../containers/customPicker";
import {Role} from "../../../enums/userRole";

export interface LoginInputsConfig {
    parentDtoKey?: string;
    dtoKey: string;
    placeHolder: string;
    isSecureText: boolean;
    selectableData?: IsingelSelectData[];
    hintText?: string;
}

const loginInputs: LoginInputsConfig[] = [
    {
        dtoKey: 'email',
        placeHolder: 'Email',
        isSecureText: false
    },
    {
        dtoKey: 'password',
        placeHolder: 'Password',
        isSecureText: true
    }
];

const createUserInputs: LoginInputsConfig[] = [
    {
        dtoKey: 'firstName',
        placeHolder: 'First Name',
        isSecureText: false,
        parentDtoKey: 'user',
    },
    {
        dtoKey: 'lastName',
        placeHolder: 'Last Name',
        isSecureText: false,
        parentDtoKey: 'user',
    },
    {
        dtoKey: 'email',
        placeHolder: 'Email',
        isSecureText: false,
        parentDtoKey: 'user',
    },
    {
        dtoKey: 'password',
        placeHolder: 'Password',
        isSecureText: true,
        parentDtoKey: 'user',
    },
    {
        dtoKey: 'role',
        placeHolder: 'Role',
        isSecureText: false,
        selectableData: [{
            label: 'MANAGER',
            value: Role.MANAGER
        }, {
            label: 'STAFF',
            value: Role.STAFF
        },
        {
            label: 'SUPER ADMIN',
            value: Role.SUPER_ADMIN
        }
        ]
    },
    {
        dtoKey: 'masterCode',
        placeHolder: 'Master Code',
        isSecureText: true,
        hintText: 'GET MASTER CODE FROM ADMINISTRATOR'
    }

];

export {
    loginInputs,
    createUserInputs,
};