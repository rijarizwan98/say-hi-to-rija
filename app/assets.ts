import { createAssetServer } from 'remix/assets'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = process.cwd()

export const assetServer = createAssetServer({
  basePath: '/assets',
  rootDir,
  fileMap: {
    'app/*path': 'app/*path',
    'node_modules/*path': 'node_modules/*path',
  },
  allow: ['app/assets/**', 'node_modules/**'],
  deny: ['app/**/*.server.*'],
  sourceMaps: isProd ? undefined : 'external',
  minify: isProd,
  watch: isProd ? false : undefined,
  scripts: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    },
  },
})
