export const transition = {
  fast: 'transition-all duration-200',
  base: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',

  colors: 'transition-colors duration-300',
  colorsFast: 'transition-colors duration-150',
  colorsSlow: 'transition-colors duration-500',

  transform: 'transition-transform duration-300',
  transformFast: 'transition-transform duration-200',
  transformSlow: 'transition-transform duration-500 ease-out',
} as const;
