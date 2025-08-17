import { UserManager } from "@/interfaces/classinterfaces";
import ThisUser from "./base";

//interfaces
import Table from "@/interfaces/table";
import StockItem from "@/interfaces/stockItem";
import Reservation from "@/interfaces/reservation";
import Payment from "@/interfaces/payment";
import Order from "@/interfaces/order";
import Feedback from "@/interfaces/feedback";

//services
import { createTable, readTablesAll, updateTable, deleteTable } from "../api/table";
import { createStockItem , readStockItems, updateStockItem, deleteStockItem} from "../api/stock";
import { readReservations } from "../api/reservation";
import { getPayments } from "../api/payments";
import { getOrders } from "../api/order";
import { readFeedback } from "../api/feedback";


export default class Manager extends ThisUser implements UserManager{
    async addTable(par:Table):Promise<void>{
        await createTable(par);
    }

    async getTables(unitID:number):Promise<Table[]>{
        try{
            const allTables = await readTablesAll(unitID);
            console.log(`${allTables} fetched successfully`);
            return allTables;
        } catch(err){
            console.error(`Error ${err} occurred while fetching tables`);
            return [];
        }
    }

    async editTable(tableID:number, table:Table):Promise<void>{
        await updateTable(tableID, table);
    }

    async deleteTable(id:number):Promise<void>{
        await deleteTable(id);
    }

    async addStock(par:StockItem):Promise<void>{
        await createStockItem(par);
    }

    async getStock(unitID:number):Promise<StockItem[]>{
        return await readStockItems(unitID);
    }

    async editStock(id:number, stock:StockItem):Promise<void>{
        await updateStockItem(id, stock);
    }

    async deleteStockItem(id:number):Promise<void>{
        await deleteStockItem(id);
    }

    async getReservations(unitID:number):Promise<Reservation[]>{
        try{
            const allReservations = await readReservations();
            console.log(`${allReservations} fetched successfully`);
            return await allReservations.filter(res => res.UnitID === unitID);
        } catch(err){
            console.log(`Error ${err} occurred while fetching reservations`);
            return [];
        }
    }
    
    async getPayments(unitID:number):Promise<Payment[]>{
        try{
            const payments = await getPayments();
            console.log(`${payments}`);
            return await payments.filter(pay => pay.UnitID===unitID);
        } catch(err){
            console.log(`Error ${err} occurred while fetching payments`);
            return [];
        }
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

    async getFeedback(unitID:number):Promise<Feedback[]>{
        try{
            const feedback = await readFeedback();
            console.log(`${feedback} fetched successfully`);
            return await feedback.filter(feed => feed.UnitID === unitID);
        } catch(err){
            console.error(`Error ${err} occurred while fetching feedback`);
            return [];
        }
    }
    
    async feedbackResponse(){}
    async getDishes(){}
    async addBio(){}
    async getBio(){}
    async editBio(){}
    async deleteBio(){}
}