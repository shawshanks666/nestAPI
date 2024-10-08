import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'roles/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { log } from 'console';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request['user'];  // Access user from request['user']
    
    console.log('User:', user);
    console.log('User Roles:', user?.role);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}