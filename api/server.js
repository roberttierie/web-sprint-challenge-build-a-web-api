const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const projects = require('./projects/projects-router')
const actions = require('./actions/actions-router')

server.use(express.json())
server.use('api/actions', actions)
server.use('api/projects', projects)
module.exports = server;
