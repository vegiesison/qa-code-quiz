export interface Account {
    name: string;
    password: string;
    favouriteFruit: string;
    favouriteMovie: string;
    favouriteNumber: string;
}

export interface Accounts {
    [key: string]: Account;
}

