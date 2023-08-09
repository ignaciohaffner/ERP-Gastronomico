import StockMovement from '../models/stockMovement.model.js'
export const limpiarStock = async () => {
    await StockMovement.deleteMany({})
}