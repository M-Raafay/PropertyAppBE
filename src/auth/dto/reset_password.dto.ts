import { Transform } from "@nestjs/class-transformer"
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "@nestjs/class-validator"

export class ResetPasswordDto {

    @IsNotEmpty()
    @IsString()
        // remove the match parameter becoz if user created by senior agency members then the password is random generated 
        //also the user will reset password 
    // @Matches(
    // /^(?=[A-Za-z0-9@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]+$)(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]).{8,}$/,
    // {
    //     message:
    //     'Password should contain at least 8 characters with 1 special character and 1 number',
    // }
//    )
    oldPassword:string

    @IsNotEmpty()
    @IsString()
    @Matches(
    /^(?=[A-Za-z0-9@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]+$)(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]).{8,}$/,
    {
        message:
        'Password should contain at least 8 characters with 1 special character and 1 number',
    }
   )
    newPassword:string

    @IsNotEmpty()
    @IsString()
    @Matches(
    /^(?=[A-Za-z0-9@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]+$)(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()+!={}~`_\[\]\'\\/:;,.<>?~"|\-\[\]]).{8,}$/,
    {
        message:
        'Password should contain at least 8 characters with 1 special character and 1 number',
    }
   )
    confirmPassword:string


}
