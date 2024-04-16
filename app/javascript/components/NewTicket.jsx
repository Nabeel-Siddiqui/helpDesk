import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewTicket = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const onChange = (e, setFunction) => {
        setFunction(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const url = "/api/v1/tickets/create";

        if (name.length == 0 || email.length == 0 || description.length == 0)
            return;

        const body = {
            name,
            email,
            description,
            response: null, 
            resolved: false, 
            status: "new"
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    setName("");
                    setEmail("");
                    setDescription("");
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => navigate('/'))
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Create a new ticket.
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <label htmlFor="description">Ticket Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="5"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit" className="btn custom-button mt-3">
                            Create Ticket
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewTicket;
