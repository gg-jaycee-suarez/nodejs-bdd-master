const axios = require('axios');
const { head } = require('lodash');

const getData = (url, request_headers) => {
    try {
        console.log(url);
        return axios.get(url, {headers: request_headers});
    } catch (e) {
        console.error('exception occurred while GET', e);
        throw e;
    }
}

// TODO: Update here
const send = (method, url, ...kwargs) => {

}

const postData = (url, data, request_headers) => {
    try {
        return axios.post(url, data, {headers: request_headers});
    } catch (e) {
        console.error('exception occurred while POST', e);
        throw e;
    }
}

const patchData = async (url, data) => {
    try {
        return await axios.patch(url, data);
    } catch (e) {
        console.error('exception occurred while PATCH', e);
        throw e;
    }
}

const deleteData = async (url, data) => {
    try {
        return await axios.delete(url);
    } catch (e) {
        console.error('exception occurred while DELETE', e);
        throw e;
    }
}

const sendPostRequest = (url, data, options) =>{
    function postSend(url, data, options){
        axios.post(url, data, {headers: options})
        .then(response => {
            const res = response;
            console.log(res.status);
            return response;
            //this.context['log_in_response'] = res.data.JSON;
           // this.context['response_status_code'] = res;
        
        })
        .catch(error => {
            if (error.response) {
                //response status is an error code
                console.log('error status code: '+ error.response.status);
                //this.context['response_status_code'] = error.response.status;
            }
            else if (error.request) {
                //response not received though the request was sent
                console.log(error.request);
            }
            else {
                //an error occurred when setting up the request
                console.log(error.message);
            }
        });

    }
        
}

module.exports = {
    sendPostRequest,
    getData,
    postData,
    patchData,
    deleteData
}
