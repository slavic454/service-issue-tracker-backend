import dotenv from 'dotenv';
import {joiEnvironmentSchema} from './schemas';
import joi from 'joi';

dotenv.config();

const {
    ISSUE_TRACKER_MONGO_HOST,
    ISSUE_TRACKER_MONGO_PORT,
    ISSUE_TRACKER_MONGO_DATABASE,
    ISSUE_TRACKER_SERVER_PORT,
    ISSUE_TRACKER_LOG_LEVEL,
    ISSUE_TRACKER_API_PREFIX
} = process.env;


const env = joi.validate({
    mongoHost: ISSUE_TRACKER_MONGO_HOST,
    mongoPort: ISSUE_TRACKER_MONGO_PORT,
    mongoDatabase: ISSUE_TRACKER_MONGO_DATABASE,
    serverPort: ISSUE_TRACKER_SERVER_PORT,
    logLevel: ISSUE_TRACKER_LOG_LEVEL,
    apiPrefix: ISSUE_TRACKER_API_PREFIX
}, joiEnvironmentSchema);

if (env.error !== null) {
    console.error(`Provided invalid environment=${env.error}`);
    process.exit();
}

const {mongoHost, mongoPort, mongoDatabase,
    serverPort, logLevel, apiPrefix} = env.value;

const mongoURI = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;

export {mongoHost, mongoPort, mongoDatabase,
    serverPort, logLevel, apiPrefix, mongoURI};
