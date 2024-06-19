import { BadRequestException, Injectable, Delete } from '@nestjs/common';
import {Car} from './interfaces/car.interface';
import { v4 as uuid} from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cheroke'
        }
    ]

    findAll(){
        return this.cars;
    }

    findOneById( id: string ){
        const car = this.cars.find( car => car.id === id );
        if( !car ) throw new BadRequestException(`Car with id '${id}' not found`);
        return car;
    }

    create( createCarDTO: CreateCarDTO ){
        const car: Car = {
            id: uuid(),
            ...createCarDTO
        }

        this.cars.push( car );
        return car;
    }

    update( id: string, updateCarDto: UpdateCarDTO ){
        
        let carDB = this.findOneById( id );

        if( updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id: '${id}' is not valid inside body`);
           
        this.cars = this.cars.map( car => {
            if( car.id === id ) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,
                }
                return carDB;
            }
            return car;
        });

        return carDB;
    } 

    delete( id: string) {
        let car = this.findOneById(id);
        if( !car) throw new BadRequestException({statusCode: 404, message:`Car with id:'${id} not exists'`});
        this.cars.splice( this.cars.indexOf(car), 1);
        return;
    }


}
