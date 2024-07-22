document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.getElementById("datePicker");
  const bookingsList = document.getElementById("bookingsList");
  const bookingsTable = document.getElementById("bookingsTable");
  const bookingsDateHeading = document.getElementById("bookingsDate");
  const prevMonthArrow = document.getElementById("prevMonth");
  const nextMonthArrow = document.getElementById("nextMonth");

  let bookingsData = [
    { name: "أحمد", number: "97786614", date: "2024-06-29", time: "04:00" },
    { name: "فاطمة", number: "97786615", date: "2024-06-29", time: "04:30" },
    { name: "محمد", number: "97786616", date: "2024-06-29", time: "05:00" },
    { name: "سارة", number: "97786617", date: "2024-06-29", time: "05:30" },
    { name: "علي", number: "97786618", date: "2024-06-30", time: "06:00" },
    { name: "علي", number: "97786618", date: "2024-06-30", time: "06:00" },
    { name: "علي", number: "97786618", date: "2024-06-30", time: "06:00" },
    // Add more booking objects as needed
  ];

  // Function to display bookings based on selected date
  function displayBookings(date) {
    const filteredBookings = bookingsData.filter(
      (booking) => booking.date === date
    );

    bookingsList.innerHTML = "";
    filteredBookings.forEach((booking) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${booking.name}</td>
        <td>${booking.number}</td>
        <td>${booking.time}</td>
        <td>
          <button class="action-button">تعديل</button>
          <button class="action-button delete">حذف</button>
        </td>
      `;
      bookingsList.appendChild(row);
    });

    if (filteredBookings.length === 0) {
      bookingsList.innerHTML = `<tr><td colspan="4">لا توجد حجوزات لهذا التاريخ</td></tr>`;
    }
  }

  // Initial display with today's date
  const today = new Date().toISOString().split("T")[0];
  datePicker.value = today;
  displayBookings(today);

  // Event listener for datepicker change
  datePicker.addEventListener("change", function () {
    const selectedDate = datePicker.value;
    bookingsDateHeading.textContent = `جدول الحجوزات - ${selectedDate}`;
    displayBookings(selectedDate);
  });

  // Event listeners for navigation arrows
  prevMonthArrow.addEventListener("click", function () {
    changeMonth(-1);
  });

  nextMonthArrow.addEventListener("click", function () {
    changeMonth(1);
  });

  // Function to change month
  function changeMonth(delta) {
    const currentDate = new Date(datePicker.value);
    currentDate.setMonth(currentDate.getMonth() + delta);
    const newDate = currentDate.toISOString().split("T")[0];
    datePicker.value = newDate;
    bookingsDateHeading.textContent = `جدول الحجوزات - ${newDate}`;
    displayBookings(newDate);
  }

  // Event listener for delete buttons
  bookingsTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const row = e.target.closest("tr");
      row.remove(); // Remove the row from UI

      // Implement logic here to delete booking from actual data source
      // For demo purposes, let's remove from mock data
      const name = row.children[0].textContent;
      const index = bookingsData.findIndex((booking) => booking.name === name);
      bookingsData.splice(index, 1);
    }
  });
});
