function isMatch(jsonObj, column_name, criteria) {
    let auth = 0;
    if (!column_name)
        return 1;
    else {
        auth = 1;
        for (let j = 0; j < column_name.length; j++)
            if (jsonObj[column_name[j]] !== criteria[j])
                auth = 0;
    }
    return auth;
}

module.exports = isMatch;
