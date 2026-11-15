// ====== EDIT THESE DETAILS ======
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // country code + number, no + or spaces

const courses = [
  {
    title: "Manual Testing",
    duration: "6 weeks",
    mode: "Online / Offline",
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
  },
  {
    title: "AI / LLM Testing",
    duration: "6 weeks",
    mode: "Online / Offline",
    badge: "New",
    points: [
      "How LLMs work and where they fail",
      "Testing prompts, hallucinations, bias and safety",
      "RAG and chatbot testing with evaluation tools",
      "Prompt injection and red-teaming basics"
    ]
  }
];

// Success stories. Put each photo in the "images" folder and match the file name.
// To add a student, copy one block, change the details, and add a comma between blocks.
const stories = [
  {
    name: "Navaz Ahmed",
    city: "Khammam",
    role: "Test Engineer / Wipro",
    photo: "images/navaz-ahmed.jpg",
    text: "I loved how personal the training felt. Real projects, real feedback, and a mentor who explained the 'why' behind every automation pattern, not just the 'how'."
  },
  {
    name: "Student Name 2",
    city: "City",
    role: "Job title / Company",
    photo: "images/student-2.jpg",
    text: "Live projects made the difference. I finally understood how testing works in companies."
  },
  {
    name: "Student Name 3",
    city: "City",
    role: "Job title / Company",
    photo: "images/student-3.jpg",
    text: "Doubts were cleared quickly and the placement support was really helpful."
  }
];
// =================================

function waLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// Render courses
document.getElementById("courseGrid").innerHTML = courses.map(c => `
  <div class="card course-card">
    <h3>${c.title}${c.badge ? ` <span class="badge">${c.badge}</span>` : ""}</h3>
    <div class="course-meta"><span>&#9201; ${c.duration}</span><span>&#127760; ${c.mode}</span></div>
    <ul>${c.points.map(p => `<li>${p}</li>`).join("")}</ul>
    <a class="btn btn-small" href="${waLink("Hi, I want details about " + c.title)}" target="_blank" rel="noopener">Enquire Now</a>
  </div>
`).join("");

// Success stories carousel
const storyEl = document.getElementById("story");
const dotsEl = document.getElementById("carDots");
let current = 0;
let autoplay;

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function buildStory(i) {
  const s = stories[i];
  storyEl.innerHTML = `
    <img class="story-photo" src="${s.photo}" alt="${s.name}" />
    <div class="story-text">
      <p class="quote">"${s.text}"</p>
      <p class="story-name"><strong>${s.name}</strong><span class="story-city"> &middot; ${s.city}</span></p>
      <p class="story-role">${s.role}</p>
    </div>`;
  const img = storyEl.querySelector(".story-photo");
  // If the photo is missing, show the student's initials instead
  img.addEventListener("error", () => {
    const d = document.createElement("div");
    d.className = "story-initials";
    d.textContent = initials(s.name);
    img.replaceWith(d);
  });
  dotsEl.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === i));
}

function showStory(i, animate = true) {
  current = (i + stories.length) % stories.length;
  if (!animate) { buildStory(current); return; }
  storyEl.classList.add("fade");
  setTimeout(() => { buildStory(current); storyEl.classList.remove("fade"); }, 200);
}

function startAutoplay() { stopAutoplay(); autoplay = setInterval(() => showStory(current + 1), 6000); }
function stopAutoplay() { clearInterval(autoplay); }

dotsEl.innerHTML = stories.map((_, i) => `<button class="dot" aria-label="Story ${i + 1}"></button>`).join("");
dotsEl.querySelectorAll(".dot").forEach((d, i) => d.addEventListener("click", () => { showStory(i); startAutoplay(); }));
document.getElementById("carPrev").addEventListener("click", () => { showStory(current - 1); startAutoplay(); });
document.getElementById("carNext").addEventListener("click", () => { showStory(current + 1); startAutoplay(); });

const carousel = document.getElementById("carousel");
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

// Swipe on phones
let touchX = null;
carousel.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
carousel.addEventListener("touchend", e => {
  if (touchX === null) return;
  const diff = e.changedTouches[0].clientX - touchX;
  if (Math.abs(diff) > 50) { showStory(current + (diff < 0 ? 1 : -1)); startAutoplay(); }
  touchX = null;
});

showStory(0, false);
startAutoplay();

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// WhatsApp forms
// Career paths card in the hero (edit the tabs and roles here)
const careerPaths = [
  { tab: "Software Testing", steps: ["Manual Tester", "QA Analyst", "Automation Engineer", "Senior QA Engineer", "Test Lead"] },
  { tab: "Automation & API", steps: ["Automation Tester", "API Test Engineer", "SDET", "Senior SDET", "QA Architect"] },
  { tab: "AI / LLM Testing", steps: ["QA Engineer", "AI Test Engineer", "LLM Evaluation Engineer", "Senior AI QA Engineer", "AI Quality Lead"] }
];
const careerTabs = document.getElementById("careerTabs");
const careerSteps = document.getElementById("careerSteps");
const careerProgress = document.getElementById("careerProgress");
const careerCount = document.getElementById("careerCount");
let careerIdx = 0;
let careerTimer;

function renderCareer(i) {
  careerIdx = i;
  careerTabs.innerHTML = careerPaths.map((p, n) => `<button class="career-tab${n === i ? " active" : ""}" data-i="${n}">${p.tab}</button>`).join("");
  careerSteps.innerHTML = careerPaths[i].steps.map((s, n) => `<li><span class="step-no">0${n + 1}</span>${s}</li>`).join("");
  careerProgress.innerHTML = careerPaths.map((_, n) => `<span class="seg${n === i ? " active" : ""}"></span>`).join("");
  careerCount.textContent = `0${i + 1} / 0${careerPaths.length}`;
}
function startCareerRotation() {
  clearInterval(careerTimer);
  careerTimer = setInterval(() => renderCareer((careerIdx + 1) % careerPaths.length), 5000);
}
careerTabs.addEventListener("click", e => {
  const b = e.target.closest(".career-tab");
  if (b) { renderCareer(+b.dataset.i); startCareerRotation(); }
});
const careerCard = document.getElementById("careerCard");
careerCard.addEventListener("mouseenter", () => clearInterval(careerTimer));
careerCard.addEventListener("mouseleave", startCareerRotation);
renderCareer(0);
startCareerRotation();

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

// Announcement bar: repeat the messages so the scroll never shows a gap
const announceTrack = document.querySelector(".announce-track");
const announceGroup = announceTrack.querySelector(".announce-group");
while (announceTrack.offsetWidth < window.innerWidth * 2) announceTrack.appendChild(announceGroup.cloneNode(true));
if (announceTrack.children.length % 2 === 1) announceTrack.appendChild(announceGroup.cloneNode(true));