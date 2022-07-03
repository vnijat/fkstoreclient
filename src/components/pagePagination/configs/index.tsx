export interface IpaginationTakeOptions {
  label: string;
  value: string | number;
}

export const paginationTakeOptions: Array<IpaginationTakeOptions> = [
  {label: '10', value: 10},
  {label: '20', value: 20},
  {label: '50', value: 50},
];
