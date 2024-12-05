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
  [key: string]: any;
}

interface TableComponentProps {
  tables: Table[];
  reservations: Reservation[];
}

const generateData = (tables: Table[], reservations: Reservation[]): TableRow[] => {
  const data: TableRow[] = [];

  for (let time = 0; time < 24; time++) {
    const row: TableRow = { time };

    tables.forEach(table => {
      const tableKey = `T${table.tableid}`;
      row[tableKey] = table.seats;

      const reservedSeats = reservations.filter(
        reservation => reservation.tableid === table.tableid && reservation.time === time
      ).reduce((total, reservation) => total + reservation.numguests, 0);
      row[`reservedSeats${table.tableid}`] = reservedSeats

      const availableSeats = table.seats - reservedSeats;
      row[`availableSeats${table.tableid}`] = availableSeats;
    });

    row.sum = Object.keys(row).filter(key => key.startsWith('availableSeats'))
                              .reduce((sum, key) => sum + row[key], 0);

    const totalSeats = tables.reduce((sum, table) => sum + table.seats, 0);
    const totalReservedSeats = reservations.filter(reservation => reservation.time === time)
                                           .reduce((sum, reservation) => sum + reservation.numguests, 0);
    console.log(totalSeats)
    console.log(totalReservedSeats)
    
    row.utilization = totalSeats === 0 ? '0%' : `${(totalReservedSeats / totalSeats * 100).toFixed(2)}%`;
    row.availability = `${(row.sum / totalSeats * 100).toFixed(2)}%`;

    if (totalReservedSeats != 0) {
      data.push(row);
    }
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
            {/* Dynamically create table headers based on the number of tables */}
            {tables.map((table) => (
              <th key={table.tableid}>{`T${table.tableid} (${table.seats})`}</th>
            ))}
            <th>Seats</th>
            <th>SUM</th>
            <th>Utilization</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              {/* Dynamically render table data */}
              {tables.map((table) => (
                <td key={table.tableid}>{row[`reservedSeats${table.tableid}`]}</td>
              ))}
              <td>{tables.map((table) => row[`availableSeats${table.tableid}`]).join(', ')}</td>
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
