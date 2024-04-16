import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tickets from "../components/Tickets";
import Ticket from "../components/Ticket";
import NewTicket from "../components/NewTicket";

export default (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<NewTicket />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/ticket/:id" element={<Ticket />} />
    </Routes>
  </Router>
);