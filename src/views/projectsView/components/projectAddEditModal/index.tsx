import { useSelector } from "react-redux";
import { projectInputConfig } from "../../../../configs/projectInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import { useGetClientForPickerQuery } from "../../../../modules/api/clients.api";
import { useAddProjectMutation, useEditProjectMutation } from "../../../../modules/api/projects.api";
import { clearProjectForPost, setIsProjectForEdit, setIsShowProjectAddEditModal, setProjectDataForPost } from "../../../../modules/redux/projectSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";



interface IProjectAddEditModal {


}


const ProjectAddEditModal = ({ }: IProjectAddEditModal) => {
    const dispatch = useAppDispatch();
    const { data: selectableData } = useGetClientForPickerQuery(undefined, {
        selectFromResult: ({ data }) => ({ data }),
    });
    const isProjectForEdit = useSelector((state: RootState) => state.projectSlicer.isProjectForEdit);
    const isShowProjectAddEditModal = useSelector((state: RootState) => state.projectSlicer.isShowProjectAddEditModal);
    const [apiAddProject] = useAddProjectMutation();
    const [apiEditProject] = useEditProjectMutation();
    const projectDataForPost = useSelector((state: RootState) => state.projectSlicer.projectDataForPost);
    const setDataForRequest = (data: { [key: string]: string | number; }) => {
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

    return (
        <AddEditModal
            isDataForEdit={isProjectForEdit}
            dataForRequest={projectDataForPost}
            inputConfigs={projectInputConfig}
            apiPostData={apiAddProject}
            apiUpdateData={apiEditProject}
            clearDataForRequest={clearDataForRequest}
            setIsShowModal={setIsShowModal}
            setDataForRequest={setDataForRequest}
            setIsDataForEdit={setIsDataForEdit}
            dataTitle={'PROJECT'}
            selectableData={selectableData}
            isPickerSearchEnabled
            isShowModal={isShowProjectAddEditModal}
        />);

};

export default ProjectAddEditModal;