import { jwtDecode } from "jwt-decode";

const checkTokenExpiration = (token: string) => {
    try {
        // Decode the JWT token
        const decoded: any = jwtDecode(token);

        // Get current timestamp
        const currentTime = Date.now() / 1000;

        // Check if the token has expired (JWT exp is in seconds)
        return decoded.exp < currentTime;
    } catch (error) {
        // In case the token is invalid
        console.error("Error decoding token", error);
        return true; // Return true if there's an error to redirect to login
    }
};

export default checkTokenExpiration;