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
// import { StringOrNumber } from "@/types/customer";

export interface LoggedUser{
    logout: () => Promise<void>;
    getProfile: (user:User) => User;
    editProfile: (par:User)=>Promise<void>;
}

export interface UserAdmin extends LoggedUser{
    getUsers:() => Promise<User[]>;
    updateUser:(id:number, user:User) => Promise<void>;
    deleteUser:(id:number) => Promise<void>;
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
    getTables:(unitID:number) => Promise<Table[]>;
    editTable:(id:number, table:Table) => Promise<void>;
    deleteTable: (id:number) => Promise<void>;
    addStock: (par:StockItem) => Promise<void>;
    getStock:(unitID:number) => Promise<StockItem[]>;
    editStock:(id:number, stock:StockItem) => Promise<void>;
    deleteStock:(id:number) => Promise<void>;
    getReservations:(unitID:number) => Promise<Reservation[]>;
    getPayments:(unitID:number) => Promise<Payment[]>;
    getOrders:(unitID:number) => Promise<Order[]>;
    getFeedback:(unitID:number) => Promise<Feedback[]>;
    feedbackResponse:(unitID:number, res:Feedback) => Promise<void>;
    getDishes:(unitID:number) => Promise<Dish[]>;
    addBio:(par:Bio) => Promise<void>;
    getBio:(id:number) => Promise<Bio | null>;
    editBio:(id:number, bio:Bio) => Promise<void>;
    deleteBio:(id:number) => Promise<void>;
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
    getTables:(unitID:number) => Promise<Table[]>;
    addReservation:(par:Reservation) => Promise<void>;
    getReservations:(unitID:number) => Promise<Reservation[]>;
    editReservation:(unitID:number, par:Reservation) =>Promise<void>;
    deleteReservation:(par:number) => Promise<void>;
    addOrder:(par:Order) => Promise<void>;
    getOrders:(unitID:number) => Promise<Order[]>;
    editOrder:(par:number, order:Order) => Promise<void>;
    deleteOrder:(par:number) => Promise<void>;
    addPayment:(par:Payment) => Promise<void>;
    getPayments:(id:number) => Promise<Payment[]>;
    addFeedback:(par:Feedback) => Promise<void>;
    getFeedback:(unitID:number) => Promise<Feedback[]>;
    editFeedback:(id:number, feed:Feedback) => Promise<void>;
    getBio:(id:number) => Promise<Bio | null>;
}