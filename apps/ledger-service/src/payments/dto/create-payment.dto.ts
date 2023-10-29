import { z } from "zod";

export class CreatePaymentDto {
  success: boolean = false;
  amount: number;
  receiverId: number;
  senderId: number;

  private readonly schema = z.object({
    amount: z.number(),
    receiverId: z.number(),
    senderId: z.number(),
  });

  constructor(payload: unknown) {
    const parsedCreateUserDto = this.schema.safeParse(payload);

    this.success = parsedCreateUserDto.success;

    if (!parsedCreateUserDto.success) return;

    this.success = true;

    this.amount = parsedCreateUserDto.data.amount;
    this.receiverId = parsedCreateUserDto.data.receiverId;
    this.senderId = parsedCreateUserDto.data.senderId;
  }
}
