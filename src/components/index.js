import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import BreadCrumb from './comment/bread-crumb'
import { quillEditor } from 'vue-quill-editor'
import CoverImage from './publiah/cover-image'
import SelectImage from './publiah/select-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 所有自定义组件的插件
export default {
  install (Vue) {
    // alert(1)
    Vue.component('layout-aside', layoutAside) // 注册 左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册头部组件
    Vue.component('bread-crumb', BreadCrumb) // 全局注册一个面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-image', CoverImage)// 注册一个封面组件
    Vue.component('select-image', SelectImage)// 注册一个选择素材组件
  }
}
