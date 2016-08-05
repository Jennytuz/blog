var db = require('./BaseModel')

//////设置模型名字
const TableName = "BlogType"



// db.dal.setTableName(TableName)

//var adminUser = new db.dal(TableName)


var dal = new db.dal(TableName)//Object.create(db.dal);
// dal.setTableName(TableName)


module.exports = {
    dal: dal,
    db:db.db
}
