//Base class
import ThisUser from "./base";

//interfaces
import { UserOwner } from "@/interfaces/classinterfaces";
import Unit from "@/interfaces/unit";
import Payment from "@/interfaces/payment";
import Feedback from "@/interfaces/feedback";

//Services
import { createUnit, readUnits, updateUnit, deleteUnit } from "../api/unit";
import { getPayments } from "../api/payments";
import { readFeedback } from "../api/feedback";

export default class Owner extends ThisUser implements UserOwner{
    async addUnit(unit:Unit):Promise<void>{
        await createUnit(unit);
    }
    async getUnits():Promise<Unit[]>{
        return await readUnits();
    }
    async editUnit(unitID:number, unit:Unit):Promise<void>{
        await updateUnit(unitID, unit);
    }
    async deleteUnit(unitID:number):Promise<void>{
        await deleteUnit(unitID);
    }
    async getPayments():Promise<Payment[]>{
        return await getPayments();
    }
    async getFeedback():Promise<Feedback[]>{
        return await readFeedback();
    }
}