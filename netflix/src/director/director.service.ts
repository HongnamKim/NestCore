import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from './entity/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  findAll() {
    return this.directorRepository.find();
  }

  findOne(id: number) {
    return this.directorRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(createDirectorDto: CreateDirectorDto) {
    return this.directorRepository.save(createDirectorDto);
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const director = this.directorRepository.findOne({
      where: {
        id,
      },
    });

    if (!director) {
      throw new NotFoundException('Not Found');
    }

    await this.directorRepository.update(
      {
        id,
      },
      {
        ...updateDirectorDto,
      },
    );

    return this.directorRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const director = await this.directorRepository.findOne({
      where: {
        id,
      },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID의 감독입니다.');
    }

    await this.directorRepository.delete({ id });

    return id;
  }
}
