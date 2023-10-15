import { CSS_VARIABLE } from './constants';
import { getIsMobile } from '.';

const mockGetPropertyValue = jest.fn();
const mockGetComputedStyle = jest
  .fn()
  .mockReturnValue({ getPropertyValue: mockGetPropertyValue });

describe('getIsMobile: invoke case', () => {
  beforeEach(() => {
    Object.assign(global, 'window', Object.create(window));
    global.window.getComputedStyle = mockGetComputedStyle;
  });

  it('called getComputedStyle when environment is browser', () => {
    getIsMobile();
    expect(mockGetComputedStyle).toHaveBeenCalledWith(document.documentElement);
  });

  it('called mockGetPropertyValue when environment is browser', () => {
    getIsMobile();
    expect(mockGetPropertyValue).toHaveBeenCalledWith(CSS_VARIABLE);
  });
});

describe('getIsMobile: fallback case', () => {
  beforeEach(() => {
    Object.assign(global, 'window', Object.create(window));
    global.window.getComputedStyle = mockGetComputedStyle;
  });

  it('return fallback when environment is node', () => {
    Object.assign(global, 'window', undefined);
    const fallback = false;
    expect(getIsMobile(fallback)).toBe(fallback);
  });

  it(`return fallback when ${CSS_VARIABLE} doesn't setup properly`, () => {
    const fallback = true;
    mockGetPropertyValue.mockReturnValueOnce('');
    expect(getIsMobile(fallback)).toBe(fallback);
  });
});

describe('getIsMobile: return value', () => {
  const testCases = [
    {
      mockCSSVariable: 'true',
      expected: true,
    },
    {
      mockCSSVariable: 'false',
      expected: false,
    },
  ];

  test.each(testCases)(
    `return correctly when ${CSS_VARIABLE} setup properly`,
    ({ mockCSSVariable, expected }) => {
      mockGetPropertyValue.mockReturnValueOnce(mockCSSVariable);
      expect(getIsMobile()).toBe(expected);
    }
  );
});
