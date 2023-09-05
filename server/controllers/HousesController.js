import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";


export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .post('', this.createHouse)
            .get('', this.getHouse)
            .get('/:houseId', this.getHouseById)
            .delete('/:houseId', this.removeHouse)
            .put('/:houseId', this.editHouse)
    }

    async createHouse(request, response, next) {
        try {
            logger.log('creating house', request.body)
            const house = await housesService.createHouse(request.body)
            response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async getHouse(request, response, next) {
        try {
            const houses = await housesService.getHouses()
            response.send(houses)
        } catch (error) {
            next(error)
        }
    }
    async getHouseById(request, response, next) {
        try {
            const house = await housesService.getHouseById(request.params.houseId)
            response.send(house)
        } catch (error) {
            next(error)
        }
    }
    async removeHouse(request, response, next) {
        try {
            const message = await housesService.removeHouse(request.params.houseId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async editHouse(request, response, next) {
        try {
            const updates = request.body
            const house = await housesService.editHouse(request.params.houseId, updates)
            response.send(house)
        } catch (error) {
            next(error)
        }
    }
}