// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  base: './',
  publicPath: './',
  hash: true,
  routes: [
    {
      path: '/',
      routes: [{ path: '/', component: '../pages/index' }],
    },
    {
      path: '/detail',
      routes: [{ path: '/detail', component: '../pages/Detail' }],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'reverseTest',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
