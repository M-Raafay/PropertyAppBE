import { IsBase64, IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "@nestjs/class-validator"
import { UserRole } from "@prisma/client"
import { Transform } from "class-transformer"

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastName:string

    // @IsNotEmpty()
    // @IsString()
    // @MinLength(10)
    // address:string

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    contactNumber:string

    @IsString()
    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    email:string

//     @IsNotEmpty()
//     @IsString()
//     @Matches(
//     /^(?=[A-Za-z0-9@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]+$)(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]).{8,}$/,
//     {
//         message:
//         'Password should contain at least 8 characters with 1 special character and 1 number',
//     }
//    )
//     password:string

    @IsNotEmpty()
    @IsString()
    @IsIn(["Owner", "GeneralUser"], { message: 'role field must be either "Owner" or "GeneralUser"' })
    role:UserRole

    @IsNotEmpty()
    @IsBase64()
    profileImage: string

}
