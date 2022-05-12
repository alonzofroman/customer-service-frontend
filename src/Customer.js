import { useState, useEffect } from 'react';
import './customers.css';
import CustomerCard from './CustomerCard.js';
import CustomerForm from './CustomerForm.js';

function Customers() {

    const [customers, SetCustomers] = useState([]);
    const [showForm, SetShowForm] = useState(false);
    const [scopedcustomer, setScopedCustomer] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/customer")
        .then(response => response.json())
        .then(result => SetCustomers(result))
        .catch(console.log);
    }, []);

    function addClick() {
        
        setScopedCustomer({ customerId: 0, firstName: "", lastName: "", street: "", city: "", state: "", zip: 0, level: ""});
        SetShowForm(true);
    }

    function notify({ action, customer, error }) {

        if (error) {
            setError(error);
            SetShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                SetCustomers([...customers, customer]);
                break;
            case "edit":
                SetCustomers(customers.map(e => {
                    if (e.customerId === customer.customerId) {
                        return customer;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedCustomer(customer);
                SetShowForm(true);
                return;
            case "delete":
                SetCustomers(customers.filter(e => e.customerId !== customer.customerId));
                break;
                default: 
        }
        
        setError("");
        SetShowForm(false);
    }

    if (showForm) {
        return <CustomerForm customer={scopedcustomer} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='customerTitle'>Customers</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a customer</button>
                <table id='customers'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>ZipCode</th>
                        <th>Level</th>
                    </tr>
                    <tbody>
                        {customers.map(r => <CustomerCard key={r.customerId} customer={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Customers;