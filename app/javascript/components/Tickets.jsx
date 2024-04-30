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
    <div key={index} className="col-md-6 col-lg-4 mb-4">
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">{ticket.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-muted">
            {ticket.email}
          </h6>
          <p className="card-text d-inline-block text-truncate" >{ticket.description}.</p>
          <div className="mb-2 d-flex align-items-center">
            <a className="text-success mr-2" >{`Status: ${ticket.status}`}</a>
            <Link style={{marginLeft: '10px'}} to={`/ticket/${ticket.id}`}> Resolve Ticket</Link>
          </div>
        </div> 
      </div>
    </div>
  ));

  return (
    <>
    <h1>Ticket Dashboard</h1>
      <div className="py-5">
        <main className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {allTickets}
        </div>
        </main>
      </div>
    </>
  )

};


export default Tickets;
