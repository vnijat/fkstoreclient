interface IProjectColumnsTitle {
    title: string;
    dtoKey: string;
    sortable?: boolean;
}

export const ProjectColumnsTitle: IProjectColumnsTitle[] = [
    { title: 'Client', dtoKey: 'client' },
    { title: 'Title', dtoKey: 'title', sortable: true },
    { title: 'Description', dtoKey: 'description' },
    { title: 'Price', dtoKey: 'price' },
    { title: 'Paid', dtoKey: 'paid' },
    { title: 'Deadline', dtoKey: 'deadline' },
    { title: 'Status', dtoKey: 'totalPrice', sortable: true },
];
