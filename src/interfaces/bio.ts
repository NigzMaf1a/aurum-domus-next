import { StringOrNumber } from "@/types/customer";
export default interface Bio{
    BioID:number;
    UnitID:number;
    Instagram:string;
    Facebook:string;
    Twitter:string;
    UnitPhone:StringOrNumber;
    UnitLocation:string;
    AboutUs:string;
}