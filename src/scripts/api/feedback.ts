import Feedback from "@/interfaces/feedback";
import apiFetch from "./apiFetch";

export async function createFeedback(feed:Feedback):Promise<void>{
    try{
        await apiFetch('/api/feedback/add/', {
            method: 'POST',
            body: JSON.stringify(feed),
        });
    }catch(err){
        console.log(`There was an error creating ${feed} ${err}`);
    }
}

export async function readFeedback():Promise<Feedback[]>{
    try{
        const feedback = await apiFetch<Feedback[]>('/api/feedback/');
        console.log(`Successfully fetched feedback: ${feedback}`);
        return feedback;
    } catch(err){
        console.log('An error occurred while fetching feedback:', err);
        return [];
    }
}

export async function updateFeedback(){} //some missing specificity *add update via ID
export async function deleteFeedback(feedID:number){
    try{
        await apiFetch(`/api/feedback/${feedID}/`, {
            method: 'DELETE'
        });
        console.log(`${feedID} was deleted successfully`);
    }catch(err){
        console.log(`There was an errpr deleting ${feedID} ${err}`);
    }
}