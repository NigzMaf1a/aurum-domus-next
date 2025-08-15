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
    approveUser:(id:StringOrNumber) => Promise<void>;
    disableUser:(id:StringOrNumber) => Promise<void>;
    reactivateUser:(id:StringOrNumber) => Promise<void>;
    getPayments:() => Promise<Payment[]>;
    getFeedback:() => Promise<Feedback[]>;
    getBio:(id:string) => Promise<Bio>;
}

export interface UserOwner extends LoggedUser{
    addUnit:(par:Unit) => Promise<void>;
    getUnits:() => Promise<Unit[]>;
    editUnit:(par:Unit) => Promise<void>;
    deleteUnit:(id:StringOrNumber) => Promise<void>;
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
    getStock:() => Promise<StockItem[]>;
    editStock:(id:string) => Promise<void>;
    getReservations:() => Promise<Reservation[]>;
    getOrders:() => Promise<Order[]>;
    addDish:(par:Dish) => Promise<void>;
    getDishes:() => Promise<Dish[]>;
    editDish:(id:string) => Promise<void>;
    deleteDish:(id:string) => Promise<void>;
    getBio:(id:string) => Promise<Bio>;
}

export interface UserWaiter extends LoggedUser{
    getTables:() => Promise<Table[]>;
    editTable:(id:string) => Promise<void>;
    getReservations:() => Promise<Reservation[]>;
    editReservation:(id:string) => Promise<void>;
    getOrders:() => Promise<Order[]>;
    editOrder:(id:string) => Promise<void>;
    getBio:(id:string) => Promise<Bio>;
}

export interface UserAccountant extends LoggedUser{
    getPayments:() => Promise<Payment[]>;
    editPayment:(id:StringOrNumber) => Promise<void>;
    getBio:(id:string) => Promise<Bio>;
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