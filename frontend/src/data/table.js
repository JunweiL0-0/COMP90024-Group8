import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

function MyTable() {
    const [data, setData] = useState([]);
    const url = 'http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_variance_mood_by_gcc?group=true';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.error('Error:', error));
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'City',
                accessor: 'key',
            },
            {
                Header: 'Variance Sentiment',
                accessor: 'value.variance_sentiment',
            },
        ],
        []
    );

    const cityNames = {
        "1gsyd": "Sydney",
        "2gmel": "Melbourne",
        "3gbri": "Brisbane",
        "5gper": "Perth",
        "4gade": "Adelaide",
        "6ghob": "Hobart",
        "7gdar": "Darwin",
        "8acte": "Canberra"
    };

    const tableData = (data.rows || []).filter(row => cityNames[row.key]).map(row => {
        return {
            ...row,
            key: cityNames[row.key],
        };
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px black', textAlign: 'left' }}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px black', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px' }}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default MyTable;
