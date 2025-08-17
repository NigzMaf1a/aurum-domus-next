import Dish from "@/interfaces/dish";
import apiFetch from "./apiFetch";

export async function addDish(dish:Dish):Promise<void>{
    try{
        await apiFetch(`/api/dish/add/`, {
            method: 'POST',
            body: JSON.stringify(dish),
        });
        console.log(`${dish} was added successfully`);
    }catch(err){
        console.error(`Error ${err} while adding dish ${dish}`);
    }
}

export async function getDishes():Promise<Dish[]>{
    try{
        const dishes = await apiFetch<Dish[]>('/api/dish/');
        console.log(`${dishes} were fetched successfully`);
        return dishes;
    }catch(err){
        console.error(`Error ${err} occurred while fetching dishes`);
        return [];
    }
}

export async function updateDish(dishID:number, dish:Dish):Promise<void>{
    try{
        await apiFetch(`/api/dish/${dishID}/`, {
            method: 'PUT',
            body: JSON.stringify(dish),
        });
    }catch(err){
        console.error(`Error ${err} occurred while updating ${dishID}`);
    }
}

export async function deleteDish(dishID:number):Promise<void>{
    try{
        await apiFetch(`/api/dish/${dishID}/`, {
            method: 'DELETE'
        });
        console.log(`${dishID} was updated successfully`);
    }catch(err){
        console.error(`Error ${err} occurred while updating ${dishID}`);
    }
}