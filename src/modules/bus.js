import { Component } from 'react';
import EventEmitter from 'events';
let bus = new EventEmitter();
Component.prototype.$bus=bus;