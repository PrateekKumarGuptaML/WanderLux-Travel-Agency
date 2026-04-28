// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".navbar-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

revealElements.forEach((element) => revealOnScroll.observe(element));


// Hero slider rotation
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000);



// Trip cost calculator
const calculatorForm = document.getElementById("calculatorForm");

if (calculatorForm) {
  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const destinationSelect = document.getElementById("destination");
    const travellers = Number(document.getElementById("travellers").value);
    const days = Number(document.getElementById("days").value);
    const styleSelect = document.getElementById("style");
    const result = document.getElementById("calculatorResult");

    if (!destinationSelect.value || !travellers || !days || !styleSelect.value) {
      result.textContent = "Please complete all fields with valid values.";
      return;
    }

    const dailyRate = Number(destinationSelect.selectedOptions[0].dataset.rate);
    const multiplier = Number(styleSelect.selectedOptions[0].dataset.multiplier);
    const bookingFee = 120;
    const total = ((dailyRate * travellers * days) * multiplier) + bookingFee;
    const formattedTotal = total.toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0
    });

    result.textContent = `Estimated cost for ${travellers} traveller(s) to ${destinationSelect.value} for ${days} day(s): ${formattedTotal} – ${styleSelect.value} Travel Package.`;
  });
}


// Basic validation for appointment and contact forms
function setupValidatedForm(formId, resultId, successMessage) {
  const form = document.getElementById(formId);
  const result = document.getElementById(resultId);

  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    const requiredFields = form.querySelectorAll("[required]");
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
      }

      if (field.type === "email" && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
          valid = false;
        }
      }
    });

    if (!valid) {
      event.preventDefault();
      result.textContent = "Please complete all required fields using valid information.";
      return;
    }

    result.textContent = successMessage;
  });
}

setupValidatedForm(
  "appointmentForm",
  "appointmentResult",
  "Thank you. Your email application will open so you can send this appointment request."
);

setupValidatedForm(
  "contactForm",
  "contactResult",
  "Thank you. Your email application will open so you can send this message."
);
