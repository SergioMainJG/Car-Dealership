import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto/'; 

@Controller('cars')
// @UsePipes( ValidationPipe ) a nivel de archivo/controlador
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({version: '4'})) id:string ){
        console.log({ id });
        return this.carsService.findOneById( id );
    }

    @Post()
    // @UsePipes( ValidationPipe ) para un solo método
    createCar( @Body() createCarDto: CreateCarDTO ){
        console.log({createCarDto});
        return this.carsService.create( createCarDto );;
    }
    
    @Patch(':id')
    modifyCar( 
        @Param('id',  new ParseUUIDPipe({version: '4'})) id: string,
        @Body() updateCarDto: UpdateCarDTO )
    {
        return this.carsService.update( id,updateCarDto);
    }
    
    @Delete(':id')
    deleteCar( 
        @Param('id',  new ParseUUIDPipe({version: '4'})) id: string)
        {
        return this.carsService.delete( id );
    }
}
