import axios from 'axios';
import { ZodError } from 'zod';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

const NETWORK_ERROR_STATUS = 0;
const CONTRACT_ERROR_STATUS = 520;

const FIELD_CODE_MESSAGES: Record<string, string> = {
  notFound: 'No account found for this email.',
  incorrectPassword: 'The email or password is incorrect.',
  accountInactive: 'This account is not active yet. Please confirm your email.',
  emailAlreadyExists: 'An account with this email already exists.',
};

function humaniseFieldCode(code: string): string {
  return FIELD_CODE_MESSAGES[code] ?? code;
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'message' in value &&
    typeof (value as ApiError).status === 'number' &&
    typeof (value as ApiError).message === 'string'
  );
}

function defaultMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return 'The request was invalid.';
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return 'You do not have permission to do that.';
    case 404:
      return 'The requested resource was not found.';
    case 422:
      return 'Some of the information provided is invalid.';
    case 429:
      return 'Too many requests. Please slow down and try again.';
    case 500:
      return 'Something went wrong on our end. Please try again.';
    default:
      return 'An unexpected error occurred.';
  }
}

export function fromResponseData(status: number, data: unknown): ApiError {
  if (typeof data === 'object' && data !== null) {
    const body = data as Record<string, unknown>;

    // NestJS validation shape: { status, errors: { field: code } }
    if (body.errors && typeof body.errors === 'object') {
      const rawErrors = body.errors as Record<string, unknown>;
      const errors: Record<string, string> = {};
      for (const [field, code] of Object.entries(rawErrors)) {
        errors[field] = humaniseFieldCode(String(code));
      }
      const firstMessage = Object.values(errors)[0];
      return {
        status,
        message: firstMessage ?? defaultMessageForStatus(status),
        errors,
      };
    }
    if (body.message) {
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : String(body.message);
      return { status, message };
    }
  }

  return { status, message: defaultMessageForStatus(status) };
}

export function normalizeError(error: unknown): ApiError {
  // Check ZodError and axios errors BEFORE isApiError: axios 1.x adds `.status`
  // and `.message` to AxiosError, which passes the isApiError duck-type check.
  if (error instanceof ZodError) {
    return {
      status: CONTRACT_ERROR_STATUS,
      message: 'Received an unexpected response from the server.',
    };
  }

  if (axios.isAxiosError(error)) {
    if (error.response) {
      return fromResponseData(error.response.status, error.response.data);
    }
    return {
      status: NETWORK_ERROR_STATUS,
      message: 'Unable to reach the server. Check your connection and retry.',
    };
  }

  // Plain ApiError (already normalised — e.g. double-catch path).
  if (isApiError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return { status: NETWORK_ERROR_STATUS, message: error.message };
  }

  return {
    status: NETWORK_ERROR_STATUS,
    message: 'An unexpected error occurred.',
  };
}
