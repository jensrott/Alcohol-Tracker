export class User {
    id: number;
    name: string;
    email: string;
    password: string | number;
    password_confirmation: string | number;
    role?: string;
    errors?: any;
    access_token?: string;
}