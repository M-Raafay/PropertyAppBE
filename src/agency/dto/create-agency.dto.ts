import { IsEmail, IsLatLong, IsNotEmpty, IsPhoneNumber, IsString, IsUrl, MinLength} from "@nestjs/class-validator"
import { Transform } from "class-transformer"
import { Matches } from "class-validator"

export class CreateAgencyDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    address:string

    @IsNotEmpty()
    @IsLatLong({ message: 'Invalid location format' })
    location:string

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{11}$/, { message: 'Invalid phone number' }) 
    contactNo: string;

    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    email :string


    //ownerName:string

    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid logoURL' })
    logoURL:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: 'Invalid facebook URL' })
    facebook:string

    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: 'Invalid instagram URL' })
    instagram:string

    @IsNotEmpty()
    @IsString()
    whatsapp:string

    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: 'Invalid youtube URL' })
    youtube:string

      
}
