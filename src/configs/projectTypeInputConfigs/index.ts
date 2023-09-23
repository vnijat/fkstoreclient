import {InputsConfig} from '../../types/inputsconfig';
import {IProjectType} from '../../types/project';

const projectTypeInputConfig: InputsConfig<IProjectType>[] = [
  {
    title: 'Title',
    dtoKey: 'title',
    width: 300,
    height: 35,
  },
  {
    title: 'Prefix',
    dtoKey: 'prefix',
    width: 80,
    height: 35,
    isDisableForEdit: true,
  },
];

export {projectTypeInputConfig};
