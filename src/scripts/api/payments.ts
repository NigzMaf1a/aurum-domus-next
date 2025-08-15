import Payment from "@/interfaces/payment";
import apiFetch from "./apiFetch";

async function addPayment(pay:Payment):Promise<void>{
    try{
        await apiFetch('/api/payment/add', {
            method: 'POST',
            body: JSON.stringify(pay),
        });
    } catch(err){
        console.log("There was an error in adding the payment", err);
    }
}

async function getPayments():Promise<Payment[]>{
    try{
        const payments = await apiFetch<Payment[]>('/api/payment');
        console.log('Payments fetched successfully:', payments);
        return payments;
    } catch(err){
        console.log("There was an error fetching payments:", err);
        return [];
    }
}

export {addPayment, getPayments};