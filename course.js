// Shared script for the course pages
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // country code + number, no + or spaces (same as script.js)

function waLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// WhatsApp form (mentions the course on this page)
const form = document.getElementById("contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const course = form.dataset.course;
  const msg = `Hi Sri QA Academy, I am ${cName.value}. Phone: ${cPhone.value}. Email: ${cEmail.value || "-"}. I am interested in the ${course} course. ${cMsg.value || "Please share batch timings and fees."}`;
  window.open(waLink(msg), "_blank");
});

document.getElementById("waFloat").href = waLink("Hi Sri QA Academy, I would like to know more about the " + form.dataset.course + " course.");
document.getElementById("year").textContent = new Date().getFullYear();
