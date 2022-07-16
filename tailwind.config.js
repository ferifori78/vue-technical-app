module.exports = {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
        theme: {
            // container: {
            //     padding: {
            //         DEFAULT: '1rem',
            //         sm: '2rem',
            //         lg: '4rem',
            //         xl: '5rem',
            //         '2xl': '6rem',
            //     },
            // },
            screens: {
                sm: '480px',
                md: '768px',
                lg: '1024px',
                xl: '1440px',
            },
            colors: {
                transparent: 'transparent',
                black: '#000',
                white: '#fff',
                gray: {
                    100: '#F1F1F1',
                    300: '#E2E2E2',
                    500: '',
                    700: '',
                    900: '#C4C4C4',
                },
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif']
            },
            extend: {
                spacing: {
                    0: '0',
                    0.5: '0.125rem',
                    1: '0.25rem',
                    1.5: '0.375rem',
                    2: '0.5rem',
                    2.5: '0.625rem',
                    3: '0.75rem',
                    3.5: '0.875rem',
                    4: '1rem',
                    5: '1.25rem',
                    6: '1.5rem',
                    7: '1.75rem',
                    8: '2rem',
                    9: '2.25rem',
                    10: '2.5rem',
                    11: '2.75rem',
                    12: '3rem',
                    14: '3.5rem',
                    16: '4rem',
                    20: '5rem',
                    24: '6rem',
                    28: '7rem',
                    32: '8rem',
                    36: '9rem',
                    40: '10rem',
                    44: '11rem',
                    48: '12rem',
                    52: '13rem',
                    56: '14rem',
                    60: '15rem',
                    64: '16rem',
                    72: '18rem',
                    80: '20rem',
                    96: '24rem',
                },
                borderRadius: {
                    '4xl': '2rem',
                },
                borderWidth: {
                    1: '1px'
                }
            }
        },
    plugins: [
        require('flowbite/plugin')
    ]
}