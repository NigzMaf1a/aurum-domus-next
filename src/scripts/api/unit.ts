import Unit from "@/interfaces/unit";
import apiFetch from "./apiFetch";

export async function createUnit(unit:Unit):Promise<void>{
    try{
        await apiFetch('/api/unit/', {
            method: 'POST',
            body: JSON.stringify(unit),
        });
        console.log(`Unit ${unit} created successfully`);
    } catch(err){
        console.log(`There was an error creating ${unit}:`, err);
    }
}

export async function readUnits():Promise<Unit[]>{
    try{
        const units = await apiFetch<Unit[]>('/api/unit/get/');
        console.log(`${units} fetched successfully`);
        return units;
    } catch(err){
        console.log(`There was an error fetching units:`, err);
        return [];
    }
}

export async function updateUnit(unitID:number, unit:Unit):Promise<void>{
    try{
        await apiFetch(`/api/unit/${unitID}`, {
            method: 'PUT',
            body: JSON.stringify(unit),
        });
        console.log(`Unit ${unit} updated successfully`);
    } catch(err){
        console.log(`There was an error updating ${unitID}:`, err);
    }    
}

export async function deleteUnit(unitID:number):Promise<void>{
    try{
        await apiFetch(`/api/unit/${unitID}/`, {
            method:'DELETE',
        });
        console.log(`${unitID} updated successfully`);
    } catch(err){
        console.log(`There was an error deleting ${unitID}:`, err);
    }
}