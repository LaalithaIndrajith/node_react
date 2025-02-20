export abstract class AuthHelper {

    public static getAuthenticatedUserId = (): string | null => {
        const userDetailsString = localStorage.getItem("userDetails");
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        return userDetails?.userId ?? null;
    };

    public static getAuthToken = (): string | null => {
        const userDetailsString = localStorage.getItem("userDetails");
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        return userDetails?.authToken ?? null;
    }

    public static isAuthenticated = (): boolean => {
        const userDetailsString = localStorage.getItem("userDetails");
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

        return !!userDetails?.authToken;
    };
}
