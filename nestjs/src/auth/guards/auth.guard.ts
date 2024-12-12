
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);
    constructor(private jwtService: JwtService) {

    }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            this.logger.warn('No token provided in request headers');
            throw new UnauthorizedException('Invalid token');
        }
        try {
            const payload = this.jwtService.verify(token);
            request.user = payload.userId;
        } catch (e) {
            this.logger.error(e.message);
            if (e.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }
        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}