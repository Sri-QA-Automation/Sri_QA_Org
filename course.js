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

// Syllabus: expand / collapse all
document.querySelectorAll("[data-syl]").forEach(btn => {
  btn.addEventListener("click", () => {
    const open = btn.dataset.syl === "open";
    document.querySelectorAll("details.phase").forEach(d => { d.open = open; });
  });
});

// Class videos: play inside the page (the link still opens YouTube if JavaScript is off)
document.querySelectorAll("a.video-thumb[data-yt]").forEach(a => {
  a.addEventListener("click", ev => {
    ev.preventDefault();
    const f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + a.dataset.yt + "?autoplay=1&rel=0";
    f.title = a.getAttribute("aria-label") || "Class video";
    f.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    const box = document.createElement("div");
    box.className = "video-thumb";
    box.appendChild(f);
    a.replaceWith(box);
  });
});
