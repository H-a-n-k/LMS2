const { AsyncQuery } = require('../db/connectDB');

const states = [
    { id: 1, name: 'state 1' },
    { id: 2, name: 'state 2' }
]

const State = {
    getAllstates: async (req, res) => {
        const result = await AsyncQuery('select * from copy_state');
        const data = result.data.recordset;
        res.json(data);
    }
}

module.exports = State;