const sql = require('msnodesqlv8');
const connString = "server=localhost;Database=Blackjack;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

exports.query = function (query, cb) {
    process.nextTick(() => {
        sql.query(connString, query, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                cb(rows);
            } else {
                cb(null);
            }
        });
    });
}