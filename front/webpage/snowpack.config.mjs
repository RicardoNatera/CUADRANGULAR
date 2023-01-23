/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    /* ... */
    // directory name: 'build directory'
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-react-refresh'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
