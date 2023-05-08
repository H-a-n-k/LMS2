const sql = require("mssql/msnodesqlv8");

const config = {
    server: ".",
    database: "lms2",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};


//query: raw query with no conditions OR sp name
//params: array of [param name, value]
//where clause and params be automatically added to query
// set callSp to true to exec proc instead of queryings

//outp: 
//return success:
// return {
//     success: true,
//     data: result.recordset
// };

//return false:
// return {
//     success: false,
//     status: StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: 'Unknow error: ' + err,
//     err
// }   
const AsyncQuery = async (query, params, callSp) => { 

    let conn = await sql.connect(config);
    let request = await conn.request();
    if (params && params.length > 0) {
        if (!callSp) query += ' where '

        for (let i = 0; i < params.length; i++) {
            let x = params[i];
            request.input(x[0], x[1])

            if (callSp) continue;
            query += `(${x[0]} = @${x[0]} or @${x[0]} is null or @${x[0]} = '')`;
            if (i < params.length - 1) query += ' and ';
        }
    }
    
    let result;
    if (!callSp) result = await request.query(query);
    else result = await request.execute(query);
    //console.log(query);//
    return {
        success: true,
        data: result
    };
}

//Simplified version of AsyncQuery, 
//query: write full clause with params
const AsyncQuery2 = async (query, params) => {
    //console.log(params);//

    let conn = await sql.connect(config);
    let request = await conn.request();
    if (params && params.length > 0)
        params.forEach(x => request.input(x[0], x[1]));
    
    let result;
    result = await request.query(query);
    return {
        success: true,
        data: result
    };
}

module.exports = {
    AsyncQuery, AsyncQuery2
}


