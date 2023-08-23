function TableRowsQuali({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            const { Examination, University, Year, Percentage } = data;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={Examination} onChange={(evnt) => (handleChange(index, evnt))} name="Examination" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={University} onChange={(evnt) => (handleChange(index, evnt))} name="University" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Year} onChange={(evnt) => (handleChange(index, evnt))} name="Year" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Percentage} onChange={(evnt) => (handleChange(index, evnt))} name="Percentage" className="form-control" /> 
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}> X </button>
                    </td>
                </tr>

            )
        })

    )

}

export default TableRowsQuali;