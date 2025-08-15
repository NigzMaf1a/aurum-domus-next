import StockItem from "@/interfaces/stockItem";
import apiFetch from "./apiFetch";

export async function createStockItem(par:StockItem):Promise<void>{
    try{
        await apiFetch('/api/stock/', {
            method:'POST',
            body: JSON.stringify(par),
        });
    } catch(err){
        console.log('There was an error in adding the stock item:', err);
    }
}

export async function readStockItems(unitID: number): Promise<StockItem[]> {
    try {
        const stock = await apiFetch<StockItem[]>(`/api/stock/${unitID}`);
        return stock;
    } catch (err) {
        console.error('There was an error fetching stock:', err);
        return [];
    }
}

export async function updateStockItem(stockID: number, item: StockItem): Promise<void> {
    try {
        await apiFetch(`/api/stock/${stockID}`, {
            method: 'PUT',
            body: JSON.stringify(item),
        });
        console.log(`Stock item ${stockID} updated successfully`);
    } catch (err) {
        console.error(`There was an error updating stock item ${stockID}:`, err);
    }
}

export async function deleteStockItem(stockID: number): Promise<void> {
    try {
        await apiFetch(`/api/stock/${stockID}`, {
            method: 'DELETE',
        });
        console.log(`Stock item ${stockID} deleted successfully`);
    } catch (err) {
        console.error(`There was an error deleting stock item ${stockID}:`, err);
    }
}