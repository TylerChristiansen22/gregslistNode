import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class HousesService {
    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        return house
    }
    async removeHouse(houseId) {
        const houseToRemove = await dbContext.Houses.findById(houseId)
        if (!houseToRemove) {
            throw new BadRequest("No house at id:" + houseId)
        }
        await houseToRemove.remove()
        return `removed the house with the id ${houseId}. SHE GONE.`
    }
    async editHouse(houseId, updates) {
        const houseToEdit = await dbContext.Houses.findById(houseId)
        houseToEdit.bedrooms = updates.bedrooms
        houseToEdit.bathrooms = updates.bathrooms
        houseToEdit.year = updates.year
        houseToEdit.price = updates.price
        houseToEdit.imgUrl = updates.imgUrl
        houseToEdit.description = updates.description

        await houseToEdit.save()
        return houseToEdit
    }

}

export const housesService = new HousesService()