const express = require("express");
const router = express.Router();
const {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} = require("../controllers/ticketController");

// GET /api/tickets - get all tickets
router.get("/", getTickets);

// GET /api/tickets/:id - get single ticket
router.get("/:id", getTicketById);

// POST /api/tickets - create ticket
router.post("/", createTicket);

// PUT /api/tickets/:id - update ticket
router.put("/:id", updateTicket);

// DELETE /api/tickets/:id - delete ticket
router.delete("/:id", deleteTicket);

module.exports = router;