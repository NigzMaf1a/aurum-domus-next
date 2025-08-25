export interface SupplyItem{
    SupplyItemID:number;
    SupplierID:number;
    SupplyItemName:string;
    Price:number;
    Quantity:number;
    Available:string;
}

export interface Supply{
    SupplyID:number;
    SupplierID:number;
    UnitID:number;
    Quantity:number;
    SupplyPrice:number;
    SupplyPayment:string;
    SupplyDate:string;
    SupplyTime:string;
}