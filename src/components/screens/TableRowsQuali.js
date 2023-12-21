function TableRowsQuali({ rowsData, deleteTableRows, handleChange }) {

    // const onValueChange = (e) => {

    //     setemployee({ ...employee, [e.target.name]: e.target.value });
    //     console.log("emp", employee)
    // }

    return (

        rowsData.map((employedata,onValueChange,data, index,props) => {
            const { Examination, University, Year, Percentage } = employedata;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={Examination} onChange={(evnt) => (props.onChange(index, evnt))} name="Examination" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={University} onChange={(evnt) => (props.onChange(index, evnt))} name="University" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Year} onChange={(evnt) => (props.onChange(index, evnt))} name="Year" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Percentage} onChange={(evnt) => (props.onChange(index, evnt))} name="Percentage" className="form-control" /> 
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