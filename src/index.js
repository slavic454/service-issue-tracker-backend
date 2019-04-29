import restify from 'restify';
import mongoose from 'mongoose';
import bunyan from 'bunyan';
import {mongoURI, apiPrefix, serverPort, logLevel} from './environment';
import {getIssuesHandler, updateIssueHandler,
    createIssueHandler} from './handlers/issue';

const log = bunyan.createLogger(
    {name: 'issue-tracker-logger', level: logLevel});

mongoose.connect(mongoURI, {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.once('open', () => {
    log.info(`Successfully connected to mongo, URI=${mongoURI}`);
}).then();

db.on('error', () => {
    log.error(`Cannot connect to mongo, URI=${mongoURI}`);
});

const server = restify.createServer({
    log: log
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get(`${apiPrefix}/issues`, getIssuesHandler);
server.put(`${apiPrefix}/issues/:id`, updateIssueHandler);
server.post(`${apiPrefix}/issues`, createIssueHandler);

server.listen(serverPort, ()=> {
    log.info(`Server started at ${serverPort} port`);
});
