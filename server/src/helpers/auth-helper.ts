import crypto from "crypto";

const SECRET = "LAALITHA-REST-API";

export const random = () : string => crypto.randomBytes(128).toString("base64");

export const authentication = (salt:string, password:string) : string => {
    return crypto.createHmac("sha256", [salt, password].join(":")).update(SECRET).digest("hex");
}