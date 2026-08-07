const Ticket = require("../models/ticket");

/*
    GET ALL TICKETS
*/
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve tickets.",
            error: error.message
        });
    }
};

/*
    GET SINGLE TICKET
*/
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found."
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*
    CREATE TICKET
*/
const createTicket = async (req, res) => {

    try {

        const ticket = await Ticket.create(req.body);

        res.status(201).json(ticket);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
    UPDATE TICKET
*/
const updateTicket = async (req, res) => {

    try {

        const ticket = await Ticket.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!ticket) {

            return res.status(404).json({

                message: "Ticket not found."

            });

        }

        res.status(200).json(ticket);

    } catch (error) {

        res.status(400).json({

            message: error.message

        });

    }

};

/*
    DELETE TICKET
*/
const deleteTicket = async (req, res) => {

    try {

        const ticket = await Ticket.findByIdAndDelete(

            req.params.id

        );

        if (!ticket) {

            return res.status(404).json({

                message: "Ticket not found."

            });

        }

        res.status(200).json({

            message: "Ticket deleted."

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getTickets,

    getTicketById,

    createTicket,

    updateTicket,

    deleteTicket

};