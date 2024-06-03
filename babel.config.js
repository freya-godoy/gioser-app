/* eslint-disable no-template-curly-in-string */
module.exports = {
    presets: [
        '@babel/env',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/proposal-optional-chaining',
        '@babel/plugin-transform-runtime',
        ['transform-imports', {
            reactstrap: {
                transform: 'reactstrap/lib/${member}',
                preventFullImport: true
            }
        }],
        ['module-extension', {
            mjs: 'js', cjs: 'js'
        }]
    ],
    env: {
        development: {
            plugins: [
                'react-hot-loader/babel',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/proposal-optional-chaining',
                '@babel/plugin-transform-runtime',
                ['transform-imports', {
                    reactstrap: {
                        transform: 'reactstrap/lib/${member}',
                        preventFullImport: true
                    }
                }],
                ['module-extension', {
                    mjs: 'js', cjs: 'js'
                }]
            ]
        },
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }
};
