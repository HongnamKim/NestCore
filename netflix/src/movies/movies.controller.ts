import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTitleValidationPipe } from './pipe/movie-title-validation.pipe';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query('title', MovieTitleValidationPipe) title?: string) {
    return this.moviesService.findAll(title);
  }

  @Get(':id')
  getMovie(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.moviesService.findOne(id);
  }

  @Post()
  postMovie(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @Patch(':id')
  patchMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, body);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.deleteMovie(id);
  }
}
