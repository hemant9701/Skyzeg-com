import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/app-error';
import { logger } from '@/infrastructure/logging/logger';

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function created<T>(data: T) {
  return ok(data, 201);
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, message: 'Validation failed', errors: error.flatten() },
      { status: 400 }
    );
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return NextResponse.json(
      {
        success: false,
        message: `Please check the required or invalid fields: ${Object.keys(error.errors).join(', ')}`
      },
      { status: 400 }
    );
  }

  if (isDuplicateKeyError(error)) {
    return NextResponse.json(
      { success: false, message: 'A record with this slug already exists. Please use a unique slug.' },
      { status: 409 }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      { success: false, message: error.message, details: error.details },
      { status: error.statusCode }
    );
  }

  logger.error({ err: error }, 'Unhandled API error');
  return NextResponse.json({ success: false, message: 'Unexpected server error' }, { status: 500 });
}

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
}

export function withApiErrorHandling<TArgs extends unknown[]>(
  handler: (...args: TArgs) => Promise<Response>
) {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (error) {
      return apiError(error);
    }
  };
}
