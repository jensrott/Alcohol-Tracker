export class Tip {
    id: string;
    title: string;
    description: string;
    accepted: boolean;
    user_id?: number;
    created_at?: Date;
    updated_at?: Date;
    errors?: any
}