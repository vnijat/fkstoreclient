import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import { CompletedIcon, CorporateClientIcon, DeclinedIcon, EmailIcon, IndividualClientIcon, InProgressIcon, PhoneIcon, TotalProjcetsIcon } from '../../assets/icons/clientCardIcons';
import { ClientType } from '../../enums/clientType';
import { IICON } from '../../types/icon';
import { Colors } from '../../utils/colors';
import { parsePhoneNumber } from 'libphonenumber-js';

import { getStyle } from "./styles";
import { ProjectStatus } from '../../types/project';
import ProjectInfo from './components/projectInfo';

interface IClientCard {
    companyName?: string,
    firstName?: string,
    lastName?: string,
    projectsInProgress: number,
    projectsDeclined: number,
    projectsCompleted: number,
    totalProjects: number,
    type: ClientType;
    email?: string | null;
    phone?: string | null;
}

const ClientCard = ({
    companyName,
    firstName,
    lastName,
    projectsCompleted,
    projectsDeclined,
    projectsInProgress,
    totalProjects,
    type,
    phone,
    email
}: IClientCard) => {
    const style = getStyle();
    const infoIconOptions: IICON = {
        size: 22,
        color: Colors.CARD_HEADER_COLOR
    };

    const renderClientIcon = useMemo(() => {
        const options: IICON = {
            size: 50,
            color: Colors.CARD_COLOR
        };
        if (type === ClientType.INDIVIDUAL) {
            return <IndividualClientIcon {...options} />;
        } else {
            return <CorporateClientIcon {...options} />;
        }

    }, [type]);


    const clientInfo = [
        { value: phone && parsePhoneNumber(phone, 'AZ').format('INTERNATIONAL'), icon: <PhoneIcon {...infoIconOptions} /> },
        { value: email?.toLowerCase(), icon: <EmailIcon {...infoIconOptions} /> }
    ];


    return (
        <View style={style.cardContainer}>
            <View style={style.cardContent}>
                <View style={style.cardHeader}>
                    <View style={style.iconContainer}>
                        {renderClientIcon}
                    </View>
                    <View style={style.clientInfo}>
                        <Text style={style.clientInfoText}>
                            {`${firstName} ${lastName}`.toUpperCase()}
                        </Text>
                        {!!companyName?.length && <Text style={style.companyText}>
                            {companyName.toUpperCase()}
                        </Text>}
                    </View>
                </View>
                <View style={style.infoContainer}>
                    {clientInfo.map((info, index) => {
                        if (info?.value) {
                            return (
                                <View style={style.infoContent} key={index}>
                                    <View style={style.infoIcon}>
                                        {info.icon}
                                    </View>
                                    <Text style={style.infoText}>
                                        {info?.value}
                                    </Text>
                                </View>

                            );
                        }
                        else {
                            return null;
                        }

                    })}
                </View>
                <ProjectInfo {...{
                    projectsCompleted,
                    projectsDeclined,
                    projectsInProgress,
                    totalProjects,
                }} />
            </View>
        </View >
    );


};

export default ClientCard;