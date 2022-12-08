import { useTable } from 'react-table'
import { Button } from "react-bootstrap";

export default function Listing({ rowsData, columns, ...props }) {

    // Listing Actions
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((column) => [
            ...column,
            {
                id: "Edit",
                Header: "Edit",
                Cell: (row) => (
                    <div key={row.row.original.id}>
                        {
                            <Button
                                className="btn-fill mr-5"
                                variant="primary"
                                onClick={() => props.handleEdit(row.row.original.id)}
                            >
                                Edit
                            </Button>
                        }

                        {
                            <Button
                                className="btn-fill mr-3"
                                variant="danger"
                                onClick={() => props.handleDel(row.row.original.id)}
                            >
                                Delete
                            </Button>
                        }
                    </div>

                ),
            },
        ]);
    };

    const tableInstance = useTable(
        {
            columns: columns,
            data: rowsData,
        },
        tableHooks,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;


    return (
        <div className='table-responsive'>
            <table {...getTableProps()} className='table table-hover'>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, colIndex) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, cellIndex) => {
                                    return (
                                            <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')} </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}