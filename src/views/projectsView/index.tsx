import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { useGetProjectsQuery } from '../../modules/api/projects.api';
import { setProjectsQueryParams } from '../../modules/redux/projectQuerySlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import ClientInfoModal from './components/clientInfoModal';
import ProjectList from './components/projectList';
import ProjectSearch from './components/projectSearch';
import { getStyle } from './styles';


interface IProjectsView {
    navigation: StackNavigationProp<{}>;
}

const ProjectsView = ({ navigation }: IProjectsView) => {
    const style = getStyle();
    const projectsQueryParams = useSelector((state: RootState) => state.projectQuery);
    const { data: queryData, error: fetchError, isLoading } = useGetProjectsQuery(projectsQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            error,
            isLoading: isUninitialized ? true : isLoading,
        }
        ),
        pollingInterval: 5000
    });

    return (
        <View style={style.container}>
            <ClientInfoModal/>
            <View style={{ flex: 1, paddingLeft: 90, paddingRight: 15, paddingVertical: 30 }}>
                <View style={{ flex: 0.2 }}>
                    <ProjectSearch searchValue={projectsQueryParams.search ?? ''} />
                </View>
                <View style={{ flex: 0.7 }}>
                    <ProjectList data={queryData?.projects!} />
                </View>
                <View style={{ flex: 0.1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                    <PaginationContainer actionFunction={setProjectsQueryParams} meta={queryData?.meta} />
                </View>
            </View>
        </View>
    );
};
export default ProjectsView;