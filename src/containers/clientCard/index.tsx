import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { CorporateClientIcon, EmailIcon, IndividualClientIcon, PhoneIcon, VipIcon } from '../../assets/icons/clientCardIcons';
import { ClientType } from '../../enums/clientType';
import { IICON } from '../../types/icon';
import { Colors } from '../../utils/colors';
import { parsePhoneNumber } from 'libphonenumber-js';

import { getStyle } from "./styles";
import ProjectInfo from './components/projectInfo';
import Icon from 'react-native-vector-icons/Entypo';
import ActionModal from './components/actionModal';
import CustomPressable from '../../components/customPressable';
import { useAppDispatch } from '../../modules/redux/store';
import { useDeleteClientMutation } from '../../modules/api/clients.api';
import { useToast } from 'react-native-rooster';
import HELP from '../../services/helpers';
import { setClientForPost, setIsClientForEdit, setIsShowClientModal } from '../../modules/redux/clientsSlicer';

interface IClientCard {
    id: number,
    companyName?: string,
    firstName?: string,
    lastName?: string,
    projectsInProgress: number,
    projectsDeclined: number,
    projectsCompleted: number,
    totalProjects: number,
    type: ClientType;
    email?: string;
    phone?: string;
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
    email,
    id
}: IClientCard) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const [apiDeleteClient] = useDeleteClientMutation();
    const { addToast } = useToast();

    const infoIconOptions: IICON = {
        size: 22,
        color: Colors.CARD_HEADER_COLOR
    };
    const ClientTypeIconOptions: IICON = {
        size: 50,
        color: Colors.CARD_COLOR
    };

    const IconVip = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <VipIcon {...ClientTypeIconOptions} />
                <Text style={style.iconVipText}>{'VIP'}</Text>
            </View>
        );
    };

    const clientTypeIcon = {
        [ClientType.INDIVIDUAL]: <IndividualClientIcon {...ClientTypeIconOptions} />,
        [ClientType.CORPORATE]: <CorporateClientIcon {...ClientTypeIconOptions} />,
        [ClientType.VIP]: <IconVip />
    };

    const renderClientIcon = useMemo(() => {
        return clientTypeIcon[type];
    }, [type]);

    const clientInfo = [
        { value: phone && parsePhoneNumber(phone, 'AZ').format('INTERNATIONAL'), icon: <PhoneIcon {...infoIconOptions} /> },
        { value: email?.toLowerCase(), icon: <EmailIcon {...infoIconOptions} /> }
    ];

    const onPressEdit = () => {
        dispatch(setIsClientForEdit(true));
        dispatch(setClientForPost({
            id,
            companyName,
            firstName,
            lastName,
            phone: phone || '',
            email: email || '',
            type,
        }));
        dispatch(setIsShowClientModal(true));
    };

    const onPressDelete = async () => {
        try {
            await HELP.alertPromise('do you want to delete Client?', 'you cant recover deleted Client');
            const response = await apiDeleteClient(Number(id));
            await addToast({
                type: 'success',
                message: `${response?.data?.message}`.toUpperCase(),
                title: "Success"
            });
        } catch (erorr) {
            console.log("On delete Client==>>", erorr);
        }

    };

    return (
        <View style={style.cardContainer}>
            <View style={style.actionButton}>
                <ActionModal pressableComponent={<Icon name={'dots-three-vertical'} color={Colors.METALLIC_GOLD} size={18} />
                }>
                    <View style={style.actionContent}>
                        <CustomPressable onPress={onPressEdit} onHoverOpacity style={style.actionItemButton}>
                            <Text style={style.actionItemText} >
                                {'EDIT'}
                            </Text>
                        </CustomPressable>
                        <CustomPressable onPress={onPressDelete} onHoverOpacity style={style.actionItemButton}>
                            <Text style={style.actionItemText} >
                                {'DELETE'}
                            </Text>
                        </CustomPressable>
                    </View>
                </ActionModal>
            </View>
            <View style={style.cardContent}>

                <View style={style.cardHeader}>
                    <View style={style.iconContainer}>
                        {renderClientIcon}
                    </View>
                    <View style={style.clientInfo}>
                        <Text style={style.clientInfoText}>
                            {`${firstName} ${lastName}`.toUpperCase()}
                        </Text>
                        {!!companyName?.length && <Text style={style.companyText} >
                            {companyName.toUpperCase()}
                        </Text>}
                    </View>
                </View>
                <View style={style.infoContainer}>
                    {clientInfo.map((info, index) => {
                        if (info?.value) {
                            return (
                                <View style={style.infoContent} key={`${index}-${info}`}>
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