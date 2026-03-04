import localFont from 'next/font/local';

const nunito = localFont({
    src: [
        {
            path: './NunitoSans-ExtraLight.ttf',
            weight: '300',
            style: 'thin',
        },
        {
            path: './NunitoSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './NunitoSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './NunitoSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './NunitoSans-ExtraBold.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
});

export default nunito;
