//interfaces
import { UserAdmin } from "@/interfaces/classinterfaces";
import User from "@/interfaces/user";

//services
import { readUsers, updateUser, deleteUser } from "../api/user";
import ThisUser from "./base";

export default class Admin extends ThisUser implements UserAdmin{
    async getUsers():Promise<User[]>{
        return await readUsers();
    }
    async updateUser(id:number, user:User):Promise<void>{
        try{
            await updateUser(id, user);
        } catch(err){
            console.error(`Error ${err} occurred while updating ${id} with ${user}`);
        }
    }
    async deleteUser(id:number):Promise<void>{
        try{
            await deleteUser(id);
        } catch(err){
            console.error(`Error ${err} occurred while deleting ${id}`)
        }
    }
}