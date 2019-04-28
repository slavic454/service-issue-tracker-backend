import Mongoose from 'mongoose';
import Joigoose from 'joigoose';
import moongosePaginate from 'mongoose-paginate';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';
import {joiIssueSchema} from '../schemas';

const joigoose = Joigoose(Mongoose);

const IssueSchema = new Mongoose.Schema(joigoose.convert(joiIssueSchema));
IssueSchema.plugin(moongosePaginate);
IssueSchema.plugin(updateIfCurrentPlugin);
const Issue = Mongoose.model('Issue', IssueSchema);

export default Issue;
