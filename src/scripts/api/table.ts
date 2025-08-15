import Table from "@/interfaces/table";
import apiFetch from "./apiFetch";

export async function createTable(table:Table):Promise<void>{
    try{
        await apiFetch('/api/table/add', {
            method: 'POST',
            body:JSON.stringify(table),
        });
    } catch(err){
        console.log('There was an error creating the table', err);
    }
}

export async function readTablesAll(unitID:number):Promise<Table[]>{
    try{
        const tables = await apiFetch<Table[]>(`/api/table/${unitID}/all/`);
        console.log('Tables fetched successfully:', tables);
        return tables;
    } catch(err){
        console.log('There was an error fetching tables:' ,err);
        return [];
    }
}

export async function readTablesVacant(unitID:number):Promise<Table[]>{
    try{
        const tables = await apiFetch<Table[]>(`/api/table/${unitID}/vacant/`);
        console.log('Tables fetched successfully:', tables);
        return tables;
    } catch(err){
        console.log('There was an error fetching tables:' ,err);
        return [];
    }
}

export async function readTablesOccupied(unitID:number):Promise<Table[]>{
    try{
        const tables = await apiFetch<Table[]>(`/api/table/${unitID}/occupied/`);
        console.log('Tables fetched successfully:', tables);
        return tables;
    } catch(err){
        console.log('There was an error fetching tables:' ,err);
        return [];
    }
}

export async function updateTable(tableID:number, table:Table):Promise<void>{
    try{
        await apiFetch(`/api/table/${tableID}/`, {
            method: 'PUT',
            body: JSON.stringify(table),
        });
        console.log(`Table ${tableID} updated successfully`);
    } catch(err){
        console.log('There was an error updating the table:', err);
    }
}
export async function deleteTable(tableID:number){
    try {
        await apiFetch('/api/table/delete/', {
            method: 'DELETE'
        });
    } catch(err){
        console.log(`There was an error updating ${tableID}:`, err);
    }
}