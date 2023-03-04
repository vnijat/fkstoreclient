import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import SimpleTable from '../../containers/simpleTable';
import { IContextMenuButton, ICustomColumn } from '../../containers/simpleTable/types';
import { useGetProjectsQuery } from '../../modules/api/projects.api';
import { setProjectsQueryParams } from '../../modules/redux/projectQuerySlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { Project } from '../../types/project';
import { Colors } from '../../utils/colors';
import ClientInfoModal from './components/clientInfoModal';
import ProjectClientColumn from './components/customColumns/clientColumn';
import ProjectOrdersColumn from './components/customColumns/projectOrdersColumn';
import ProjectStatusColumn from './components/customColumns/statusColumn';
import ProjectAddEditModal from './components/projectAddEditModal';
import ProjectList from './components/projectList';
import ProjectOrdersInfoModal from './components/projectOrdersInfoModal';
import ProjectSearch from './components/projectSearch';
import ProjectDataProvider from './provider/data';
import ProjectLogicProvider from './provider/logic';
import { getStyle } from './styles';


interface IProjectsView {
    navigation: StackNavigationProp<{}>;
}

const ProjectsView = ({ navigation }: IProjectsView) => {
    const logicProvider = ProjectLogicProvider();
    const dataProvider = ProjectDataProvider();
    const {
        handlePagination,
        handleNewTableData,
        handleResetTableConfig,
        handleDeleteProject,
        handleOnPressRow,
        handleOnPressClient,
        handleOnPressOrdersCounts
    } = logicProvider;
    const {
        projectsQueryParams,
        queryData: {
            data: queryData,
            isLoading
        },
        projectTableDataConfig
    } = dataProvider;
    const style = getStyle();


    const contextMenuButtons: IContextMenuButton<Project>[] = [
        { title: 'Delete', onPress: (data) => handleDeleteProject(data) }
    ];




    const customColumns: ICustomColumn<Project> = {
        status: ({ data }) => <ProjectStatusColumn data={data} {...{ dataProvider, logicProvider }} />,
        client: ({ data }) => <ProjectClientColumn data={data} onPressClient={handleOnPressClient} />,
        order: ({ data }) => <ProjectOrdersColumn data={data} handleOnPressOrdersCounts={handleOnPressOrdersCounts} />
    };


    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.05 }} />
            <View style={style.container}>
                <ProjectOrdersInfoModal {...{ dataProvider, logicProvider }} />
                <ProjectAddEditModal />
                <ClientInfoModal />
                <View style={{ flex: 0.2 }}>
                    <ProjectSearch {...{ dataProvider, logicProvider }} />
                </View>
                <View style={{ flex: 0.7 }}>
                    {/* <ProjectList data={queryData?.projects!} /> */}
                    <SimpleTable
                        tableData={queryData?.projects ?? []}
                        tableDataConfig={projectTableDataConfig}
                        getNewTableConfig={handleNewTableData}
                        onResetTable={handleResetTableConfig}
                        contextMenuButtons={contextMenuButtons}
                        onPressRow={handleOnPressRow}
                        customColumns={customColumns}

                    />
                </View>
                <View style={{ flex: 0.1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                    <PaginationContainer paginationHandler={handlePagination} meta={queryData?.meta!} />
                </View>
            </View>
        </View>

    );
};
export default ProjectsView;