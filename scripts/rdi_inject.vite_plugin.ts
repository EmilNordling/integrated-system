import type { Plugin } from 'vite';

const FILENAME_REGEX = /.(service|controller).(ts|tsx)/i;

export default function rdiInject(): Plugin {
  return {
    name: 'vite:rdi-inject',
    transform(src, id) {
      if (FILENAME_REGEX.test(id)) {
        const _ = this.parse(src);

        return {
          code: src,
          map: null,
        };
      }
    },
  };
}
