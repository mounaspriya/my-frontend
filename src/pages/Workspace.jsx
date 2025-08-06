import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form1 from './Form1'; // ✔ path is correct

function Workspace() {
const { id } = useParams();
const navigate = useNavigate();

const renderContent = () => {
switch (id) {
case '1':
return <Form1 />;
default:
return <p>No form is defined for Workstream {id}.</p>;
}
};

return (
<div style={{ maxWidth: 800, margin: '40px auto', padding: '20px' }}>
<h2>Workstream {id}</h2>
{renderContent()}
<div style={{ marginTop: '30px', textAlign: 'center' }}>
<button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
</div>
</div>
);
}

export default Workspace;

