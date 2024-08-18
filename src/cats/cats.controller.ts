import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Request,

    } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { CreateCatsDto, UpdateCatsDto } from './dto/cats.dtos';
import { CatsService } from './cats.service';
import { AuthGuard } from '../auth/auth.guard';  
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}
    @Get()
    getCats() {
      return this.catsService.getCats();
    }

    @Get(':id')
    findCatById(@Param('id') id: number) {
      return this.catsService.findCatById(id);
    }

    @UseGuards(AuthGuard)  
    @Put(':id')
    async updateCat(@Param('id') id: number, @Body() updateCatsDto: UpdateCatsDto, @Request() request:Request){
        const cat= request['user'];
        const ownerId= cat.sub;   
        return await this.catsService.updateCatById(id, updateCatsDto,ownerId);
   } 

    @UseGuards(AuthGuard)  
    @Post()
    createCat(@Body() createCatsDto: CreateCatsDto, @Request()request: Request) {
      const cat= request['user'];
      
      const ownerId=cat.sub;
      return this.catsService.createCat(createCatsDto,ownerId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard,RolesGuard)  
    @Roles(Role.User)
    deleteCat(@Param('id') id: number){
      return this.catsService.removeCat(id)
    }


}