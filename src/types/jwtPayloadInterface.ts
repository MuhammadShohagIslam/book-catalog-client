import { JwtPayload } from "jwt-decode";

export interface userJwtPayload extends JwtPayload {
    role: string;
    email: string;
    userId: string;
    name:string;
}
