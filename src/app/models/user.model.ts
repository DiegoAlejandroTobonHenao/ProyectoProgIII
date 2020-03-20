export class UserModel{
    id?: String;
    rol: Number;
    firstName: String;
    lastName: String;
    identification: Number;
    email: String;
    password: String;
    birthDate: String;
    address: String;
    phone: Number;
    secretKey: String;
    emailVerified?: Boolean = false; 
    isLogged?: boolean = false;
}