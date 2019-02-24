import axios from './index'
const deleteProfile = (id) => {
    return axios.request({
        url: `/apis/profile/delete/${id}`,
        method: 'delete'
    })
}

export {
    deleteProfile
}