import { z } from "zod";

export class CreateUserDto {
    public readonly success: boolean = false;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    private readonly schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    constructor (createUserDto: unknown) {
        const parsedCreateUserDto = this.schema.safeParse(createUserDto);

        this.success = parsedCreateUserDto.success;

        if(!parsedCreateUserDto.success) return;

        this.success = true;
        this.name = parsedCreateUserDto.data.name;
        this.email = parsedCreateUserDto.data.email;
        this.password = parsedCreateUserDto.data.password;
    }
}
