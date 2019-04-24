import { Component } from 'react';
import axios from 'axios';
Component.prototype.$axios=axios;

// axios.create();
axios.defaults.baseURL="http://192.168.137.1:3001";
// axios.defaults.baseURL="http://10.30.48.71:3001";
