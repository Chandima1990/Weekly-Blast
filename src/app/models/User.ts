export interface User {
    TenantName: string;
    AccountType: string;
    address1: string;
    address2: string;
    cresditcardno: string;
    cresditcardtype: string;
    expirydate: string;
    Securitycode: string;
    phone: string;
    ID: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    AuthKey: string;
    IsAdmin: boolean;
    Password: string;
    ConPassword: string;
    CurrentPassword: string;
    dateofbirth: string;
    gender: string;
    TFA: string;
    rememberme: boolean;
}

export interface UserList {
    UserList: User[];
}