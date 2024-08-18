import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import exp from 'constants';
import { UpdateCatsDto, CreateCatsDto } from './dto/cats.dtos';


const mockCatsService = {
    createCat: jest.fn(),
    getCats: jest.fn(),
    findCatById: jest.fn(),
    updateCatById: jest.fn(),
    removeCat: jest.fn(),
  };

  describe('CatsController', () => {
      let controller: CatsController;
    
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [CatsController],
          providers: [
            {
              provide: CatsService,
              useValue: mockCatsService,
            },
          ],        }).compile();
    
        controller = module.get<CatsController>(CatsController);
      });
    
      it('getCats -> should return data of all cats', async() => {
        //arrange
        const cat= {
            "id": 2,
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        const cats=[cat]
        jest.spyOn(mockCatsService, 'getCats').mockReturnValue(cats);

        //act
        const result = await controller.getCats()

        //assert 
        expect(result).toEqual(cats);
        expect(mockCatsService.getCats).toHaveBeenCalled()
      });
      it('findCatById -> should find a cat with the specified id', async() => {

        //arrange
        const id= 2
        const cat= {
            "id": 2,
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        const cats=[cat]
        jest.spyOn(mockCatsService, 'findCatById').mockReturnValue(cat);


        //actuate
        const result = await controller.findCatById(id);

        //assert
        expect(result).toEqual(cat)
        expect(mockCatsService.findCatById).toHaveBeenCalled()
        expect(mockCatsService.findCatById).toHaveBeenCalledWith(id);

      })

      it("updateCat -> updates data of cat with specified id with new data", async() => {
        //arrange
        const id= 2
        const updateCatsDto:UpdateCatsDto= {
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        const cat= {
            "id": 2,
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        jest.spyOn(mockCatsService, 'updateCatById').mockReturnValue(cat);

        //act
        const result = await controller.updateCat(id,updateCatsDto);

        //assert
        expect(mockCatsService.updateCatById).toHaveBeenCalled();
        expect(mockCatsService.updateCatById).toHaveBeenCalledWith(id, updateCatsDto);
        expect(result).toEqual(cat);

      })


      it("createCat -> create a new cat entry", async() => {
        //arrange
        const cat= {
            "id": 2,
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        const createCatsDto:CreateCatsDto= {
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }
        jest.spyOn(mockCatsService, 'createCat').mockReturnValue(cat);

        //act
        const result = await controller.createCat(createCatsDto)

        //assert
        expect(mockCatsService.createCat).toHaveBeenCalled();
        expect(mockCatsService.createCat).toHaveBeenCalledWith(createCatsDto);
        expect(result).toEqual(cat);

      })
      it("remove -> removes cat data of specified id", async() => {
        //arrange
        const id= 2
        const cat= {
            "id": 2,
            "username": "litten",
            "email": "paws@gmail.com",
            "password": "fishesss"
        }

        jest.spyOn(mockCatsService,"removeCat").mockReturnValue(cat)

        //act
        const result = await controller.deleteCat(id);

        //assert
        expect(mockCatsService.removeCat).toHaveBeenCalled();
        expect(mockCatsService.removeCat).toHaveBeenCalledWith(id);
        expect(result).toEqual(cat);

      })
  });
