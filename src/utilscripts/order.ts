interface Order {
    OrderID: number;
    UnitID: number;
    RegID: number;
    DishID: number;
    DishName: string;
    DishPrice: number;
    Plates: number;
    OrderPrice: number;
    OrderDescription: string;
    OrderDate: string;
    OrderTime: string;
    PaymentStatus: 'Paid' | 'Not Paid';
    Served: 'YES' | 'NO';
}

function createOrder(dishName: string, dishPrice: number, plates: number ): Order{

}