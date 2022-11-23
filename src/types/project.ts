import {OtherExpensesType} from './projectsQuery';

interface AddClientProject {
  title?: string;
  description?: string | null;
  price?: number | string;
  paid?: number | string;
  clientId?: number | string;
  deadline?: Date | null;
  isSample?: boolean;
  otherExpenses?: OtherExpensesType[];
}

export type {AddClientProject};
