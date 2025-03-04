import { PaginationDto } from '../../common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetMoviesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  title?: string;
}
