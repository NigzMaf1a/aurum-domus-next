import React, {useState} from 'react';

export default function UserType() {
    const [value, setValue] = useState('');
  return (
    <div className="mb-4">
        <label htmlFor="type" className='form-label'></label>
        <select id="type"
                className='form-select'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
        >
            <option value="" disabled>
                Select User Type
            </option>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="chef">Chef</option>
            <option value="waiter">Waiter</option>
            <option value="admin">Admin</option>
            <option value="accountant">Accountant</option>
            <option value="owner">Owner</option>
        </select>
    </div>
  );
}
