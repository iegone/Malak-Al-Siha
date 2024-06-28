document.addEventListener("DOMContentLoaded", function () {
    const monthYearEl = document.getElementById("month-year");
    const daysEl = document.querySelector(".days");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const nextButtonStep1 = document.getElementById("nextBtnStep1");
    const nextButtonStep2 = document.getElementById("nextBtnStep2");
    const selectedDateInput = document.getElementById("selectedDate");
    const selectedTimeInput = document.getElementById("selectedTime");
    const steps = document.querySelectorAll(".step");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        const monthNames = [
            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();

        monthYearEl.innerText = monthNames[month] + " " + year;
        daysEl.innerHTML = "";

        // Fill in previous month's days
        for (let i = firstDay; i > 0; i--) {
            daysEl.innerHTML += `<div class="prev-date">${prevLastDate - i + 1}</div>`;
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
                if (this.classList.contains("prev-date") || this.classList.contains("next-date"))
                    return;
                days.forEach((d) => d.classList.remove("active"));
                this.classList.add("active");
                selectedDateInput.value = `${year}-${month + 1}-${this.innerText}`;
                nextButtonStep1.disabled = false;
            });
        });
    }

    renderCalendar(currentMonth, currentYear);

    prevBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButtonStep1.addEventListener("click", () => {
        steps[0].classList.remove("active");
        steps[1].classList.add("active");
    });

    document.querySelectorAll(".time-slot").forEach(slot => {
        slot.addEventListener("click", function () {
            if (this.classList.contains("booked")) return;
            document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
            this.classList.add("selected");
            selectedTimeInput.value = this.dataset.time;
            nextButtonStep2.disabled = false;
        });
    });

    nextButtonStep2.addEventListener("click", () => {
        steps[1].classList.remove("active");
        steps[2].classList.add("active");
    });

    document.getElementById("confirmationForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const selectedDate = selectedDateInput.value;
        const selectedTime = selectedTimeInput.value;

        // Submit the data (you can send the data to your server here)
        alert(`الاسم: ${name}\nالهاتف: ${phone}\nالتاريخ: ${selectedDate}\nالوقت: ${selectedTime}`);

        // Reset form
        steps[2].classList.remove("active");
        steps[0].classList.add("active");
        nextButtonStep1.disabled = true;
        nextButtonStep2.disabled = true;
        selectedDateInput.value = '';
        selectedTimeInput.value = '';
        document.querySelectorAll(".days div").forEach(day => day.classList.remove("active"));
        document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
    });
});
