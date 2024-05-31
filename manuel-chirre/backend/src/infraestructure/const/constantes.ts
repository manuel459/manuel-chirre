//ROLES
export const ENCARGADO = 'ENCARGADO';
export const VENDEDOR = 'VENDEDOR';
export const DELIVERY = 'DELIVERY';
export const REPARTIDOR = 'REPARTIDOR'


//ESTADOS
export const POR_ATENDER = 'POR ATENDER';
export const EN_PROCESO = 'EN PROCESO';
export const EN_DELIVERY = 'EN DELIVERY';
export const RECIBIDO = 'RECIBIDO';


//SECUENCIA
export const lista_secuencia_estados = [
    {
        id: 1,
        state: POR_ATENDER
    },
    {
        id: 2,
        state: EN_PROCESO
    },
    {
        id: 3,
        state: EN_DELIVERY
    },
    {
        id: 4,
        state: RECIBIDO
    }
]