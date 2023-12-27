import { test, expect, APIRequestContext } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { RoomType, RoomFeatures, getRoomFeaturesAsAList } from '../pages/RoomsPage'


export class RoomApi extends BaseApi{
    constructor(request: APIRequestContext){
        super(request)
    }

    async createARoom(roomName: string, roomType: RoomType, roomIsAccessible: boolean, roomFeatures: RoomFeatures, roomPrice: number,){
        const response = await this.request.post('https://automationintesting.online/room/', {
            data: {
              roomName: roomName,
              type: roomType,
              accessible: roomIsAccessible.toString(),
              features: getRoomFeaturesAsAList(roomFeatures),
              roomPrice: roomPrice.toString()
            
            }
        })
        expect(response.status(), `${roomType} Room with name '${roomName}' is created`).toBe(201);
    }
}
