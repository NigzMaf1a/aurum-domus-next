export default class APILinks {
    public static BASE_URL: string = "https://8e6d-41-90-172-156.ngrok-free.app/aurumapi";
    public static LOGIN_URL: string = APILinks.BASE_URL + "/login";
    public static REGISTER_URL: string = APILinks.BASE_URL + "/register";
    public static PROFILE_URL: string = APILinks.BASE_URL + "/profile";
    public static PENDING_URL: string = APILinks.BASE_URL + "/pendingAccounts";
    public static APPROVED_URL: string = APILinks.BASE_URL + "/approvedAccounts";
    public static INACTIVE_URL: string = APILinks.BASE_URL + "/inactiveAccounts";
    public static ADMIN_DASH_URL: string = APILinks.BASE_URL + "/adminDashboard";
}
