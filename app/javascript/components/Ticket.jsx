import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Ticket = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({});
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((response) => {
        setTicket(response);
        setResolved(response.resolved);
        setStatus(response.status);
        setResponse(response.response);
      })
      .catch(() => navigate("/tickets"));
  }, [params.id]);

  const onChange = (e, setFunction) => {
    setFunction(e.target.value);
    if (e.target.name === "status") {
      if (e.target.value === "Resolved") {
        setResolved(true);
      } else {
        setResolved(false);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `/api/v1/update/${params.id}`;

    const body = {
      response,
      resolved,
      status,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/tickets"))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Resolve Ticket</h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                value={ticket.name || ""}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                value={ticket.email || ""}
                aria-label="Disabled input example"
                disabled
                readOnly
              />
            </div>
            <label htmlFor="description">Ticket Description</label>
            <input
              className="form-control"
              type="text"
              value={ticket.description || ""}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="response">Response</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="response"
                  id="response"
                  required
                  value={response}
                  onChange={(event) => onChange(event, setResponse)}
                />
              </div>
              <select
                value={status}
                name="status"
                onChange={(event) => onChange(event, setStatus)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button type="submit" className="btn custom-button mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
