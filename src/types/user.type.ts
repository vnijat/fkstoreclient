export interface User {
    id: number;

    dateOfBirth?: Date;

    gender?: GenderType;

    avatarUrl?: string;

    firstName?: string;

    lastName?: string;

    phoneNumber?: string;

    role?: Role;

    email: string;

}

export enum GenderType {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}


