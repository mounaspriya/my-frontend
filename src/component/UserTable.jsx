import React from 'react';
import '../styles/UserTable.css';

const users = [
  {
    id: 1,
    name: 'Elizabeth Lee',
    email: 'ElizabethLee@email.com',
    country: 'United States',
    updated: '10/07/2023',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/40?u=elizabeth',
  },
  {
    id: 2,
    name: 'Carlos Garcia',
    email: 'CarlosGarcia@email.com',
    country: 'Italy',
    updated: '24/07/2023',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/40?u=carlos',
  },
  {
    id: 3,
    name: 'Elizabeth Bailey',
    email: 'ElizabethBailey@email.com',
    country: 'Canada',
    updated: '08/08/2023',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/40?u=bailey',
  },
  // Add more rows as needed
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Users Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Update Date</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td><input type="checkbox" /></td>
              <td className="user-cell">
                <img src={u.avatar} alt={u.name} />
                <span>{u.name}</span>
              </td>
              <td>{u.email}</td>
              <td>{u.country}</td>
              <td>{u.updated}</td>
              <td>
                <span className={`status ${u.status.toLowerCase()}`}>
                  {u.status}
                </span>
              </td>
              <td><button className="edit-btn">✏️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
