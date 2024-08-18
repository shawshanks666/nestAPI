import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { Cat } from '../typeorm/cat.entity';
import { CreateCatsDto, UpdateCatsDto } from './dto/cats.dtos';

describe("CatsService", ()=>{
    let service: CatsService;

    const mockCatRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      };


      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CatsService,
            {
              provide: getRepositoryToken(Cat),
              useValue: mockCatRepository,
            },
          ],
        }).compile();
    
        service = module.get<CatsService>(CatsService);
      });
    
      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    
      it('create -> Should create a new cat and return its data', async() => {
           // arrange
    const createCatsDto: CreateCatsDto = {
        username: 'Chadwick',
        password: 'Boseman',
        email: 'chadwickboseman@email.com',
      } ;
  
      const cat: Cat = {
        id: Date.now(),
        username: 'Chadwick',
        password: 'Boseman',
        email: 'chadwickboseman@email.com',
      };
  
      jest.spyOn(mockCatRepository, 'save').mockReturnValue(cat);
  
      // act
      const result = await service.createCat(createCatsDto);
  
      // assert
      expect(mockCatRepository.save).toHaveBeenCalled();
      expect(mockCatRepository.save).toHaveBeenCalledWith(createCatsDto);
  
      expect(result).toEqual(cat);

      });
    
      it('find -> should return an array of user', async () => {
        //arrange
        const cat: Cat = {
          id: Date.now(),
          username: 'Chadwick',
          password: 'Boseman',
          email: 'chadwickboseman@email.com',
        };
        const cats = [cat,cat];
        jest.spyOn(mockCatRepository, 'find').mockReturnValue(cats);
    
        //act
        const result = await service.getCats();
    
        // assert
        expect(result).toEqual(cats);
        expect(mockCatRepository.find).toHaveBeenCalled();
      });      

      it('findOne', async() => {

        //arrange
        const num= 1
        const cat: Cat = {
            id: num,
            username: 'Chadwick',
            password: 'Boseman',
            email: 'chadwickboseman@email.com',
          };
          jest.spyOn(mockCatRepository, 'findOneBy').mockReturnValue(cat);

          //act
          const result= await service.findCatById(num)

          // assert
          expect(result).toEqual(cat);
          expect(mockCatRepository.findOneBy).toHaveBeenCalled();


      });
      it('findOneByName', async() => {

        //arrange
        const username= 'kitten'
        const cat: Cat = {
            id: 1,
            username: 'kitten',
            password: 'heavypaws',
            email: 'cat123@email.com',
          };
          jest.spyOn(mockCatRepository, 'findOneBy').mockReturnValue(cat);

          //act
          const result= await service.findCatById(1)

          // assert
          expect(result).toEqual(cat);
          expect(mockCatRepository.findOneBy).toHaveBeenCalled();


      });
      it('update', async() => {

        //arrange
        const id= 1

        const updateCatsDto: UpdateCatsDto = {
            username: 'kitten',
        }
          const cat: Cat = {
            id: 1,
            username: 'kitten',
            password: 'heavypaws',
            email: 'cat123@email.com',
          };
        
        jest.spyOn(mockCatRepository, 'update').mockReturnValue(cat);
  
        // act
        const result = await service.updateCatById(id, updateCatsDto);

        // assert
        expect(mockCatRepository.update).toHaveBeenCalled();
        expect(mockCatRepository.update).toHaveBeenCalledWith(id, updateCatsDto);
        expect(mockCatRepository.findOneBy).toHaveBeenCalled();
        expect(result).toEqual(cat);
        
      });
      it('remove', async() => {
        const id = 1;
        const cat = {
          id: 1,
          username: 'Chadwick',
          password: 'Boseman',
          email: 'chadwickboseman@email.com',
        };
    
        jest.spyOn(mockCatRepository, 'delete').mockReturnValue(cat);
    
        //act
        const result = await service.removeCat(id);
    
        expect(mockCatRepository.delete).toHaveBeenCalled();
        expect(mockCatRepository.delete).toHaveBeenCalledWith(id);
      });
    });
