import { Request, Response, NextFunction } from 'express';

import { NotFoundException } from '../exceptions/not-found.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { InternalServerErrorException } from '../exceptions/internal-server-error.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ValidationException } from "../exceptions/validation.exception";

const knownExceptions = [
    ValidationException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    InternalServerErrorException,
    ConflictException,
    BadRequestException,
];

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    const knownError = knownExceptions.find((exception) => err instanceof exception);

    if (knownError && (err as any).statusCode) {
        return res.status((err as any).statusCode).json({
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    return res.status(500).json({
        error: 'Etwas ist schiefgelaufen. Bitte versuche es später erneut.',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}
