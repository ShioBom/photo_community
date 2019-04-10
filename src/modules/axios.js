import { Component } from 'react';
import axios from 'axios';
Component.prototype.$axios=axios;

axios.create({
    baseURL: 'http:127.0.0.1/',
})