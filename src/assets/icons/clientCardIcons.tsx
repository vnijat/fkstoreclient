import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { IICON } from "../../types/icon";

export const IndividualClientIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="user" size={size} color={color} />
    );
};

export const CorporateClientIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="briefcase" size={size} color={color} />
    );
};

export const EmailIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="email" size={size} color={color} />
    );
};


export const PhoneIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="mobile" size={size} color={color} />
    );
};


export const DeclinedIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="cross" size={size} color={color} />
    );
};

export const InProgressIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="cycle" size={size} color={color} />
    );
};

export const CompletedIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="check" size={size} color={color} />
    );
};

export const TotalProjcetsIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="tools" size={size} color={color} />
    );
};

export const ShowIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="eye" size={size} color={color} />
    );
};

export const VipIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="star" size={size} color={color} />
    );
};





