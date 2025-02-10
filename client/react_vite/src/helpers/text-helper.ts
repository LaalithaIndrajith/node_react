export abstract class TextHelper {

    public static getInitials(name: string): string {
        return name
            .split(" ") // Split by space
            .map(word => word.charAt(0).toUpperCase()) // Get first letter and convert to uppercase
            .join(""); // Join initials
    }
}

