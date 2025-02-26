import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorDto } from './create-director.dto';

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
{
  /*@IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dob?: Date;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nationality?: string;*/
}
