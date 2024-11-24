import { createApp } from 'vue'
// Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VTreeview } from 'vuetify/labs/VTreeview'

// Components
import App from './App.vue'


const vuetify = createVuetify({
  components: {
    ...components,
    VTreeview
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

createApp(App).use(vuetify).mount('#app')