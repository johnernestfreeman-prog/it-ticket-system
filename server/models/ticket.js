const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

    incidentNumber:{
        type:String,
        required:true,
        unique:true
    },

    employee:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    department:{
        type:String
    },

    building:{
        type:String
    },

    device:{
        type:String
    },

    category:{
        type:String
    },

    priority:{
        type:String,
        default:"Low"
    },

    status:{
        type:String,
        default:"Open"
    },

    technician:{
        type:String,
        default:"Unassigned"
    },

    subject:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    notes:{
        type:String,
        default:""
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Ticket",
    ticketSchema
);