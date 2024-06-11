export interface ResponseInterface {
    status: number,
    succest: boolean,
    message: string | string[],
    data?: any
}
