import {  Controller, Get, Post, Patch, Put, Delete, Body, Param, Query} from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateMenuDto } from "./dto/create_menu.dto";
import { CreateMenuItemDto } from "./dto/create_menu_item.dto";
import { CreateVoucherDto } from "./dto/create_voucher.dto";
import { UpdateRestaurantProfileDto } from "./dto/update_resturant_profile.dto";

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

    @Get('getbyid/:id')
    getRestaurantById(@Param('id') id: string):object {
        return this.restaurantService.getRestaurantById(id);
    }

    @Post('menu')
    createMenu(@Body() createMenuDto: CreateMenuDto):object {
        return this.restaurantService.createMenu(createMenuDto);
    }       

    @Post('menu-item')
    createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto):object {
        return this.restaurantService.createMenuItem(createMenuItemDto);
    }

    @Put('profile')
    updateRestaurantProfile(@Body() updateRestaurantProfileDto: UpdateRestaurantProfileDto):object {
        return this.restaurantService.updateRestaurantProfile(updateRestaurantProfileDto);
    }

    @Patch('menu-item/:id/disable')
    disableMenuItem(@Param('id') id: string):object {
        return this.restaurantService.disableMenuItem(id);
    }

    @Get('orders')
    getOrders(@Query('status') status: string):object{
        return this.restaurantService.getOrdersByStatus(status);
    }

    @Post('voucher')
    createVoucher(@Body() createVoucherDto: CreateVoucherDto):object {
        return this.restaurantService.createVoucher(createVoucherDto);
    }

    @Delete('voucher/:id')
    deleteVoucher(@Param('id') id: string):object {
        return this.restaurantService.deleteVoucher(id);
    }
}