import { UserManager } from "@/interfaces/classinterfaces";
import ThisUser from "./base";

export default class Manager extends ThisUser implements UserManager{
    async addTable(){}
    async getTables(){}
    async editTable(){}
    async deleteTable(){}
    async addStock(){}
    async getStock(){}
    async editStock(){}
    async deleteStockItem(){}
    async getReservations(){}
    async getPayments(){}
    async getOrders(){}
    async getFeedback(){}
    async feedbackResponse(){}
    async getDishes(){}
    async addBio(){}
    async getBio(){}
    async editBio(){}
    async deleteBio(){}
}