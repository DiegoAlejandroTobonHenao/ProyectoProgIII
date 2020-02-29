export class UserModel{
    rol: Number;
    firstName: String;
    lastName: String;
    identification: Number;
    email: String;
    password: String;
    birthDate: String;
    address: String;
    phone: String;
    isLogged?: boolean = false;
}