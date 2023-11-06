import { register } from 'tsconfig-paths';

import { compilerOptions } from './tsconfig.json';

const baseUrl = './dist';
register({
  baseUrl,
  paths: compilerOptions.paths,
});
