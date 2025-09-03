import Order from "@/interfaces/order";
import apiFetch from "./apiFetch";

export async function addOrder(order:Order):Promise<void>{
    try{
        await apiFetch('/api/order/add/', {
            method: 'POST',
            body: JSON.stringify(order),
        });
        console.log(`${order} added successfully`);
    }catch(err){
        console.error(`Error ${err} while adding order ${order}`);
    }
}

export async function getOrders():Promise<Order[]>{
    try{
        const orders = await apiFetch<Order[]>('/api/order/get');
        console.log(`${orders} fetched successfully`);
        return orders;
    }catch(err){
        console.error(`Error ${err} occurred while fetching orders`);
        return [];
    }
}

export async function updateOrder(orderID:number, order:Order):Promise<void>{
    try{
        await apiFetch(`/api/order/${orderID}`, {
            method: 'PUT',
            body:JSON.stringify(order),
        });
        console.log(`${orderID} updated successfully with ${order}`);
    }catch(err){
        console.error(`Error ${err} occurred while updating ${orderID} with ${order}`);
    }
}
export async function deleteOrder(orderID:number):Promise<void>{
    try{
        await apiFetch(`/api/order/${orderID}/`, {
            method: 'DELETE',
        });
        console.log(`${orderID} deleted successfully`);
    }catch(err){
        console.error(`Error ${err} occurred while deleting ${orderID}`);
    }
}