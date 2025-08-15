//Payment status types
type paid = "Paid";
type notPaid = "Not Paid";

export type paymentStatus = paid | notPaid;

//Reservation status types
type attended = "Attended";
type pending = "Pending";

export type reservationStatus = attended | pending;

//Service types
type yes = "YES";
type no = "NO";

export type served = yes | no;
export type available = yes | no;