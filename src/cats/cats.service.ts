import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from '../typeorm/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatsDto, UpdateCatsDto } from './dto/cats.dtos';
import { Auth } from 'src/typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  getCats(): Promise<Cat[]> {
    return this.catRepository.find({
      relations: ['owner'], // Ensure this line is correct
    });
   }
  

  async createCat(createCatsDto: CreateCatsDto, ownerId:number) {
    const user= await this.authRepository.findOneBy({id:ownerId});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cat= this.catRepository.create({
      ...createCatsDto,
      owner: user, // Associate the owner with the cat
    });
    return this.catRepository.save(cat);

  }
      
  findCatById(id: number) {
    return this.catRepository.findOneBy({id});
  }
  async findCatByName(name: string): Promise<Cat|undefined> {
    return this.catRepository.findOneBy({name});
  }
  
  async updateCatById(id: number, updateCatsDto:UpdateCatsDto, ownerId:number) {
    const catData= await this.catRepository.findOneBy({id});

      if (ownerId!=catData.id) {
        return 'Unatuhorized.';
      }   
    await this.catRepository.update(id, updateCatsDto)

    return this.catRepository.findOneBy({id});
  }

  async removeCat(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {

        return 'Cat not found'
    }
    await this.catRepository.delete(id);
    return cat; // Return the cat that was removed
}
}