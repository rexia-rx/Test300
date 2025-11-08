import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Units } from '@prisma/client';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Display name cannot be empty' })
  @MinLength(1, { message: 'Display name must be at least 1 character' })
  displayName?: string | null;

  @IsOptional()
  @IsEnum(Units, { message: 'Invalid preferred units' })
  preferredUnits?: Units;
}
