import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import messages from './languages'

Vue.use(Vuei18n)

const i18n = new Vuei18n({
  locale: localStorage.lang || 'zh',
  messages
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n
