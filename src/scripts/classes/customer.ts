import ThisUser from "./base";

//interfaces
import { UserCustomer } from "@/interfaces/classinterfaces";
import Table from "@/interfaces/table";
import Reservation from "@/interfaces/reservation";
import Order from "@/interfaces/order";
import Feedback from "@/interfaces/feedback";
import Payment from "@/interfaces/payment";
import Bio from "@/interfaces/bio";

//services
import { readTablesVacant } from "../api/table";
import { createReservation, readReservations, updateReservation, deleteReservation } from "../api/reservation";
import { addOrder, getOrders, updateOrder, deleteOrder } from "../api/order";
import { addPayment, getPayments } from "../api/payments";
import { createFeedback, readFeedback, updateFeedback } from "../api/feedback";
import { getBio } from "../api/bio";

export default class Customer extends ThisUser implements UserCustomer{
    async getTables(unitID:number):Promise<Table[]>{
        return await readTablesVacant(unitID);
    }
    async addReservation(res:Reservation):Promise<void>{
        await createReservation(res);
    }
    async getReservations(unitID:number):Promise<Reservation[]>{
        try{
            const reservations = await readReservations();
            console.log(`${reservations} fetched successfully`);
            return await reservations.filter(res => res.UnitID === unitID);
        }catch(err){
            console.log(`Error ${err} occurred while fetching reservations`);
            return [];
        }
    }
    async editReservation(unitID:number, res:Reservation):Promise<void>{
        await updateReservation(unitID, res);
    }
    async deleteReservation(resID:number):Promise<void>{
        await deleteReservation(resID);
    }
    async addOrder(order:Order):Promise<void>{
        await addOrder(order);
    }
    async getOrders(unitID:number):Promise<Order[]>{
        try{
            const orders = await getOrders();
            console.log(`${orders} fetched successfully`);
            return await orders.filter(order => order.UnitID === unitID);
        } catch(err){
            console.error(`Error ${err} occurred while fetching orders`);
            return [];
        }
    }
    async editOrder(orderID:number, order:Order):Promise<void>{
        await updateOrder(orderID, order);
    }
    async deleteOrder(orderID:number):Promise<void>{
        await deleteOrder(orderID);
    }
    async addPayment(par:Payment):Promise<void>{
        await addPayment(par);
    }
    async getPayments(id:number):Promise<Payment[]>{
        try{
            const payments = await getPayments();
            console.log(`${payments} fetched successfully`);
            return payments.filter(pay => pay.UnitID === id);
        } catch(err){
            console.log(`Error ${err} occurred while fetching payments`);
            return [];
        }
    }
    async addFeedback(par:Feedback):Promise<void>{
        await createFeedback(par);
    }
    async getFeedback(unitID:number):Promise<Feedback[]>{
        try{
            const feedback = await readFeedback();
            console.log(`${feedback} fetched successfully`);
            return await feedback.filter(feed => feed.UnitID === unitID);
        } catch(err){
            console.log(`Error ${err} occurred while fetching feedback`);
            return [];
        }
    }
    async editFeedback(feedID:number, feed:Feedback):Promise<void>{
        await updateFeedback(feedID, feed);
    }
    async getBio(id:number):Promise<Bio | null>{
        return await getBio(id);
    }
}