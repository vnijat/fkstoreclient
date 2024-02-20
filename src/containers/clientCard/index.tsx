import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {EmailIcon, PhoneIcon} from '../../assets/icons/clientCardIcons';
import {ClientType} from '../../enums/clientType';
import {IICON} from '../../types/icon';
import {Colors} from '../../utils/colors';
import {parsePhoneNumber} from 'libphonenumber-js';
import {getStyle} from "./styles";
import ProjectInfo from './components/projectInfo';
import Icon from 'react-native-vector-icons/Entypo';
import ActionModal from './components/actionModal';
import CustomPressable from '../../components/customPressable';
import {RootState, useAppDispatch} from '../../modules/redux/store';
import {useDeleteClientMutation} from '../../modules/api/clients.api';
import HELP from '../../services/helpers';
import {setClientForPost, setIsClientForEdit, setIsShowClientModal} from '../../modules/redux/clientsSlicer';
import {useSelector} from 'react-redux';
import {Client} from '../../types/client';

interface IClientCard {
    data: Client;
    withAction?: boolean;
}

const ClientCard = ({
    data,
    withAction = true
}: IClientCard) => {
    const {
        phone = '',
        email,
        type,
        firstName,
        lastName,
        companyName,
        id,
        projectsCompleted,
        projectsDeclined,
        projectsInProgress,
        totalProjects,
    } = data;
    const style = getStyle();
    const isClientModalOpen = useSelector((state: RootState) => state.clientSlicer.isShowClientModal);
    const dispatch = useAppDispatch();
    const [apiDeleteClient] = useDeleteClientMutation();

    const infoIconOptions: IICON = {
        size: 18,
        color: Colors.METALLIC_GOLD
    };

    const renderClientIcon = useMemo(() => type && HELP.getClientTypeIcons(type), [type]);

    const clientInfo = [
        {value: phone && parsePhoneNumber(phone, 'AZ').format('INTERNATIONAL'), icon: <PhoneIcon {...infoIconOptions} />},
        {value: email?.toLowerCase(), icon: <EmailIcon {...infoIconOptions} />}
    ];

    const onPressEdit = () => {
        dispatch(setIsClientForEdit(true));
        dispatch(setClientForPost({
            id,
            companyName: companyName ?? '',
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            phone: phone ?? '',
            email: email ?? '',
            type,
        }));
        dispatch(setIsShowClientModal(true));
    };

    const onPressDelete = async () => {
        try {
            const response = await apiDeleteClient(Number(id));
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `${response?.data?.message}`.toUpperCase(), "Deleted");
        } catch (erorr) {
            HELP.alertError(erorr);
        }

    };

    return (
        <View style={style.cardContainer}>
            {withAction && <View style={style.actionButton}>
                <ActionModal pressableComponent={<Icon name={'dots-three-vertical'} color={Colors.METALLIC_GOLD} size={18} />
                }>
                    <View style={style.actionContent}>
                        <CustomPressable onPress={onPressEdit} onHoverOpacity style={style.actionItemButton} disabled={isClientModalOpen}>
                            <Text style={style.actionItemText} >
                                {'EDIT'}
                            </Text>
                        </CustomPressable>
                        <CustomPressable onPress={onPressDelete} onHoverOpacity style={style.actionItemButton} disabled={isClientModalOpen}>
                            <Text style={style.actionItemText} >
                                {'DELETE'}
                            </Text>
                        </CustomPressable>
                    </View>
                </ActionModal>
            </View>}
            <View style={style.cardContent}>

                <View style={style.cardHeader}>
                    <View style={style.iconContainer} tooltip={type} >
                        {renderClientIcon}
                    </View>
                    <View style={style.clientInfo}>
                        <Text style={style.clientInfoText} selectable>
                            {`${firstName} ${lastName}`.toUpperCase()}
                        </Text>
                        {!!companyName?.length && <Text style={style.companyText} selectable>
                            {companyName.toUpperCase()}
                        </Text>}
                    </View>
                </View>
                <ProjectInfo {...{
                    projectsCompleted,
                    projectsDeclined,
                    projectsInProgress,
                    totalProjects,
                }} />
                <View style={style.contactsInfoTitleContainer}>
                    {(phone || email) && < Text style={style.contactsInfoTitleText}>
                        {'CONTACTS'}
                    </Text>}
                </View>
                <View style={style.infoContainer}>
                    {clientInfo.map((info, index) => {
                        if (info?.value) {
                            return (
                                <View style={style.infoContent} key={`${index}-${info}`} >
                                    <View style={style.infoIcon}>
                                        {info.icon}
                                    </View>
                                    <Text style={style.infoText} selectable>
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

            </View>
        </View >
    );


};

export default ClientCard;