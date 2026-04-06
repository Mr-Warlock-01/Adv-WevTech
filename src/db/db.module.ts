import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { UserEntity } from '../entities/user.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { RiderEntity } from '../entities/rider.entity';
import { CategoryEntity } from '../entities/category.entity';
import { ItemEntity } from '../entities/item.entity';
import { VoucherEntity } from '../entities/voucher.entity';
import { OrderEntity } from '../entities/order.entity';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { WithdrawRequestEntity } from '../entities/withdraw-request.entity';
import { CODSubmissionEntity } from '../entities/cod-submission.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            RestaurantEntity,
            CustomerEntity,
            RiderEntity,
            CategoryEntity,
            ItemEntity,
            VoucherEntity,
            OrderEntity,
            DeliveryEntity,
            OrderItemEntity,
            WithdrawRequestEntity,
            CODSubmissionEntity,
        ]),
    ],
    exports: [TypeOrmModule],
})
export class DBModule {}
