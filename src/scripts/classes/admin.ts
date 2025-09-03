//interfaces
import { UserAdmin } from "@/interfaces/classinterfaces";
import User from "@/interfaces/user";
import Payment from "@/interfaces/payment";
import Feedback from "@/interfaces/feedback";
import Hotel from "@/interfaces/hotel";
import Unit from "@/interfaces/unit";

//services
import { readUsers, updateUser, deleteUser } from "../api/user";
import ThisUser from "./base";
import { getPayments } from "../api/payments";
import { readFeedback } from "../api/feedback";
import getHotels from "../api/getHotels";
import getUnits from "../api/getUnits";

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
    async getPayments():Promise<Payment[]>{
        try{
            return await getPayments();
        } catch(err){
            console.error(`Error: ${err} occurred while fetching payments`);
            return [];
        }
    }
    async getFeedback():Promise<Feedback[]>{
        try{
            return await readFeedback();
        } catch(err){
            console.error(`Error: ${err} occurred while fetching payments`);
            return [];
        }
    }
    
    async getHotels():Promise<Hotel[]>{
        try {
            return await getHotels();
        } catch(err){
            console.log(`Error ${err} occurred while fetching hotels`);
            return [];
        }
    }

    async getUnits():Promise<Unit[]>{
        try{
            return await getUnits();
        } catch(err){
            console.log(`Error: ${err} occurred while fetching units`);
            return [];
        }
    }
}