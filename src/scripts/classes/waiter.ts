import ThisUser from "./base";

//Interfaces
import { UserWaiter } from "@/interfaces/classinterfaces";
import Table from "@/interfaces/table";
import Reservation from "@/interfaces/reservation";
import Order from "@/interfaces/order";
import Bio from "@/interfaces/bio";

//Services
import { readTablesAll, updateTable } from "../api/table";
import { readReservations, updateReservation } from "../api/reservation";
import { getOrders, updateOrder } from "../api/order";
import { getBio } from "../api/bio";

export default class Waiter extends ThisUser implements UserWaiter{
    async getTables(unitID:number):Promise<Table[]>{
        return await readTablesAll(unitID);
    } 

    async editTable(id:number, table:Table){
        await updateTable(id, table);
    }

    async getReservations(unitID: number): Promise<Reservation[]> {
        const allReservations = await readReservations();
        const unitReservations: Reservation[] = allReservations.filter(res => res.UnitID === unitID);
        return unitReservations;
    }

    async editReservation(id:number, res:Reservation):Promise<void>{
        await updateReservation(id, res);
    }

    async getOrders(unitID:number):Promise<Order[]>{
        const allOrders = await getOrders();
        const unitOrders: Order[] = allOrders.filter(ord => ord.UnitID === unitID);
        return unitOrders;
    }

    async editOrder(orderID:number, order:Order):Promise<void>{
        await updateOrder(orderID, order);
    }

    async getBio(unitID:number):Promise<Bio | null>{
        return await getBio(unitID);
    }
}