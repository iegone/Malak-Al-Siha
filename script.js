document.addEventListener("DOMContentLoaded", function () {
  const monthYearEl = document.getElementById("month-year");
  const daysEl = document.querySelector(".days");
  const selectedDateInput = document.getElementById("selectedDate");
  const selectedTimeInput = document.getElementById("selectedTime");
  const nextButtonStep1 = document.getElementById("nextBtnStep1");
  const nextButtonStep2 = document.getElementById("nextBtnStep2");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function renderCalendar(month, year) {
    const monthNames = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    monthYearEl.innerText = monthNames[month] + " " + year;
    daysEl.innerHTML = "";

    // Fill in previous month's days
    for (let i = firstDay; i > 0; i--) {
      daysEl.innerHTML += `<div class="prev-date">${
        prevLastDate - i + 1
      }</div>`;
    }

    // Fill in current month's days
    for (let i = 1; i <= lastDate; i++) {
      daysEl.innerHTML += `<div>${i}</div>`;
    }

    // Fill in next month's days to complete the grid
    const nextDays = 42 - daysEl.children.length; // 42 cells for 6 rows
    for (let i = 1; i <= nextDays; i++) {
      daysEl.innerHTML += `<div class="next-date">${i}</div>`;
    }

    const days = daysEl.querySelectorAll("div");
    days.forEach((day) => {
      day.addEventListener("click", function () {
        if (
          this.classList.contains("prev-date") ||
          this.classList.contains("next-date")
        )
          return;
        days.forEach((d) => d.classList.remove("active"));
        this.classList.add("active");
        selectedDateInput.value = `${year}-${month + 1}-${this.innerText}`;
        nextButtonStep1.disabled = false;
      });
    });
  }

  renderCalendar(currentMonth, currentYear);

  window.prevMonth = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  };

  window.nextMonth = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  };

  document.querySelectorAll(".time-slot").forEach((slot) => {
    slot.addEventListener("click", function () {
      if (this.classList.contains("booked")) return;
      document
        .querySelectorAll(".time-slot")
        .forEach((slot) => slot.classList.remove("selected"));
      this.classList.add("selected");
      selectedTimeInput.value = this.dataset.time;
      nextButtonStep2.disabled = false;
    });
  });

  window.showStep = (stepNumber) => {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step) => step.classList.remove("active"));
    document.getElementById(`step-${stepNumber}`).classList.add("active");

    const progressSteps = document.querySelectorAll(".progress-steps li");
    progressSteps.forEach((li, index) => {
      if (index < stepNumber - 1) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });

    if (stepNumber === 4) {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("number").value;
      const selectedDate = selectedDateInput.value;
      const selectedTime = selectedTimeInput.value;
      document.getElementById("confirmation").innerHTML = `<div class="invoice">
      <div class="header">
        <img src="./src/logo.jpeg" alt="" />

        <div>
          <h1> <span>تم الحجز</span>  <br></h1>

        </div>
      </div>
      <hr>
      <div class="table-container">
        <table>
          <tr>
            <td class="rtl">${name}</td>
            <td>:الاسـم</td>
          </tr>

          <tr>
            <td class="rtl">${phone}</td>
            <td>:الـرقم</td>
          </tr>

          <tr>
            <td class="rtl">${selectedDate}</td>
            <td>:التاريخ</td>
          </tr>

          <tr>
            <td class="rtl">${selectedTime}</td>
            <td>:الوقت</td>
          </tr>
        </table>
        
        
        </div>
        <hr>
        <p>نتوقع من حضراتكم القدوم قبل الميعاد ب ١٠ دقائق علي الاقل</p>

    </div>`;
    }
  };

  window.confirmBooking = () => {
    // alert("تم تأكيد الحجز بنجاح!");
    window.print();

    // Reset form
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    nextButtonStep1.disabled = true;
    nextButtonStep2.disabled = true;
    selectedDateInput.value = "";
    selectedTimeInput.value = "";
    document
      .querySelectorAll(".days div")
      .forEach((day) => day.classList.remove("active"));
    document
      .querySelectorAll(".time-slot")
      .forEach((slot) => slot.classList.remove("selected"));

    showStep(1);
  };
});
