import { UserAccountant } from "@/interfaces/classinterfaces";
import ThisUser from "./base";

//interfaces
import Payment from "@/interfaces/payment";
import Bio from "@/interfaces/bio";

//services
import { getPayments, addPayment } from "../api/payments";
import { getBio } from "../api/bio";

export default class Accountant extends ThisUser implements UserAccountant{
    async getPayments():Promise<Payment[]>{
        return await getPayments();
    }
    async createPayment(par:Payment):Promise<void>{
        await addPayment(par);
    }
    async getBio(id:number):Promise<Bio | null>{
        return await getBio(id);
    }
}