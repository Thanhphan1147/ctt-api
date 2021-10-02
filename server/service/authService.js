const mongoConnection = require('../../mongo/connect');

(function () {

	const _db = mongoConnection.getDb();
    const tokens = _db.collection('tokens');

    exports.fetchKey = function(tid) {
        let query = {tid: tid}
        return tokens.findOne(query, {projection: { _id: 0, tid: 1, hash: 1}})
    }
})()
