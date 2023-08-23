function TableRows({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            const { Relation, Age, Education, Occupation, Other } = data;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={Relation} onChange={(evnt) => (handleChange(index, evnt))}  name="Relation" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={Age} onChange={(evnt) => (handleChange(index, evnt))} name="Age" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Education} onChange={(evnt) => (handleChange(index, evnt))} name="Education" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Occupation} onChange={(evnt) => (handleChange(index, evnt))} name="Occupation" className="form-control" /> 
                    </td>
                    <td>
                        <input type="text" value={Other} onChange={(evnt) => (handleChange(index, evnt))} name="Other" className="form-control" /> 
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}> X </button>
                    </td>
                </tr>

            )
        })

    )

}

export default TableRows;