import {ThemeConfig} from 'antd';

export const themeConfig: ThemeConfig = {
    token: {
        controlHeight: 45,
        controlPaddingHorizontal: 100,
        controlPaddingHorizontalSM: 100,
        padding: 100,
        colorPrimary: '#2BAAE2',
        borderRadius: 28
    },
    components: {
        Input: {
            borderRadius: 28,
            controlHeight: 54,
            controlPaddingHorizontal: 100,
            controlPaddingHorizontalSM: 100,
            padding: 100,
        },
        Select: {
            borderRadius: 28,
            paddingLG:15,
            paddingMD:15,
            paddingSM:15,
            padding:15,
            paddingContentHorizontal:15,
            optionPadding:'10px'
        },
        Pagination: {
            itemActiveBg: '#2BAAE2',
            colorBorder: '#2BAAE2',
            itemLinkBg: 'red'
        }
    },
};
