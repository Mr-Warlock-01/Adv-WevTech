import {  Controller, Get, Post, Patch, Put, Delete, Body, Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, BadRequestException, ParseIntPipe, UseGuards} from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { diskStorage, MulterError } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from 'express';
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { RestaurantGuard } from "./restaurant.guard";
import { AuthGuard } from "../auth/auth.guard";
//get       ++
//post      ++
//put       +
//patch     +
//delete    +
//query     +
//param     +++
//body      +++

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService){}

    //CREATE RESTURENT
    @Post('restaurants')
    @UsePipes(new ValidationPipe())
    async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto,): Promise<object> {
        return this.restaurantService.createRestaurant(createRestaurantDto);
    }

    //GET RESTURENT BY ID
    @UseGuards(AuthGuard, RestaurantGuard)
    @Get('restaurants/:id')
    async getRestaurantById(@Param('id', ParseIntPipe) userId: number):Promise<object> {
        return this.restaurantService.getRestaurantById(userId);
    }

    //UPDATE RESTURENT
    @UseGuards(AuthGuard, RestaurantGuard)
    @Put('restaurants/:id')
    @UsePipes(new ValidationPipe())
    async updateRestaurant(
        @Param('id', ParseIntPipe) resturantId: number,
        @Body() UpdateRestaurantDto: UpdateRestaurantDto
    ):Promise<object> {
        return this.restaurantService.updateRestaurant(resturantId, UpdateRestaurantDto);
    }
 
    //CREATE CATEGORY
    @UseGuards(AuthGuard, RestaurantGuard)
    @Post('restaurants/category')
    @UsePipes(new ValidationPipe())
    createCategory(@Body() createCategoryDto: CreateCategoryDto):Promise<object> {
        return this.restaurantService.createCategory(createCategoryDto);
    }       

    //GET CATEGORIES BY RESTURENT ID WITH ITEMS
    @UseGuards(AuthGuard, RestaurantGuard)
    @Get('restaurantcategories/:id')
    async getCategoriesByRestaurant(@Param('id', ParseIntPipe) restaurantId: number): Promise<object> {
        return this.restaurantService.getCategoriesByRestaurantId(restaurantId);
    }

    //UPDATE CATEGORY BY RESTURENT ID ans CATEGORY ID
    @UseGuards(AuthGuard, RestaurantGuard)
    @Patch('category/:restaurantId/:categoryId')
    @UsePipes(new ValidationPipe())
    async updateCategoryByRestaurant(
        @Param('restaurantId', ParseIntPipe) restaurantId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.restaurantService.updateCategoryByRestaurant(restaurantId,categoryId,updateCategoryDto,
        );
    }

    //DELETE CATEGORY BY RESTURENT ID ans CATEGORY ID
    @UseGuards(AuthGuard, RestaurantGuard)
    @Delete('category/:restaurantId/:categoryId')
    async deleteCategoryByRestaurant(
        @Param('restaurantId', ParseIntPipe) restaurantId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return this.restaurantService.deleteCategoryByRestaurant(restaurantId,categoryId,);
    }


    // @Post('items')
    // @UsePipes(new ValidationPipe({transform: true}))
    // @UseInterceptors(
    //     FileInterceptor('image', {
    //     fileFilter: (req, file, cb) => {
    //         if (file.originalname.match(/^.*\.(jpg|jpeg|png)$/)) {
    //         cb(null, true);
    //         } else {
    //         cb(new BadRequestException('Only JPG, JPEG, PNG allowed'), false);
    //         }
    //     },
    //     limits: { fileSize: 2 * 1024 * 1024 },
    //     storage: diskStorage({
    //         destination: './uploads',
    //         filename: (req, file, cb) => {
    //         const filename = `${Date.now()}-${file.originalname}`;
    //         cb(null, filename);
    //         },
    //     }),
    //     }),
    // )
    // async createItem(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() createItemDto: CreateItemDto,
    // ) {
    //     let imageUrl: string = '';

    //     if (file) {
    //         imageUrl = `/${file.filename}`;
    //     }
    //     return this.restaurantService.create(createItemDto, imageUrl);
    // }

    //CREATE VOUCHER
    @UseGuards(AuthGuard, RestaurantGuard)
    @Post('voucher')
    @UsePipes(new ValidationPipe())
    async createVoucher(@Body() createVoucherDto: CreateVoucherDto): Promise<object> {
        return this.restaurantService.createVoucher(createVoucherDto);
    }

    //DELETE VOUCHER
    @UseGuards(AuthGuard, RestaurantGuard)
    @Delete('voucher/:id')
    async deleteVoucher(@Param('id') id: string): Promise<object> {
        return this.restaurantService.deleteVoucher(+id);
    }    

    //GET VOUCHERS BY RESTURENT ID
    @UseGuards(AuthGuard, RestaurantGuard)
    @Get('voucher/:id')
    async getVouchersByRestaurant(@Param('id', ParseIntPipe) id: string,): Promise<object> {
        return this.restaurantService.getVouchersByRestaurant(+id);
    }











    

    @Post('upload')
    @UsePipes(new ValidationPipe())
    @UseInterceptors (FileInterceptor('myfile',
        { fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|jpeg)$/)){
                cb(null, true);
            }
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                // cb(new BadRequestException('Cant Accept'), false);
            }
        },
        limits: { fileSize: 2*1024*1024 },
        storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb){
                cb(null,Date.now()+file.originalname)
            },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return { success: true, 
            filename: file.filename,
            message: 'File uploaded successfully' 
        };
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res: Response) {
        res.sendFile(name,{ root: './uploads' })
    }

}