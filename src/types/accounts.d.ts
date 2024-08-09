export interface Account {
    name?: string;
    password: string;
    favouriteFruit: string;
    favouriteMovie: string;
    favouriteNumber: string;
    success?: boolean;
    message?: string;
}

export type Accounts = {
    [key: string]: Account;
};