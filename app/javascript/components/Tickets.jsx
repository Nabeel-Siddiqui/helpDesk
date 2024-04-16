import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const url = "/api/v1/tickets/index";

    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setTickets(res))
      .catch(() => navigate("/"));
  }, []);

  const allTickets =  tickets.map((ticket, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{ticket.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {ticket.email}
          </h6>
          <p className="card-text">{ticket.description}.</p>
          <a className="text-success">{`Status: ${ticket.status}`}</a>
          <Link to={`/ticket/${ticket.id}`} className="card-link">
            Resolve Ticket
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
    <h1>Ticket Dashboard</h1>
      <div className="py-5">
        <main className="container">
        <div className="row">
        {allTickets}
        </div>
        </main>
      </div>
    </>
  )

};


export default Tickets;
