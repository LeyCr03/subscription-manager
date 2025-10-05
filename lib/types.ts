export type AccountType = {
    fullName: string,
    status: string,
    sex: string,
    age: number,
    birth: Date,
    last_entry: Date,
    last_payment: Date,
    _id: string,
}

export type GetAllResponseType = {
    accounts: AccountType[],
    nextPage: number | null,
    previousPage: number | null,
    total: 0,
    currentPage: number,
    pageSize: number
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
    name: string;
    birth: Date
    age: number
    sex: Sex
    registered_at: Date

}


