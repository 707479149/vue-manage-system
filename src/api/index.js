import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/device/list',
        method: 'get',
        params: query
    });
};

export const AddDevice = data => {
    return request({
        url: '/device/add',
        method: 'POST',
        data: data
    });
};

export const UpdateDevice = data => {
    return request({
        url: '/device/update',
        method: 'POST',
        data: data
    });
};

export const GetDeviceDetail = query => {
    return request({
        url: '/device/detail',
        method: 'get',
        params: query
    })
}

export const getOrderList = query => {
    return request({
        url: '/order/list',
        method: 'get',
        params: query
    });
};

export const DeviceOp = data => {
    return request({
        url: '/device/op',
        method: 'post',
        data: data
    });
}

