export default interface RollCall{
    RollCallID:number;
    RegID:number;
    UnitID:number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string; 
    RollCallStatus: 'PRESENT' | 'ABSENT';
    RollCallDate:string;
    RollCallTime:string;
}