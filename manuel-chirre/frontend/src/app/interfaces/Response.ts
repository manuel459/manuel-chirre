export interface Response {
    status: number,
    succest: boolean,
    message: string | string[],
    data?: any
}