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
        const ICON_SIZE = 50;
        if (type === ClientType.INDIVIDUAL) {
            return <IndividualClientIcon color={Colors.CARD_COLOR} size={ICON_SIZE} />;
        } else {
            return <CorporateClientIcon color={Colors.CARD_COLOR} size={ICON_SIZE} />;
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
                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: Colors.DEFAULT_TEXT_COLOR, fontWeight: '700' }}>
                            {`${firstName} ${lastName}`.toUpperCase()}
                        </Text>
                        {!!companyName?.length && <Text style={{ fontSize: 12, color: Colors.DARK_GOLDENROD, fontWeight: '700' }}>
                            {companyName.toUpperCase()}
                        </Text>}
                    </View>
                </View>
                <View style={{ flex: 0.6, alignItems: 'flex-start', alignSelf: 'flex-start', paddingTop: 10, marginLeft: 10 }}>
                    {clientInfo.map((info, index) => {
                        if (info?.value) {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 5, alignItems: 'center' }} key={index}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {info.icon}
                                    </View>
                                    <Text style={{ fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR, marginLeft: 5 }}>
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