import ThisUser from "./base";

//interfaces
import { UserChef } from "@/interfaces/classinterfaces";
import StockItem from "@/interfaces/stockItem";
import Reservation from "@/interfaces/reservation";
import Order from "@/interfaces/order";
import Bio from "@/interfaces/bio";
import Dish from "@/interfaces/dish";

//services
import { readStockItems, updateStockItem } from "../api/stock";
import { readReservations } from "../api/reservation";
import { getOrders } from "../api/order";
import { getBio } from "../api/bio";
import { addDish, getDishes, updateDish, deleteDish } from "../api/dishes";

export default class Chef extends ThisUser implements UserChef{
    async getStock(unitID:number):Promise<StockItem[]>{
        return await readStockItems(unitID);
    }

    async editStock(id:number, stock:StockItem):Promise<void>{
        await updateStockItem(id, stock);
    }

    async getReservations(unitID: number): Promise<Reservation[]> {
        const allReservations = await readReservations();
        const unitReservations: Reservation[] = allReservations.filter(res => res.UnitID === unitID);
        return unitReservations;
    }

    async getOrders(unitID:number):Promise<Order[]>{
        const allOrders = await getOrders();
        const unitOrders: Order[] = allOrders.filter(ord => ord.UnitID === unitID);
        return unitOrders;
    }

    async addDish(par:Dish):Promise<void>{
        await addDish(par);
    }

    async getDishes(unitID:number):Promise<Dish[]>{
        const allDishes = await getDishes();
        const unitDishes: Dish[] = allDishes.filter(dish => dish.UnitID === unitID);
        return unitDishes;
    }

    async editDish(dishID:number, dish:Dish):Promise<void>{
        await updateDish(dishID, dish);
    }

    async deleteDish(dishID:number):Promise<void>{
        await deleteDish(dishID);
    }

    async getBio(unitID:number):Promise<Bio | null>{
        return await getBio(unitID);
    }    
}