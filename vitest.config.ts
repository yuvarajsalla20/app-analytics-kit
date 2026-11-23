import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const stub = (name: string) => fileURLToPath(new URL(`./tests/stubs/${name}.ts`, import.meta.url));

// The tests check what the kit sends, not the phone: OpenPanel, React and the storage are replaced by small stand-ins.
export default defineConfig({
  resolve: {
    alias: {
      '@openpanel/react-native': stub('openpanel'),
      '@react-native-async-storage/async-storage': stub('storage'),
      react: stub('react'),
      'react-native': stub('react-native'),
      'firebase/firestore': stub('firestore'),
    },
  },
  test: { include: ['tests/**/*.test.ts'] },
});
