import { ClientType } from "../enums/clientType";

interface AddClient {
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

export type {AddClient};
