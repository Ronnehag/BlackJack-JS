const db = require('../data/db');

exports.findByUsername = function (username, password, cb) {
    const query = `SELECT Username, Money From Customer WHERE Username = '${username}'
    AND Password = '${password}'`;
    db.query(query, (result) => {
        if (result !== null) {
            cb(result);
        } else {
            cb(null);
        }
    });
}

exports.updateUser = function (username, value, cb) {
    const query = `UPDATE Customer SET Money = Money + ${value}
        OUTPUT DELETED.Money, INSERTED.Money WHERE Username = '${username}'`;
    db.query(query, (result) => {
        if (result !== null) {
            cb(result);
        } else {
            cb(null);
        }
    });
}