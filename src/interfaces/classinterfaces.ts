import User from "../interfaces/user";
import Table from '../interfaces/table'
import StockItem from "./stockItem";
import Reservation from "./reservation";
import Payment from "./payment";
import Order from "./order";
import Feedback from "./feedback";
import Dish from "./dish";
import Bio from "./bio";
import Unit from "./unit";
import { StringOrNumber } from "@/types/customer";

export interface LoggedUser{
    logout: () => Promise<void>;
    getProfile: (user:User) => User;
    editProfile: (par:User)=>Promise<void>;
}

export interface UserAdmin extends LoggedUser{
    approveUser:(id:StringOrNumber, user:User) => Promise<void>;
    disableUser:(id:StringOrNumber, user:User) => Promise<void>;
    reactivateUser:(id:StringOrNumber, user:User) => Promise<void>;
    getPayments:() => Promise<Payment[]>;
    getFeedback:() => Promise<Feedback[]>;
    getBio:(id:string) => Promise<Bio>;
}

export interface UserOwner extends LoggedUser{
    addUnit:(par:Unit) => Promise<void>;
    getUnits:() => Promise<Unit[]>;
    editUnit:(unitID:number, par:Unit) => Promise<void>;
    deleteUnit:(id:number) => Promise<void>;
    getPayments:() => Promise<Payment[]>;
    getFeedback:() => Promise<Feedback[]>;
}

export interface UserManager extends LoggedUser{
    addTable: (par:Table) => Promise<void>;
    getTables:() => Promise<Table[]>;
    editTable:(id:string) => Promise<void>;
    deleteTable: (id:string) => Promise<void>;
    addStock: (par:StockItem) => Promise<void>;
    getStock:() => Promise<StockItem[]>;
    editStock:(id:string) => Promise<void>;
    deleteStock:(id:string) => Promise<void>;
    getReservations:() => Promise<Reservation[]>;
    getPayments:() => Promise<Payment[]>;
    getOrders:() => Promise<Order[]>;
    getFeedback:() => Promise<Feedback[]>;
    feedbackResponse:(par:string) => Promise<void>;
    getDishes:() => Promise<Dish[]>;
    addBio:(par:Bio) => Promise<void>;
    getBio:(id:string) => Promise<Bio>;
    editBio:(id:string) => Promise<void>;
    deleteBio:(id:string) => Promise<void>;
}

export interface UserChef extends LoggedUser{
    getStock:(unitID:number) => Promise<StockItem[]>;
    editStock:(id:number, stock:StockItem) => Promise<void>;
    getReservations:(unitID:number) => Promise<Reservation[]>;
    getOrders:(unitID:number) => Promise<Order[]>;
    addDish:(par:Dish) => Promise<void>;
    getDishes:(unitID:number) => Promise<Dish[]>;
    editDish:(id:number, dish:Dish) => Promise<void>;
    deleteDish:(id:number) => Promise<void>;
    getBio:(id:number) => Promise<Bio | null>;
}

export interface UserWaiter extends LoggedUser{
    getTables:(unitID:number) => Promise<Table[]>;
    editTable:(id:number, table:Table) => Promise<void>;
    getReservations:(unitID:number) => Promise<Reservation[]>;
    editReservation:(id:number, res:Reservation) => Promise<void>;
    getOrders:(unitID:number) => Promise<Order[]>;
    editOrder:(id:number, order:Order) => Promise<void>;
    getBio:(id:number) => Promise<Bio | null>;
}

export interface UserAccountant extends LoggedUser{
    getPayments:() => Promise<Payment[]>;
    createPayment:(par:Payment) => Promise<void>;
    getBio:(id:number) => Promise<Bio | null>;
}

export interface UserCustomer extends LoggedUser{
    getTables:() => Promise<Table[]>;
    addReservation:(par:Reservation) => Promise<void>;
    getReservations:() => Promise<Reservation[]>;
    editReservation:(par:Reservation) =>Promise<void>;
    deleteReservation:(par:StringOrNumber) => Promise<void>;
    addOrder:(par:Order) => Promise<void>;
    getOrders:() => Promise<Order[]>;
    editOrder:(par:StringOrNumber) => Promise<void>;
    deleteOrder:(par:StringOrNumber) => Promise<void>;
    addPayment:(par:Payment) => Promise<void>;
    getPayments:(id:StringOrNumber) => Promise<Payment[]>;
    addFeedback:(par:Feedback) => Promise<void>;
    getFeedback:(id:StringOrNumber) => Promise<Feedback[]>;
    editFeedback:(id:StringOrNumber) => Promise<void>;
    getBio:(id:string) => Promise<Bio>;
}