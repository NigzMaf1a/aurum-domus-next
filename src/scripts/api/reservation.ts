import Reservation from "@/interfaces/reservation";
import apiFetch from "./apiFetch";

export async function createReservation(par:Reservation):Promise<void>{
    try{
        await apiFetch('/api/reservation/add/', {
            method: 'POST',
            body:JSON.stringify(par),
        });
        console.log(`Reservation ${par} was created successfully`);
    } catch(err){
        console.error(`There was error: ${err} while creating reservation ${par} please try again`);
    }
}

export async function readReservations():Promise<Reservation[]>{
    try{
        const reservations = await apiFetch<Reservation[]>('/api/reservation/');
        console.log(`${reservations} fetched successfully`);
        return reservations;
    }catch(err){
        console.error(`There was error ${err} while fetching reservations`);
        return [];
    }
}

export async function updateReservation(par:number, res:Reservation):Promise<void>{
    try{
        await apiFetch('', {
            method: 'PUT',
            body: JSON.stringify(res),
        });
        console.log(`${par} updated successfully with ${res}`);
    }catch(err){
        console.error(`Error ${err} occurred while updating ${par}`);
    }
}

export async function deleteReservation(resID:number):Promise<void>{
    try{
        await apiFetch(`/api/reservation/${resID}/`, {
            method: 'DELETE',
        });
        console.log(`${resID} deleted successfully`);
    } catch(err){
        console.error(`Error ${err} occurred while deleting ${resID}`);
    }
}