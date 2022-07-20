const {Given, When, Then, AfterAll, After} = require('cucumber');
const assert = require('assert').strict
const restHelper = require('./../util/restHelper');
const axios = require('axios');

Given('I have an existing user', function () {
    this.context['log_in_request'] = {
        'loginType': 'SMS_OTP',
         'mobileNumber': '6282218622827', 
         'messagingType': 'SMS'
    };
 
    const request = this.context['log_in_request'];
    // this.attach(JSON.stringify( request )
    // , 'application/json');

     this.attach('[request body] ' + JSON.stringify(this.context['log_in_request'], undefined, 4));
});


When('I login to Gaji Gesa',  async function () {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': 12345678,
        'User-Agent': 'PostmanRuntime/7.29.0'
    };
   
     
    this.context['response'] =  await restHelper.postData(`${process.env.GAJI_GESA_BASE_URL}/auth/login`, JSON.stringify(this.context['log_in_request']), headers);
    this.attach('[method] ' + 'post');
    this.attach('[url] ' + `${process.env.GAJI_GESA_BASE_URL}/auth/login`)
    this.attach('[headers] ' + JSON.stringify(headers, undefined, 4));
    this.attach('[request body] ' + JSON.stringify(this.context['log_in_request']), undefined, 4);
});

Then('user get OTP response code {int}', async function (code) {
    assert.equal(this.context['response'].status, code);
});


Then('the user have the otp token', async function () {
    this.context['otp_token'] = this.context['response'].data.data.token;
    assert.notEqual(this.context['response'].data.data.token, "");

});



Given('user has to confirm OTP', async function () {
    this.context['confirm_otp_request'] = {
        "token": this.context['otp_token'],
        "otp": 1121
    };
});


When('the user sends the OTP confirmation', async function () {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': `${process.env.GAJI_GESA_ENV_KEY}`,
        'User-Agent': 'PostmanRuntime/7.29.0'
    };
     
    this.context['otp_confirm_response'] =  await restHelper.postData(`${process.env.GAJI_GESA_BASE_URL}/auth/login/otp`, JSON.stringify(this.context['confirm_otp_request']), headers);

});


Then('client access token is created', async function () {
    this.context['client_access_token'] = this.context['otp_confirm_response'].data.data.accessToken;
});

//user wants to get the transaction list using start date {str}, end date {str}, and category {str}
Given('user wants to get the transaction list', async function () {
    this.context['start_date'] = "2022-01-31";
    this.context['end_date'] = "2022-06-31";
    this.context['category_id'] = "wtdr";
});


When('user submits the transaction request', async function () {
    const limit_number = 10;
    const limit_page = 2;

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': `${process.env.GAJI_GESA_ENV_KEY}`,
        'User-Agent': 'PostmanRuntime/7.29.0',
        'Authorization': 'Bearer ' + this.context['client_access_token']
    };
     
    this.context['get_transaction_list_response'] =  await restHelper.
    getData(`${process.env.GAJI_GESA_BASE_URL}/transactions?startDate=${this.context['start_date']}&endDate=${this.context['end_date']}&transCategoryId=${this.context['category_id']}&limit=${limit_number}&page=${limit_page}`, headers);

});


Then('user transaction list is returned', async function () {
    console.log("response: " + this.context['get_transaction_list_response']);
    assert.equal(this.context['get_transaction_list_response'].message, "OK");
});


Given('I add GG points to employee', async function () {
    console.log("test");
});


When('I submit add point request', async function () {
    console.log("test");

});

Then('user has new GG points', async function () {
    console.log("test");
   
});









