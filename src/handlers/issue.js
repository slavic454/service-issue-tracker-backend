import Issue from '../models/issue';
import joi from 'joi';
import {joiPaginationSchema, joiIssueSchemaWithObjectId} from '../schemas';
import restifyErrors from 'restify-errors';

const getIssuesHandler = async (req, res, next) => {

    let result;

    try {
        const input = joi.validate(
            {page: req.query.page, limit: req.query.limit},
            joiPaginationSchema);
        if (input.error !== null) {
            throw new restifyErrors.BadRequestError(input.error);
        }
        const {page, limit} = {...input.value};

        req.log.info(
            {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
            ` Query params page=${page}, limit=${limit}`);

        result = await Issue.paginate({}, {page, limit});

        req.log.info(
            {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
            `Successfully retrieved issues=${JSON.stringify(result)}`);

        res.send(result);
    } catch (err){
        if (err instanceof restifyErrors.BadRequestError){

            req.log.debug(
                {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
                'Wrong query params: page, limit');

            result = err;
        } else {

            req.log.error(
                {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
                `Unexpected error: err=${err}`);

            result = new restifyErrors
            .InternalServerError('Cannot retrieve issues from database');
        }
    }
    return next(result);
};


const updateIssueHandler = async (req, res, next) => {

    let result;

    try {

        const input = joi.validate({...req.body, _id: req.params.id},
            joiIssueSchemaWithObjectId);

        if (input.error!==null) {
           throw new restifyErrors.BadRequestError(input.error);
        };

        req.log.info(
            {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
            `Url params id=${req.params.id}, body=${JSON.stringify(req.body)}`);


        const issue = await Issue.findById(req.params.id);

        req.log.debug(`Found issue=${JSON.stringify(issue)}`);

        if ((issue.status === 'pending' && input.value === 'open') ||
        (issue.status === 'closed' && input.value.status !== 'closed') ){
            throw new restifyErrors
            .BadRequestError(`Cannot change status from=${issue.status} 
            to=${input.value.status}`);
        };

        issue.description = input.value.description;
        issue.title = input.value.title;
        issue.status = input.value.status;
        result = await issue.save();
        req.log.info(`Updated issue=${JSON.stringify(result)}`);
        res.send(result);

    } catch (err) {
        if (err instanceof restifyErrors.BadRequestError) {
            result = err;
            req.log.debug(
                {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
                `Following error occured: err=${err}`);
        } else {

            req.log.error(
                {reqId: req.id(), reqUrl: req.url, reqMethod: req.method},
                `Unexpected error: err=${err}`);

            result = new restifyErrors
            .InternalServerError(`Cannot update issue=${req.params.id}`);
        }
    }
    next(result);
};

export {getIssuesHandler, updateIssueHandler};

