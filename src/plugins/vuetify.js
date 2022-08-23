import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
// import Vuetify from 'vuetify'
// import Vuetify from 'vuetify/lib'
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    theme: {
        dark: false,
        light: true,
        themes: {
            light: {
                primary: "#81D6CF",
                // primary: "#81D6CF",
                // primary: "#00BCD4",
                // primary: '#1976D2',
                // primary: '#2E2E2E',
                // primary: '#00205B',
                // primary: '#D24406',
                secondary: '#C9CCD5',
                third: '9D9D9D',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            },
            dark: {
                primary: "#FF205B",
            },
        }
    }
});
