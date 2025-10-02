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