import {useSelector} from "react-redux";
import {projectInputConfig} from "../../../../configs/projectInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import {useGetClientForPickerQuery} from "../../../../modules/api/clients.api";
import {useAddProjectMutation, useEditProjectMutation} from "../../../../modules/api/projects.api";
import {clearProjectForPost, setIsProjectForEdit, setIsShowProjectAddEditModal, setProjectDataForPost} from "../../../../modules/redux/projectSlicer";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import ProjectTypeSelector from "../projectTypesSelector";
import ProjectLogicProvider from "../../provider/logic";
import ProjectDataProvider from "../../provider/data";



interface IProjectAddEditModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectAddEditModal = ({dataProvider, logicProvider}: IProjectAddEditModal) => {
    const dispatch = useAppDispatch();
    const {data: selectableData} = useGetClientForPickerQuery(undefined, {
        selectFromResult: ({data}) => ({data}),
    });
    const isProjectForEdit = useSelector((state: RootState) => state.projectSlicer.isProjectForEdit);
    const isShowProjectAddEditModal = useSelector((state: RootState) => state.projectSlicer.isShowProjectAddEditModal);
    const [apiAddProject] = useAddProjectMutation();
    const [apiEditProject] = useEditProjectMutation();
    const projectDataForPost = useSelector((state: RootState) => state.projectSlicer.projectDataForPost);
    const setDataForRequest = (data: {[key: string]: string | number;}) => {
        dispatch(setProjectDataForPost(data));
    };

    const clearDataForRequest = () => {
        dispatch(clearProjectForPost());
    };
    const setIsDataForEdit = (data: boolean) => {
        dispatch(setIsProjectForEdit(data));
    };

    const setIsShowModal = (data: boolean) => {
        dispatch(setIsShowProjectAddEditModal(data));
    };

    const customComponents = {
        type: ({disableForEdit}: {disableForEdit: boolean;}) => <ProjectTypeSelector {...{setDataForRequest, projectDataForPost, disableForEdit}} />
    };
    return (
        <>
            {isShowProjectAddEditModal && <AddEditModal
                customComponent={customComponents}
                clearDataForRequest={clearDataForRequest}
                isShowModal={isShowProjectAddEditModal}
                setDataForRequest={setDataForRequest}
                dataForRequest={projectDataForPost}
                setIsDataForEdit={setIsDataForEdit}
                inputConfigs={projectInputConfig}
                isDataForEdit={isProjectForEdit}
                setIsShowModal={setIsShowModal}
                selectableData={selectableData}
                apiUpdateData={apiEditProject}
                apiPostData={apiAddProject}
                isPickerSearchEnabled
                dataTitle={'PROJECT'}
                modalWidth={1000}
            />}
        </>
    );

};

export default ProjectAddEditModal;