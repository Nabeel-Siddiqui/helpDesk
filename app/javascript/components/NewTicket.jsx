import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../utils/api";

const NewTicket = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onChange = (e, setFunction) => {
    setFunction(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !description) {
      return;
    }

    try {
      await createTicket({
        name,
        email,
        description,
        response: null,
        resolved: false,
        status: "new",
      });

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      setName("");
      setEmail("");
      setDescription("");

      navigate("/");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          {showAlert && (
            <div className="alert alert-primary" role="alert">
              Ticket successfully created!
            </div>
          )}
          <h1 className="font-weight-normal mb-5">Create a new ticket.</h1>
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
