import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/typeorm/auth.entity';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { error } from 'console';
import { hash,compare } from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
      @InjectRepository(Auth)
      private readonly authRepository: Repository<Auth>,
      private jwtService: JwtService
        ){}
    async findAuthByName(username:string):Promise<Auth|undefined> {
      return this.authRepository.findOneBy({username});
    }
    async findAuthByEmail(email:string):Promise<Auth|undefined> {
      return this.authRepository.findOneBy({email});
    }

    async signUp(signUpDto: SignUpDto){

      const acc= await this.findAuthByEmail(signUpDto.email);
      const protectedPassword= await this.hashPassword(signUpDto.password);

      if(acc){
        throw new HttpException('Email is already registered',400);
      }

      return this.authRepository.save({...signUpDto, password:protectedPassword});

    }


    async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.findAuthByName(username);
        if (!user){
          throw new HttpException('Invalid credentials',400);

        }
        const validPassword = await compare(pass, user.password);
        if (!validPassword) {
          throw new HttpException('Invalid credentials',400);
        }

        const payload = { sub: user.id, username: user.username, role:user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      
    async getUserById(id:number){
      return this.authRepository.findOneBy({id});
    }
    
    private hashPassword(password: string): Promise<string> {
      return hash(password, 10);
    }
}
