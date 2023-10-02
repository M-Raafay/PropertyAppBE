import { IsArray, IsEnum, IsIn, IsLatLong, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength } from "@nestjs/class-validator";
import { PropertyAction, PropertyType, UserRole } from "@prisma/client";

export class CreatePropertyDto {
    
    @IsEnum(PropertyType)
    @IsNotEmpty()
    @IsIn(["Residential","Commercial"], { message: 'propertyType field must be either Residential or Commercial ' })
    propertyType: PropertyType;
  
    @IsEnum(PropertyAction)
    @IsNotEmpty()
    @IsIn(["Buy","Rent","Sell"], { message: 'propertyAction field must be either Buy , Rent or Sell ' })
    propertyAction: PropertyAction;
  
    // @IsString()
    // @IsNotEmpty()
    // agencyID: string;
  
    // @IsString()
    // @IsOptional()
    // agencyLogo?: string;
  
    // @IsString()
    // @IsNotEmpty()
    // listedByUserID: string;
  
    // @IsEnum(UserRole)
    // @IsNotEmpty()
    // listedByRole: UserRole;
  
    // @IsString()
    // @IsNotEmpty()
    // listedByContact: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    address: string;
  
    @IsNumber()
    @IsNotEmpty()
    area: number;
  
    @IsObject()
    @IsNotEmpty()
    amenitiesFacilities: Record<string, number>;
  
    @IsString()
    @IsNotEmpty()
    features: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsArray()
    @IsOptional()
    images: string[];
  
    @IsString()
    @IsNotEmpty()
    @MinLength(20)
    description: string;
  
    @IsString()
    @IsNotEmpty()
    @IsLatLong({ message: 'Invalid location format' })
    mapLocation: string;
}
