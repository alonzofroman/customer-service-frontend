import { useState } from 'react';

function CustomerForm({ customer: initialcustomer, notify }) {

    const [customer, SetCustomer] = useState(initialcustomer);
    const isAdd = initialcustomer.customerId === 0;

    function handleChange(evt) {
        const clone = { ...customer };
        clone[evt.target.name] = evt.target.value;
        SetCustomer(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/customer" : `http://localhost:8080/customers/customerId/${customer.customerId}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(customer)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return customer;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                customer: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{customer.customerId > 0 ? "Edit" : "Add"} Customer</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">


                    <label htmlFor="artist">firstName</label>
                    <input type="text" id="firstName" name="firstName"
                        className="form-control"
                        value={customer.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="album">Last Name</label>
                    <input type="text" id="lastName" name="lastName"
                        className="form-control"
                        value={customer.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Street</label>
                    <input type="text" id="street" name="street"
                        className="form-control"
                        value={customer.street} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="year">City</label>
                    <input type="text" id="city" name="city"
                        className="form-control"
                        value={customer.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">State</label>
                    <input type="text" id="state" name="state"
                        className="form-control"
                        value={customer.state} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="year">Zipcode</label>
                    <input type="text" id="zipCode" name="zipCode"
                        className="form-control"
                        value={customer.zipCode} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Level</label>
                    <input type="text" id="level" name="level"
                        className="form-control"
                        value={customer.level} onChange={handleChange} />
                </div>




                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default CustomerForm;