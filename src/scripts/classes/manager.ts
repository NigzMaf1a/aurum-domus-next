import ThisUser from "./base";

//interfaces
import { UserManager } from "@/interfaces/classinterfaces";
import Table from "@/interfaces/table";
import StockItem from "@/interfaces/stockItem";
import Reservation from "@/interfaces/reservation";
import Payment from "@/interfaces/payment";
import Order from "@/interfaces/order";
import Feedback from "@/interfaces/feedback";
import Dish from "@/interfaces/dish";
import Bio from "@/interfaces/bio";

//services
import { createTable, readTablesAll, updateTable, deleteTable } from "../api/table";
import { createStockItem , readStockItems, updateStockItem, deleteStockItem} from "../api/stock";
import { readReservations } from "../api/reservation";
import { getPayments } from "../api/payments";
import { getOrders } from "../api/order";
import { readFeedback, updateFeedback } from "../api/feedback";
import { getDishes } from "../api/dishes";
import { getBio, createBio, updateBio, deleteBio } from "../api/bio";


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

    async deleteStock(id:number):Promise<void>{
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
    
    async feedbackResponse(id:number, feed:Feedback){
        await updateFeedback(id, feed);
    }
    async getDishes(unitID:number):Promise<Dish[]>{
        try{
            const dishes = await getDishes();
            console.log(`${dishes} fetched successfully`);
            return await dishes.filter(dish => dish.UnitID === unitID);
        }catch(err){
            console.error(`Error ${err} occurred while fetching dishes`);
            return [];
        }
    }
    async addBio(par:Bio):Promise<void>{
        await createBio(par);
    }
    async getBio(unitID:number):Promise<Bio | null>{
        return await getBio(unitID);
    }
    async editBio(id:number, bio:Bio):Promise<void>{
        await updateBio(id, bio);
    }
    async deleteBio(id:number):Promise<void>{
        await deleteBio(id);
    }
}