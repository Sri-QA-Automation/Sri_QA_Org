// ====== EDIT THESE DETAILS ======
const WHATSAPP_NUMBER = "+918247564178"; // country code + number, no + or spaces

const courses = [
  {
    title: "Manual Testing",
    duration: "6 weeks",
    mode: "Online",
    points: ["Testing fundamentals and SDLC", "Test cases and bug reporting", "JIRA and real project practice"]
  },
  {
    title: "Automation Testing (Selenium)",
    duration: "8 weeks",
    mode: "Online / Offline",
    points: ["Java basics for testers", "Selenium WebDriver and TestNG", "Framework design and Git"]
  },
  {
    title: "API Testing",
    duration: "4 weeks",
    mode: "Online",
    points: ["REST concepts", "Postman and automation", "Real API test scenarios"]
  }
];

const reviews = [
  { name: "Student Name 1", text: "The trainer explained every concept with real examples. I got confident for interviews." },
  { name: "Student Name 2", text: "Live projects made the difference. I finally understood how testing works in companies." },
  { name: "Student Name 3", text: "Doubts were cleared quickly and the placement support was really helpful." }
];
// =================================

function waLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// Render courses
document.getElementById("courseGrid").innerHTML = courses.map(c => `
  <div class="card course-card">
    <h3>${c.title}</h3>
    <div class="course-meta"><span>&#9201; ${c.duration}</span><span>&#127760; ${c.mode}</span></div>
    <ul>${c.points.map(p => `<li>${p}</li>`).join("")}</ul>
    <a class="btn btn-small" href="${waLink("Hi, I want details about " + c.title)}" target="_blank" rel="noopener">Enquire Now</a>
  </div>
`).join("");

// Render reviews
document.getElementById("reviewGrid").innerHTML = reviews.map(r => `
  <div class="card">
    <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <p>"${r.text}"</p>
    <p class="review-name">${r.name}</p>
  </div>
`).join("");

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// WhatsApp forms
document.getElementById("quickForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg = `Hi SriQA, I am ${qName.value}. Phone: ${qPhone.value}. I am interested in: ${qCourse.value}. Please call me back.`;
  window.open(waLink(msg), "_blank");
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg = `Hi SriQA, I am ${cName.value}. Phone: ${cPhone.value}. Email: ${cEmail.value || "-"}. Message: ${cMsg.value || "I want to book a free demo class."}`;
  window.open(waLink(msg), "_blank");
});

document.getElementById("waFloat").href = waLink("Hi SriQA, I would like to know more about your courses.");

// Animated counters
const counters = document.querySelectorAll("[data-count]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(timer); }
      el.textContent = n;
    }, 30);
    observer.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => observer.observe(c));

document.getElementById("year").textContent = new Date().getFullYear();
