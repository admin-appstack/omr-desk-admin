import { environment } from '../../../environments/environment';

export const ENDPOINTS = {
    AUTH: environment.apiUrl + '/auth',
    LOGIN: environment.apiUrl + '/auth/login',
    REGISTER: environment.apiUrl + '/auth/register',
};
