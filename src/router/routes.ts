export enum Routes {
    // default = '/',
    notFound = '/not-found',
    auth = '/auth',
    home = '/',
    landing = '/landing',
    table = '/table',
    form = '/form',
    reports = '/reports',
    settings = '/settings',
    security = '/security',
    applications = '/applications',
    editApplications = '/applications/edit/:id',
    applicationDetails = '/applications/:id',
    payments = '/applications/:id/payments',
    applicationHistory = '/applications/:id/history',
    applicationHistoryDetails = '/applications/:id/history/:historyId',
    createApplication = '/applications/add',
    addAppeal = '/appeal/add/:packageId',
    editAppeal = '/appeal/edit/:packageId/:id',
    appeal = '/appeal/:packageId/:id',
    certificates = '/certificates',
    certificate = '/certificates/:id',
    certificateRequests = '/certificate-requests',
    cancellationRequest = '/cancellation-requests',
    cancellationRequestInfo = '/cancellation-requests/:id',
    cancellationRequestSearch = '/cancellation-requests/search',
    cancellationRequestForm = '/cancellation-requests/add',
    cancellationRequestEdit = '/cancellation-requests/edit',
    cancellationRequestEditId = '/cancellation-requests/edit/:id',
    appealHistory = '/appeal/history/:id',
    appealHistoryDetails = '/appeal/history/:id/:historyId',
    login = '/auth/login',
    appealPrint = '/appeal/print/:id',
    users = '/user',
    userCreate = '/user/add',
    userEdit = '/user/edit/:id',
    roles = '/role',
    roleCreate = '/role/add',
    roleEdit = '/role/edit/:id'
}


export const goTo = (route: string, param: string | number) => {
    return route + '/' + param;
};

export const goToWithQuery = (route: string, param: any) => {
    let path = route + '?';
    if (param)
        for (const key in param) {
            if (path.substr(path.length - 1) !== '?')
                path += '&';
            path += key + '=' + param[`${key}`];
        }
    return path;
};

// function to replace dynamic values like :packageId with actual values
export const goToWithDynamicValues = (route: string, param: any) => {
    let path = route;
    if (param)
        for (const key in param) {
            path = path.replace(`:${key}`, param[`${key}`]);
        }
    return path;
};
