import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
  Min,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { isArray } from 'util';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['products']),
) {}

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;
}

export class AddProductsToUserDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
