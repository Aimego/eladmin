import Vue from 'vue'
export default function confirm(message, title) {
    return Vue.prototype.$confirm(message, title, {
        confirmButtonText: '确实',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
    })
}