//interfaces
import { LoggedUser } from "@/interfaces/classinterfaces";
import User from "@/interfaces/user";

//services
import { login } from "@/server/controllers/authController";

export default class ThisUser implements LoggedUser{
    async logout():Promise<void>{}
    async getProfile():Promise<User>{
        const user:User = await login();
        return user;
    }
    async editProfile():Promise<void>{}
}