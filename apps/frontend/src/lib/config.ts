export interface FrontendConfig {
  apiBaseUrl: string;
}

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1';
const SUPPORTED_PROTOCOLS = new Set(['http:', 'https:']);

const sanitise = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

const stripTrailingSlash = (value: string): string =>
  value.replace(/\/+$/, '');

const shouldWarn = (): boolean => typeof window === 'undefined';

const buildWarning = (message: string): void => {
  if (shouldWarn()) {
    console.warn('frontend_config_load_warning', message);
  }
};

const resolveNodeEnv = (env: NodeJS.ProcessEnv): string =>
  env.NODE_ENV ?? process.env.NODE_ENV ?? 'development';

const resolveBaseUrl = (
  rawValue: string | undefined,
  env: NodeJS.ProcessEnv
): string => {
  const sanitised = sanitise(rawValue);
  const nodeEnv = resolveNodeEnv(env);

  if (!sanitised) {
    if (nodeEnv === 'production') {
      throw new Error('NEXT_PUBLIC_API_BASE_URL must be provided in production environments.');
    }

    buildWarning(
      'NEXT_PUBLIC_API_BASE_URL is not set. Falling back to default http://localhost:3000/api/v1'
    );
    return DEFAULT_API_BASE_URL;
  }

  try {
    const parsed = new URL(sanitised);

    if (!SUPPORTED_PROTOCOLS.has(parsed.protocol)) {
      throw new Error(`Unsupported protocol: ${parsed.protocol}`);
    }

    return stripTrailingSlash(parsed.toString());
  } catch (error) {
    if (nodeEnv === 'production') {
      throw new Error(
        `NEXT_PUBLIC_API_BASE_URL is invalid: ${sanitised}. ${(error as Error).message}`
      );
    }

    buildWarning(
      `NEXT_PUBLIC_API_BASE_URL is invalid: ${sanitised}. Falling back to default http://localhost:3000/api/v1`
    );
    return DEFAULT_API_BASE_URL;
  }
};

export const createConfig = (
  env: NodeJS.ProcessEnv = process.env
): FrontendConfig => ({
  apiBaseUrl: resolveBaseUrl(env.NEXT_PUBLIC_API_BASE_URL, env)
});

export const config = createConfig();
