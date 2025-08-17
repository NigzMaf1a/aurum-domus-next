import apiFetch from "./apiFetch";
import User from "@/interfaces/user";

export async function createUser(user:User){
    try {
        await apiFetch('/api/user/public/', {
            method: 'POST',
            body:JSON.stringify(user),
        });
        console.log(`User created successfully: ${user}`);
    } catch(err){
        console.log(`There was an error in creating ${err}`);
    }
}
export async function readUsers():Promise<User[]>{
    try{
        const users = await apiFetch<User[]>('/api/user/public/');
        console.log(`Users fetched successfully: ${users}`);
        return users;
    } catch(err){
        console.log(`There was an error fetching users: ${err}`);
        return [];
    }
}
export async function updateUser(userID:number, user:User){
    try{
        await apiFetch(`/api/user/${userID}`, {
            method: 'PUT',
            body: JSON.stringify(user),
        });
    } catch(err){
        console.log(`There was an error while updating ${user}: ${err}`);
    }
}
export async function deleteUser(userID:number){
    try{
        await apiFetch(`/api/user/${userID}/`, {
            method: 'DELETE'
        });
    }catch(err){
        console.log(`There was an error deleting ${userID} ${err}`);
    }
}