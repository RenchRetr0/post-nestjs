import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRole } from "../user/enums/user.enum";

import { UserService } from "../user/user.service";

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor (private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if(request?.user) {

            const { id, password } = request.user;

            const user = await this.userService.findOneId(id);

            if (user.role == UserRole.ADMIN) {
                return true;
            }

            return false;
        }

        return true;
    }

}