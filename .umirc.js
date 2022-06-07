// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  base: './',
  publicPath: './',
  hash: true,
  routes: [
    {
      path: '/',
      // component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
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
