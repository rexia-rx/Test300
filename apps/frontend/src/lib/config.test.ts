import { createConfig } from './config';

describe('config', () => {
  const originalEnv = process.env;
  let warnSpy: jest.SpyInstance;
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    warnSpy.mockRestore();
    process.env = { ...originalEnv };
    globalThis.window = originalWindow;
  });

  const removeWindow = () => {
    // simulate server-side execution where window is not available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error – we intentionally remove window for server-only scenarios
    delete globalThis.window;
  };

  it('returns env value when NEXT_PUBLIC_API_BASE_URL is set', () => {
    const config = createConfig({
      NEXT_PUBLIC_API_BASE_URL: 'https://example.com/api'
    } as NodeJS.ProcessEnv);

    expect(config.apiBaseUrl).toBe('https://example.com/api');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('falls back to default and logs a warning when env var missing in non-production', () => {
    removeWindow();

    const config = createConfig({} as NodeJS.ProcessEnv);

    expect(config.apiBaseUrl).toBe('http://localhost:3000/api/v1');
    expect(warnSpy).toHaveBeenCalledWith(
      'frontend_config_load_warning',
      'NEXT_PUBLIC_API_BASE_URL is not set. Falling back to default http://localhost:3000/api/v1'
    );
  });

  it('throws when env var missing in production', () => {
    expect(() =>
      createConfig({ NODE_ENV: 'production' } as NodeJS.ProcessEnv)
    ).toThrowError('NEXT_PUBLIC_API_BASE_URL must be provided in production environments.');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('normalises url and removes trailing slashes', () => {
    const config = createConfig({
      NEXT_PUBLIC_API_BASE_URL: 'https://example.com/api/'
    } as NodeJS.ProcessEnv);

    expect(config.apiBaseUrl).toBe('https://example.com/api');
  });

  it('falls back to default when invalid url provided outside production', () => {
    removeWindow();

    const config = createConfig({
      NEXT_PUBLIC_API_BASE_URL: 'not-a-url'
    } as NodeJS.ProcessEnv);

    expect(config.apiBaseUrl).toBe('http://localhost:3000/api/v1');
    expect(warnSpy).toHaveBeenCalledWith(
      'frontend_config_load_warning',
      'NEXT_PUBLIC_API_BASE_URL is invalid: not-a-url. Falling back to default http://localhost:3000/api/v1'
    );
  });

  it('throws when invalid url provided in production', () => {
    expect(() =>
      createConfig({
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_BASE_URL: 'ftp://example.com'
      } as NodeJS.ProcessEnv)
    ).toThrowError('NEXT_PUBLIC_API_BASE_URL is invalid: ftp://example.com. Unsupported protocol: ftp:');
  });
});
