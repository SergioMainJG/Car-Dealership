import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCarDTO{
    
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?:    string;
    
    @IsString({ message: `The brand most be a string`})
    @IsOptional()
    readonly brand?: string;
    
    @IsString({ message: `The brand most be a string`})
    @MinLength(3)
    @IsOptional()
    readonly model?: string;
}