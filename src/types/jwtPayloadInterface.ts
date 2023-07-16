import { JwtPayload } from "jwt-decode";

export interface userJwtPayload extends JwtPayload {
    role: string;
    email: string;
    name: string;
}
