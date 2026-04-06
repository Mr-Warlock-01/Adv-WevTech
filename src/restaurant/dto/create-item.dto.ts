import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @MaxLength(200)
    description!: string;

    @Min(0)
    @IsNumber()
    price!: number;

    @IsOptional()
    image!: string;

    @IsNumber()
    categoryId!: number;

    @IsNumber()
    restaurantId!: number;

    @IsNumber()
    preparationTime!: number;
}
