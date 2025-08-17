//interfaces
import { LoggedUser } from "@/interfaces/classinterfaces";
import User from "@/interfaces/user";

//services
import logout from "../api/logout";
import editProfile from "../api/editProfile";

export default class ThisUser implements LoggedUser{


    constructor(protected userID:number){
        this.userID = userID;
    }

    async logout():Promise<void>{
        return await logout(this.userID);
    }

    getProfile(user:User):User{
        return user;
    }

    async editProfile(user:User):Promise<void>{
        await editProfile(user);
    }
}