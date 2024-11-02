import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  getManyMovies(title?: string) {
    return this.movieRepository.find();

    // if (!title) {
    //   return this.movies;
    // }
    //
    // return this.movies.filter((m) => m.title.includes(title));
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return movie;

    // const movie = this.movies.find((movie) => movie.id === +id);
    //
    // if (!movie) {
    //   throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    // }
    //
    // return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
    });

    return movie;

    // const movie: Movie = {
    //   id: this.idCounter++,
    //   ...createMovieDto,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   version: 1,
    // };
    //
    // this.movies.push(movie);
    //
    // return movie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    await this.movieRepository.update({ id: id }, { ...updateMovieDto });

    const newMovie = await this.movieRepository.findOne({
      where: { id },
    });

    return newMovie;
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    await this.movieRepository.delete({ id: id });

    return id;
  }
}
