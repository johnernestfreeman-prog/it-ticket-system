
/*==================================================
    IT HELP DESK TICKET SYSTEM
    Version 1.0
==================================================*/

/*==================================================
    DOM ELEMENTS
==================================================*/
/*Tickets from Mongo database*/
const API_URL = "http://localhost:5000/api/tickets";
const ticketForm = document.getElementById("ticketForm");

const openTickets = document.getElementById("openTickets");
const progressTickets = document.getElementById("progressTickets");
const resolvedTickets = document.getElementById("resolvedTickets");

const ticketTemplate = document.getElementById("ticketTemplate");

const searchInput = document.getElementById("searchInput");

const priorityFilter = document.getElementById("priorityFilter");
const statusFilter = document.getElementById("statusFilter");
const departmentFilter = document.getElementById("departmentFilter");

const newTicketBtn = document.getElementById("newTicketBtn");



const modal = document.getElementById("ticketModal");

const closeModal = document.getElementById("closeModal");
const closeTicketModal = document.getElementById("closeTicketModal");

const saveTicketBtn = document.getElementById("saveTicketBtn");
const deleteTicketBtn = document.getElementById("deleteTicketBtn");

/*==================================================
    DASHBOARD
==================================================*/

const openCount = document.getElementById("openCount");

const progressCount = document.getElementById("progressCount");

const resolvedCount = document.getElementById("resolvedCount");

const totalCount = document.getElementById("totalCount");

/*==================================================
    STORAGE
==================================================*/

const STORAGE_KEY = "it-helpdesk-tickets";

/*==================================================
    APPLICATION STATE
==================================================*/

let tickets = [];

let currentTicket = null;

/*==================================================
    SAMPLE DATA
==================================================*/

const sampleTickets = [

    {

        id: "INC-1001",

        employee: "John Freeman",

        email: "john@example.com",

        department: "IT",

        building: "Headquarters",

        device: "Dell Latitude",

        category: "Hardware",

        priority: "High",

        status: "Open",

        technician: "John Freeman",

        subject: "Laptop will not boot",

        description:
            "The employee reports the laptop remains on a black screen after powering on.",

        notes: "",

        history: [

            "Ticket created."

        ],

        created: new Date().toLocaleString(),

        updated: new Date().toLocaleString()

    },

    {

        id: "INC-1002",

        employee: "Sarah Johnson",

        email: "sarah@example.com",

        department: "Finance",

        building: "Building B",

        device: "HP EliteBook",

        category: "Microsoft 365",

        priority: "Medium",

        status: "In Progress",

        technician: "John Freeman",

        subject: "Outlook won't sync",

        description:
            "Email synchronization stopped after password reset.",

        notes:
            "Investigating mailbox profile.",

        history: [

            "Ticket created.",

            "Assigned to technician."

        ],

        created: new Date().toLocaleString(),

        updated: new Date().toLocaleString()

    }

];

/*==================================================
    LOAD DATA
==================================================*/

async function loadTickets() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tickets");
        }

        tickets = await response.json();

        renderTickets();
        updateDashboard();

    } catch (error) {
        console.error("Error loading tickets:", error);
    }
}






/*==================================================
    START
==================================================*/

document.addEventListener("DOMContentLoaded", initializeApp);




/*==================================================
    GENERATE TICKET ID
==================================================*/

function generateTicketId(){

    const highest = tickets.reduce((max, ticket) => {

        if(!ticket.incidentNumber){
            return max;
        }

        const number = parseInt(ticket.incidentNumber.replace("INC-", ""));

        return number > max ? number : max;

    }, 1000);

    return `INC-${highest + 1}`;

}

/*==================================================
    CREATE TICKET OBJECT
==================================================*/

function createTicket(formData){

    return{

        incidentNumber: generateTicketId(),

        employee: formData.employee,

        email: formData.email,

        department: formData.department,

        building: formData.building,

        device: formData.device,

        category: formData.category,

        priority: formData.priority,

        status: "Open",

        technician: formData.technician,

        subject: formData.subject,

        description: formData.description,

        notes: "",

        history: [

            "Ticket created."

        ],

        created: new Date().toLocaleString(),

        updated: new Date().toLocaleString()

    };

}

/*==================================================
    READ FORM
==================================================*/

function getFormData(){

    return{

        employee: document.getElementById("employee").value.trim(),

        email: document.getElementById("email").value.trim(),

        department: document.getElementById("department").value,

        building: document.getElementById("building").value.trim(),

        device: document.getElementById("device").value.trim(),

        category: document.getElementById("category").value,

        priority: document.getElementById("priority").value,

        technician: document.getElementById("technician").value.trim(),

        subject: document.getElementById("subject").value.trim(),

        description: document.getElementById("description").value.trim()

    };

}

/*==================================================
    VALIDATE FORM
==================================================*/

function validateForm(data){

    if(!data.employee){

        alert("Employee name is required.");

        return false;

    }

    if(!data.email){

        alert("Email is required.");

        return false;

    }

    if(!data.subject){

        alert("Subject is required.");

        return false;

    }

    if(!data.description){

        alert("Description is required.");

        return false;

    }

    return true;

}

/*==================================================
    CLEAR FORM
==================================================*/

function clearForm(){

    ticketForm.reset();

}

/*==================================================
    SUBMIT
==================================================*/

ticketForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const formData = getFormData();

    if(!validateForm(formData)){
        return;
    }

    const ticket = createTicket(formData);

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    });

    await loadTickets();

    clearForm();

});



/*==================================================
    RENDER TICKETS
==================================================*/

function renderTickets() {

    openTickets.innerHTML = "";
    progressTickets.innerHTML = "";
    resolvedTickets.innerHTML = "";

    tickets.forEach(ticket => {

        const card = createTicketCard(ticket);

        switch(ticket.status){

            case "Open":
                openTickets.appendChild(card);
                break;

            case "In Progress":
                progressTickets.appendChild(card);
                break;

            case "Resolved":
                resolvedTickets.appendChild(card);
                break;

        }

    });

    showEmptyState(openTickets);
    showEmptyState(progressTickets);
    showEmptyState(resolvedTickets);

}

/*==================================================
    CREATE CARD
==================================================*/

function createTicketCard(ticket){

    const template = ticketTemplate.content.cloneNode(true);

    const card = template.querySelector(".ticket-card");

    card.dataset.id = ticket.id;

    template.querySelector(".ticket-id").textContent = ticket.incidentNumber;

    template.querySelector(".ticket-title").textContent =
        ticket.subject;

    template.querySelector(".ticket-employee").textContent =
        ticket.employee;

    template.querySelector(".ticket-department").textContent =
        ticket.department;

    template.querySelector(".ticket-device").textContent =
        ticket.device;

    template.querySelector(".ticket-technician").textContent =
        ticket.technician || "Unassigned";

    template.querySelector(".ticket-updated").textContent =
        ticket.updated;

    const badge = template.querySelector(".priority-badge");

    badge.textContent = ticket.priority;

    badge.className = "priority-badge";

    switch(ticket.priority){

        case "Low":
            badge.classList.add("priority-low");
            break;

        case "Medium":
            badge.classList.add("priority-medium");
            break;

        case "High":
            badge.classList.add("priority-high");
            break;

        case "Critical":
            badge.classList.add("priority-critical");
            break;

    }

    switch(ticket.status){

        case "In Progress":
            card.classList.add("status-progress");
            break;

        case "Resolved":
            card.classList.add("status-resolved");
            break;

    }

    const viewButton = template.querySelector(".view-btn");

    const deleteButton = template.querySelector(".delete-btn");

    viewButton.addEventListener("click",(event)=>{

        event.stopPropagation();

        openTicket(ticket.id);

    });

    deleteButton.addEventListener("click",(event)=>{

        event.stopPropagation();

        deleteTicket(ticket.id);

    });

    card.addEventListener("click",()=>{

        openTicket(ticket.id);

    });

    return template;

}

/*==================================================
    EMPTY STATES
==================================================*/

function showEmptyState(column){

    if(column.children.length > 0){

        return;

    }

    column.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-inbox"></i>

            <h4>No Tickets</h4>

            <p>There are currently no tickets in this column.</p>

        </div>

    `;

}

/*==================================================
    PLACEHOLDER FUNCTIONS
==================================================*/

function openTicket(id){

    console.log("Open Ticket:",id);

}

function deleteTicket(id){

    console.log("Delete Ticket:",id);

}


/*==================================================
    DASHBOARD STATISTICS
==================================================*/

function updateDashboard(){

    const open = tickets.filter(ticket => ticket.status === "Open").length;

    const progress = tickets.filter(ticket => ticket.status === "In Progress").length;

    const resolved = tickets.filter(ticket => ticket.status === "Resolved").length;

    openCount.textContent = open;

    progressCount.textContent = progress;

    resolvedCount.textContent = resolved;

    totalCount.textContent = tickets.length;

    updateSummaryCards();

}

/*==================================================
    SUMMARY CARDS
==================================================*/

function updateSummaryCards(){

    const todayActivity = document.getElementById("todayActivity");

    const highestPriority = document.getElementById("highestPriority");

    const averageResolution = document.getElementById("averageResolution");

    if(todayActivity){

        todayActivity.textContent = tickets.length;

    }

    if(highestPriority){

        highestPriority.textContent = getHighestPriority();

    }

    if(averageResolution){

        averageResolution.textContent = calculateResolutionTime();

    }

}

/*==================================================
    HIGHEST PRIORITY
==================================================*/

function getHighestPriority(){

    if(tickets.some(ticket => ticket.priority === "Critical")){

        return "Critical";

    }

    if(tickets.some(ticket => ticket.priority === "High")){

        return "High";

    }

    if(tickets.some(ticket => ticket.priority === "Medium")){

        return "Medium";

    }

    if(tickets.some(ticket => ticket.priority === "Low")){

        return "Low";

    }

    return "-";

}

/*==================================================
    AVERAGE RESOLUTION
==================================================*/

function calculateResolutionTime(){

    const resolvedTickets = tickets.filter(ticket => ticket.status === "Resolved");

    if(resolvedTickets.length === 0){

        return "--";

    }

    return "2.3 Days";

}

/*==================================================
    REFRESH ENTIRE APP
==================================================*/

function refreshApplication() {
    renderTickets();
    updateDashboard();
}



/*==================================================
    REFRESH BUTTON
==================================================*/

const refreshButton = document.getElementById("refreshBoardAction");

if(refreshButton){

    refreshButton.addEventListener("click",()=>{

        refreshApplication();

    });

}





/*==================================================
    SEARCH & FILTERS
==================================================*/

function getFilteredTickets(){

    const search = searchInput.value.toLowerCase().trim();

    const priority = priorityFilter.value;

    const status = statusFilter.value;

    const department = departmentFilter.value;

    return tickets.filter(ticket => {

        const matchesSearch =

            ticket.incidentNumber.toLowerCase().includes(search) ||

            ticket.employee.toLowerCase().includes(search) ||

            ticket.subject.toLowerCase().includes(search) ||

            ticket.device.toLowerCase().includes(search);

        const matchesPriority =

            priority === "All" ||

            priority === "" ||

            ticket.priority === priority;

        const matchesStatus =

            status === "All" ||

            status === "" ||

            ticket.status === status;

        const matchesDepartment =

            department === "All" ||

            department === "" ||

            ticket.department === department;

        return (

            matchesSearch &&

            matchesPriority &&

            matchesStatus &&

            matchesDepartment

        );

    });

}

/*==================================================
    RENDER FILTERED TICKETS
==================================================*/

function renderTickets(){

    openTickets.innerHTML = "";

    progressTickets.innerHTML = "";

    resolvedTickets.innerHTML = "";

    const filteredTickets = getFilteredTickets();

    filteredTickets.forEach(ticket=>{

        const card = createTicketCard(ticket);

        switch(ticket.status){

            case "Open":

                openTickets.appendChild(card);

                break;

            case "In Progress":

                progressTickets.appendChild(card);

                break;

            case "Resolved":

                resolvedTickets.appendChild(card);

                break;

        }

    });

    showEmptyState(openTickets);

    showEmptyState(progressTickets);

    showEmptyState(resolvedTickets);

}

/*==================================================
    SEARCH EVENTS
==================================================*/

searchInput.addEventListener("input",()=>{

    renderTickets();

});

/*==================================================
    FILTER EVENTS
==================================================*/

priorityFilter.addEventListener("change",()=>{

    renderTickets();

});

statusFilter.addEventListener("change",()=>{

    renderTickets();

});

departmentFilter.addEventListener("change",()=>{

    renderTickets();

});

/*==================================================
    CLEAR FILTERS
==================================================*/

const clearFiltersButton = document.getElementById("clearFilters");

if(clearFiltersButton){

    clearFiltersButton.addEventListener("click",()=>{

        searchInput.value="";

        priorityFilter.selectedIndex=0;

        statusFilter.selectedIndex=0;

        departmentFilter.selectedIndex=0;

        renderTickets();

    });

}

/*====================================================
     NEW TICKET BUTTON EVENT LISTENER

======================================================*/

console.log(newTicketBtn);
console.log(ticketForm);

newTicketBtn.addEventListener("click", () => {

    console.log("New Ticket button clicked!");

    ticketForm.scrollIntoView({
        behavior: "smooth"
    });

});

/*==================================================
    OPEN TICKET
==================================================*/

function openTicket(id){

    currentTicket = tickets.find(ticket => ticket.id === id);

    if(!currentTicket){

        return;

    }

    document.getElementById("modalTicketId").textContent =
        currentTicket.incidentNumber;

    document.getElementById("modalEmployee").textContent =
        currentTicket.employee;

    document.getElementById("modalEmail").textContent =
        currentTicket.email;

    document.getElementById("modalDepartment").textContent =
        currentTicket.department;

    document.getElementById("modalBuilding").textContent =
        currentTicket.building;

    document.getElementById("modalDevice").textContent =
        currentTicket.device;

    document.getElementById("modalCategory").textContent =
        currentTicket.category;

    document.getElementById("modalPriority").textContent =
        currentTicket.priority;

    document.getElementById("modalStatus").value =
        currentTicket.status;

    document.getElementById("modalTechnician").value =
        currentTicket.technician;

    document.getElementById("modalSubject").value =
        currentTicket.subject;

    document.getElementById("modalDescription").value =
        currentTicket.description;

    document.getElementById("modalNotes").value =
        currentTicket.notes;

    loadTimeline();

    modal.classList.add("show");

}

/*==================================================
    TIMELINE
==================================================*/

function loadTimeline(){

    const timeline =
        document.getElementById("activityTimeline");

    timeline.innerHTML = "";

    currentTicket.history.forEach(item=>{

        const li = document.createElement("li");

        li.textContent = item;

        timeline.appendChild(li);

    });

}

/*==================================================
    CLOSE MODAL
==================================================*/

function closeTicket(){

    modal.classList.remove("show");

    currentTicket = null;

}

closeModal.addEventListener("click",closeTicket);

closeTicketModal.addEventListener("click",closeTicket);

/*==================================================
    CLOSE WHEN CLICKING BACKGROUND
==================================================*/

modal.addEventListener("click",(event)=>{

    if(event.target === modal){

        closeTicket();

    }

});

/*==================================================
    ESC KEY
==================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeTicket();

    }

});


/*==================================================
    SAVE CHANGES
==================================================*/

saveTicketBtn.addEventListener("click", async () => {

    if (!currentTicket) return;

    currentTicket.status = document.getElementById("modalStatus").value;
    currentTicket.technician = document.getElementById("modalTechnician").value;
    currentTicket.subject = document.getElementById("modalSubject").value;
    currentTicket.description = document.getElementById("modalDescription").value;
    currentTicket.notes = document.getElementById("modalNotes").value;
    currentTicket.updated = new Date().toLocaleString();

    currentTicket.history.push(
        "Ticket updated - " + new Date().toLocaleString()
    );

    try {

        await fetch(`${API_URL}/${currentTicket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentTicket)
        });

        await loadTickets();

        closeTicket();

    } catch (error) {
        console.error("Error updating ticket:", error);
    }

});


/*==================================================
    DELETE TICKET
==================================================*/

async function deleteTicket(id) {

    const ticket = tickets.find(ticket => ticket.id === id);

    if (!ticket) return;

    const confirmed = confirm(
        `Delete ticket ${ticket.incidentNumber}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        await loadTickets();

        if (currentTicket && currentTicket.id === id) {
            closeTicket();
        }

    } catch (error) {
        console.error("Error deleting ticket:", error);
    }
}

/*==================================================
    DELETE FROM MODAL
==================================================*/

deleteTicketBtn.addEventListener("click",()=>{

    if(!currentTicket){

        return;

    }

    deleteTicket(currentTicket.id);

});



/*==================================================
    STATUS CHANGE
==================================================*/

document.getElementById("modalStatus")
.addEventListener("change",(event)=>{

    if(!currentTicket){

        return;

    }

    currentTicket.history.push(

        `Status changed to "${event.target.value}"`

    );

});





/*==================================================
    ADD NOTE HISTORY
==================================================*/

document.getElementById("modalNotes")
.addEventListener("change",()=>{

    if(!currentTicket){

        return;

    }

    currentTicket.history.push(

        "Technician notes updated."

    );

});





/*==================================================
    LAST UPDATED
==================================================*/

function updateTimestamp(ticket){

    ticket.updated = new Date().toLocaleString();

}



/*==================================================
    DRAG & DROP
==================================================*/

let draggedTicketId = null;

/*==================================================
    ENABLE DRAGGING
==================================================*/

function enableDragAndDrop(){

    document.querySelectorAll(".ticket-card").forEach(card=>{

        card.draggable = true;

        card.addEventListener("dragstart",handleDragStart);

        card.addEventListener("dragend",handleDragEnd);

    });

    document.querySelectorAll(".ticket-list").forEach(column=>{

        column.addEventListener("dragover",handleDragOver);

        column.addEventListener("dragleave",handleDragLeave);

        column.addEventListener("drop",handleDrop);

    });

}





/*==================================================
    DRAG START
==================================================*/

function handleDragStart(event){

    draggedTicketId = event.currentTarget.dataset.id;

    event.currentTarget.classList.add("dragging");

}

/*==================================================
    DRAG END
==================================================*/

function handleDragEnd(event){

    event.currentTarget.classList.remove("dragging");

    document.querySelectorAll(".ticket-list").forEach(column=>{

        column.classList.remove("drag-over");

    });

}


/*==================================================
    DRAG OVER
==================================================*/

function handleDragOver(event){

    event.preventDefault();

    event.currentTarget.classList.add("drag-over");

}

/*==================================================
    DRAG LEAVE
==================================================*/

function handleDragLeave(event){

    event.currentTarget.classList.remove("drag-over");

}




/*==================================================
    DROP
==================================================*/

function handleDrop(event){

    event.preventDefault();

    event.currentTarget.classList.remove("drag-over");

    if(!draggedTicketId){

        return;

    }

    const ticket = tickets.find(

        ticket=>ticket.id===draggedTicketId

    );

    if(!ticket){

        return;

    }

    if(event.currentTarget.id==="openTickets"){

        ticket.status="Open";

    }

    if(event.currentTarget.id==="progressTickets"){

        ticket.status="In Progress";

    }

    if(event.currentTarget.id==="resolvedTickets"){

        ticket.status="Resolved";

    }

    ticket.updated = new Date().toLocaleString();

    ticket.history.push(

        `Moved to ${ticket.status}`

    );



    refreshApplication();

    draggedTicketId = null;

}


/*==================================================
    TOAST NOTIFICATIONS
==================================================*/

function showToast(title, message, type = "success") {

    let container = document.querySelector(".toast-container");

    if (!container) {

        container = document.createElement("div");
        container.className = "toast-container";

        document.body.appendChild(container);

    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    let icon = "fa-circle-check";

    if (type === "warning") icon = "fa-triangle-exclamation";
    if (type === "error") icon = "fa-circle-xmark";

    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <div class="toast-content">

            <div class="toast-title">${title}</div>

            <div class="toast-message">${message}</div>

        </div>

        <button class="toast-close">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;

    container.appendChild(toast);

    toast.querySelector(".toast-close")
        .addEventListener("click", () => {

            toast.remove();

        });

    setTimeout(() => {

        toast.remove();

    }, 4000);

}


/*==================================================
    EXPORT TICKETS
==================================================*/

function exportTickets(){

    const data = JSON.stringify(

        tickets,

        null,

        2

    );

    const blob = new Blob(

        [data],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "IT-HelpDesk-Tickets.json";

    link.click();

    URL.revokeObjectURL(url);

    showToast(

        "Export Complete",

        "Tickets exported successfully."

    );

}




/*==================================================
    EXPORT BUTTON
==================================================*/

const exportButton =

document.getElementById("exportAction");

if(exportButton){

    exportButton.addEventListener(

        "click",

        exportTickets

    );

}





/*==================================================
    IMPORT TICKETS
==================================================*/

function importTickets(file){

    const reader = new FileReader();

    reader.onload = function(event){

        try{

            const imported = JSON.parse(event.target.result);

            tickets = imported;

            

            refreshApplication();

            showToast(

                "Import Complete",

                "Tickets imported successfully."

            );

        }

        catch{

            showToast(

                "Import Failed",

                "Invalid JSON file.",

                "error"

            );

        }

    };

    reader.readAsText(file);

}




/*==================================================
    IMPORT FILE INPUT
==================================================*/

const importInput =

document.createElement("input");

importInput.type = "file";

importInput.accept = ".json";

importInput.style.display = "none";

document.body.appendChild(importInput);

importInput.addEventListener(

    "change",

    ()=>{

        if(importInput.files.length){

            importTickets(

                importInput.files[0]

            );

        }

    }

);




/*==================================================
    DARK MODE
==================================================*/

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "it-helpdesk-theme",

        document.body.classList.contains("dark")
            ? "dark"
            : "light"

    );

}

function loadTheme(){

    const theme = localStorage.getItem("it-helpdesk-theme");

    if(theme === "dark"){

        document.body.classList.add("dark");

    }

}




/*==================================================
    KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key.toLowerCase()==="n"){

        event.preventDefault();

        ticketForm.scrollIntoView({

            behavior:"smooth"

        });

    }

    if(event.ctrlKey && event.key.toLowerCase()==="f"){

        event.preventDefault();

        searchInput.focus();

    }

    if(event.ctrlKey && event.key.toLowerCase()==="e"){

        event.preventDefault();

        exportTickets();

    }

});



const themeButton = document.getElementById("themeToggle");

if(themeButton){

    themeButton.addEventListener(

        "click",

        toggleDarkMode

    );

}




/*==================================================
    AUTO SAVE
==================================================*/

window.addEventListener("beforeunload",()=>{

   

});




/*==================================================
    HELPERS
==================================================*/

function findTicket(id){

    return tickets.find(

        ticket=>ticket.id===id

    );

}

function formatDate(date){

    return new Date(date)

        .toLocaleString();

}


function initializeApp() {

    loadTheme();
    loadTickets();
    refreshApplication();

    console.log("IT Help Desk initialized.");

}

initializeApp();