export class CreateVoucherDto {
    id: number;
    voucherCode: string;
    discountPercentage: number;
    maxDiscountAmount: number;
}