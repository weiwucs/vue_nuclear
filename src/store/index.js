import Vue from 'vue'
import Vuex from 'vuex'

// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import DateDefinedWarp from '@/api/DateDefinedWarp'
import store from "element-ui/packages/cascader-panel/src/store";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        currentAppVersion: "1.3.3",
        debugOption: {
            showDeiveInfo: true
        },
        uiController: {
            currentNavigationMode: "FULL",
            isNetWorkMode: true,
            isFreezeWorkflowData: false,
            appFontString: "font-family: Roboto;",  //'Roboto' 'STXingkai' 'SimSun'
        },
        appDefaultTemplateType: DateDefinedWarp.TileStatusType.S_1,

        currentStatus: "ProjectLanding",
        server_url: '',
        userApiPrefix: '/v1/user/',

        viewer: undefined,

        server: {
            ip: 'http://192.168.1.135/',
            port: '8080'
        },
    },
    getters: {
        userApiBaseUrl: state => {
            return state.server_url + state.userApiPrefix;
        }
    },
    mutations: {
        changeStatus(state, statusFlag) {
            state.currentStatus = statusFlag;
        }
    },
    modules: {
        // cart,
        // products
    },
    strict: false
    // plugins: debug ? [createLogger()] : []
})