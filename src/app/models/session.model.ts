import { UserModel } from './user.model';

export class SessionModel{
    id: String;
    ttl: Number;
    created: String;
    userId: String;
    user: UserModel;
}