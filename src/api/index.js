import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://localhost:10004/v1/admin/device/list',
        method: 'get',
        params: query
    });
};

export const AddDevice = data => {
    return request({
        url: 'http://localhost:10004/v1/admin/device/add',
        method: 'POST',
        data: data
    });
};

export const UpdateDevice = data => {
    return request({
        url: 'http://localhost:10004/v1/admin/device/update',
        method: 'POST',
        data: data
    });
};

export const GetDeviceDetail = query => {
    return request({
        url: 'http://localhost:10004/v1/admin/device/detail',
        method: 'get',
        params: query
    })
}
