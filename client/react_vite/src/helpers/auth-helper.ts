export abstract class AuthHelper {

    public static getAuthenticatedUserId = (): string | null => {
        const userDetailsString = localStorage.getItem("userDetails");
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        console.log(userDetails);
        return userDetails?.userId ?? null;
    };
}