
const DataTable = ({ headers, rows }) => {

    return <div>
        <table className="table table-info table-striped table-hover table-bordered">
            <thead>
                <tr>
                    {headers && headers.map((x, ind) => <th key={ind}>{x}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows && rows.map((x, ind) =>
                    <tr onClick={x.onRowSelected} key={ind}>
                        {x.rowData.map((y, ind) => <td key={ind}>{y}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default DataTable;