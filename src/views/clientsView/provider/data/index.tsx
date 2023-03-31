import { useSelector } from "react-redux";
import { ClientSort } from "../../../../enums/clientSort";
import { ClientType } from "../../../../enums/clientType";
import { useGetClientsQuery } from "../../../../modules/api/clients.api";
import { RootState } from "../../../../modules/redux/store";


function ClientDataProvider() {
    const clientQueryParams = useSelector((state: RootState) => state.clientQuery);
    const { data: queryData, isLoading } = useGetClientsQuery(clientQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized }) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        pollingInterval: 5000
    });

    const clientTypes = [
        ...Object.values(ClientType),
        'all'
    ].map(item => ({ value: item, label: item }));

    const clientSortData = Object.keys(ClientSort).map((item) => ({ value: ClientSort[item as keyof typeof ClientSort], label: item }));

    return {
        clientQueryParams,
        queryData: {
            data: queryData,
            isLoading
        },
        clientTypes,
        clientSortData,
    };
}


export default ClientDataProvider;