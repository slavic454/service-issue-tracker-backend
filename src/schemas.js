import joi from 'joi';
import joiObjectId from 'joi-objectid';

joi.objectId = joiObjectId(joi);

const joiPaginationSchema = joi.object({
    page: joi.number().integer().greater(0).default(1),
    limit: joi.number().integer().greater(0).default(20),
});

const joiEnvironmentSchema = joi.object({
    mongoHost: joi.string().min(3).required(),
    mongoPort: joi.number().integer().greater(0).required(),
    mongoDatabase: joi.string().min(3).required(),
    serverPort: joi.number().integer().greater(0).required(),
    apiPrefix: joi.string().allow('').optional().regex(/^\/[a-z]+$/).default(''),
    logLevel: joi.string().valid('trace', 'debug', 'info', 'warn', 'error', 'fatal').required()
});

const joiIssueSchema = joi.object({
    title: joi.string().min(3).required(),
    description: joi.string().min(10).required(),
    status: joi.string().valid('open', 'pending', 'closed').required()
});

const joiIssueSchemaWithObjectId = joiIssueSchema.keys({
    _id: joi.objectId()
});

export {joiPaginationSchema, joiEnvironmentSchema, joiIssueSchema, joiIssueSchemaWithObjectId};


