export type AccountType = {
    id: string;
    birth: Date;
    registered_at: Date;
    age: number;
    name: string;
    sex: Sex;
    status: Status;
    payments: Payment[];
    entries: Entry[];
}

export type UserType = {
    id: string;
    email: string
    image?: string | null
    name: string
    description: string 
    password: string;
    refreshTokenHash?: string | null;
}

export type Payment = {
    id: string
    registered_at: Date
    accountId: string
    account: AccountType;
}

export type Entry = {
    id: string
    registered_at: Date
    accountId: string
    account: AccountType;
}

export type GetAllResponseType = {
    accounts: AccountType[],
    total: 0,
}

export enum Sex {
    MALE = 'male',
    FEMALE = 'female',
}

export enum Status {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
}

export type AgeRange = '18-25' | '25-35' | '35-45' | '45-70';

export type CreateAccount = {
    name: string
    birth: Date
    age: number
    sex: Sex
}

export type CreateUserAccount ={
    name: string
    password: string
    profileImage?: string
    email: string
}

export type LogIn = {
    email: string
    password: string
}
export interface DecodedRequest {
    user: {
        _id: string,
        email: string,
        password: string,
        refreshToken: string
    }
}

export type SuspensionResponse = {
    suspensionRisk: boolean,
    daysSinceLastPayment: number | null
}

