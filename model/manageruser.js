const mongoose = require("mongoose");
const table_manager = new mongoose.Schema({
    userid:{type:String},
    username:{type:String},
    information:[{}],
    datelogin:{type:Date,default:Date.now}
}
);

module.exports = mongoose.model("manager_user",table_manager);