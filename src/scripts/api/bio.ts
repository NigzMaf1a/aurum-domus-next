import Bio from "@/interfaces/bio";
import apiFetch from "./apiFetch";

export async function createBio(bio:Bio):Promise<void>{
    try{
        await apiFetch('/api/bio/add/', {
            method: 'POST',
            body: JSON.stringify(bio),
        });
        console.log(`${bio} created successfully`);
    } catch(err){
        console.log(err);
    }
}
export async function getBio(unitID:number):Promise<Bio | null>{
    try{
        const bio = await apiFetch<Bio>(`/api/bio/${unitID}`);
        console.log('Bio fetched successfully:', bio);
        return bio;
    } catch(err){
        console.log(`There was an error fetching the bio for ${unitID}`, err);
        return null;
    }
}

export async function updateBio(bioID:number, bio:Bio){
    try{
        await apiFetch(`/api/bio/update/${bioID}`, {
            method: 'PUT',
            body: JSON.stringify(bio),
        });
        console.log(`${bioID} updated successfully ${bio}`);
    } catch(err){
        console.log(`An error occurred while updating ${bioID} ${err}`);
    }
}

export async function deleteBio(bioID:number){
    try{
        await apiFetch(`/api/bio/${bioID}`, {
            method: 'DELETE'
        });
        console.log(`${bioID} deleted successfully`);
    } catch(err){
        console.log(`${err} occurred while deleting ${bioID}`);
    }
}