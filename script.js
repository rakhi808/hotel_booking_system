let form = document.getElementById("bookingForm");
let result = document.getElementById("result");
let historyTable = document.getElementById("history");

// Load saved data
window.onload = function () {
    let data = JSON.parse(localStorage.getItem("bookings")) || [];
    data.forEach(addToTable);
};

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let checkinValue = document.getElementById("checkin").value;
    let checkoutValue = document.getElementById("checkout").value;
    let price = parseInt(document.getElementById("room").value);

    if (!checkinValue || !checkoutValue) {
        alert("Please select dates!");
        return;
    }

    let checkin = new Date(checkinValue);
    let checkout = new Date(checkoutValue);

    if (checkout <= checkin) {
        alert("Check-out must be after check-in!");
        return;
    }

    let timeDiff = checkout.getTime() - checkin.getTime();
    let days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    console.log(price, days);

    let total = 0;

    if (!isNaN(price) && !isNaN(days)) {
        total = days * price;
    }

    let booking = {
        name,
        room: price,
        days,
        total
    };

    result.innerHTML = `Booking Confirmed! Total: ₹${total}`;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    addToTable(booking);

    form.reset();
});

function addToTable(data) {
    let row = `<tr>
        <td>${data.name}</td>
        <td>₹${data.room}</td>
        <td>${data.days}</td>
        <td>₹${data.total}</td>
    </tr>`;
    historyTable.innerHTML += row;
}

function clearHistory() {
    if (confirm("Are you sure you want to delete all bookings?")) {
        localStorage.removeItem("bookings");
        document.getElementById("history").innerHTML = "";
    }
}