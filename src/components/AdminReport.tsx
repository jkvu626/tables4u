'use client'
import React from 'react';
import './components.css'; // Add CSS styles here

interface Table {
  username: string;
  tableid: number;
  seats: number;
}

interface Reservation {
  username: string;
  tableid: number;
  time: number;
  day: number;
  month: number;
  year: number;
  numguests: number;
  code: string;
  email: string;
}

interface TableRow {
  time: number;
  day: number;
  month: number;
  year: number;
  [key: string]: string | number;
}

interface TableComponentProps {
  tables: Table[];
  reservations: Reservation[];
}

const generateData = (tables: Table[], reservations: Reservation[]): TableRow[] => {
  const data: TableRow[] = [];

  for (const reservation of reservations) {
    const { time, day, month, year } = reservation;
    const rowIndex = data.findIndex(
      (row) => row.time === time && row.day === day && row.month === month && row.year === year
    );

    let row: TableRow;
    if (rowIndex === -1) {
      row = { time, day, month, year };
      data.push(row);
    } else {
      row = data[rowIndex];
    }

    tables.forEach(table => {
      const tableKey = `T${table.tableid}`;
      row[tableKey] = table.seats;

      const reservedSeats = reservations.filter(
        r => r.tableid === table.tableid &&
             r.time === time &&
             r.day === day &&
             r.month === month &&
             r.year === year
      ).reduce((total, r) => total + r.numguests, 0);
      row[`reservedSeats${table.tableid}`] = reservedSeats;

      const availableSeats = table.seats - reservedSeats;
      row[`availableSeats${table.tableid}`] = availableSeats;
    });

    row.sum = Object.keys(row).filter(key => key.startsWith('availableSeats'))
                              .reduce((sum, key) => sum + (row[key] as number), 0);

    const totalSeats = tables.reduce((sum, table) => sum + table.seats, 0);
    const totalReservedTables = new Set(
      reservations
        .filter(
          (r) =>
            r.time === time &&
            r.day === day &&
            r.month === month &&
            r.year === year
        )
        .map((r) => r.tableid) 
    ).size; 

    const totalReservedSeats = reservations.filter((r) => (
      r.time === time &&
      r.day === day &&
      r.month === month &&
      r.year === year
    )).reduce((total, r) => total + r.numguests, 0);

    row.utilization = `${(totalReservedSeats / totalSeats * 100).toFixed(0)}%`;
    row.availability = totalReservedTables == tables.length ? '0' : `${((tables.length - totalReservedTables) / tables.length * 100).toFixed(0)}%`;
  }

  return data;
};

const TableComponent: React.FC<TableComponentProps> = ({ tables, reservations }) => {
  const data = generateData(tables, reservations);

  return (
    <div className="table-container" style={{ width: '100%' }}>
      <table className="availability-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            {tables.map((table) => (
              <th key={table.tableid}>{`T${table.tableid} (${table.seats})`}</th>
            ))}
            <th>Available Seats</th>
            <th>SUM</th>
            <th>Utilization</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.time}:00</td>
              <td>{`${row.month}/${row.day}/${row.year}`}</td>
              {tables.map((table) => (
                <td key={table.tableid}>{row[`reservedSeats${table.tableid}`]}</td>
              ))}
              <td>
                {tables.map((table, index) => (
                  <span key={table.tableid}>
                    Table {table.tableid}: {row[`availableSeats${table.tableid}`]}
                    {index < tables.length - 1 && <br />}
                  </span>
                ))}
              </td>
              <td>{row.sum}</td>
              <td>{row.utilization}</td>
              <td>{row.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
