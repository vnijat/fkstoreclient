const modifieErrorMessage = (error: any) => {
    return error.data.message.reduce((errorObject: { [key: string]: string[]; }, message: string,) => {
        if (message) {
            const messageToArray = message.split(' ');
            const errorTitle = messageToArray.shift()!;
            if (!errorObject[errorTitle]) {
                errorObject[errorTitle] = [];
            }
            errorObject[errorTitle].push(messageToArray.join(' '));
        }
        return errorObject;
    }, {});
};

const HELP = {
    modifieErrorMessage
};

export default HELP;