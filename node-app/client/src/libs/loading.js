import {
    Loading
} from 'element-ui';

let loading
let startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

let endLoading = () => {
    loading.close()
}

export {
    startLoading,
    endLoading
}