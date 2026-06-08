const loader = document.getElementById("loader");
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const appointmentForm = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");
const faqItems = document.querySelectorAll(".faq-item");
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);
});

const updateHeader = () => {
  const isScrolled = window.scrollY > 20;
  siteHeader.classList.toggle("scrolled", isScrolled);
  backTop.classList.toggle("visible", window.scrollY > 550);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const name = formData.get("name").toString().trim();
  const phone = formData.get("phone").toString().trim();
  const date = formData.get("date").toString();
  const time = formData.get("time").toString();

  if (!name || !phone || !date || !time) {
    formStatus.textContent = "Please complete the required appointment details.";
    return;
  }

  formStatus.textContent = `Thank you, ${name}. Your appointment request for ${date} at ${time} has been received.`;
  appointmentForm.reset();
});

const assistantAnswers = [
  {
    keywords: ["timing", "time", "hours", "open", "closed", "sunday"],
    answer: "GS Clinic is open Monday to Saturday from 9:00 AM to 8:00 PM. Sunday is currently marked as closed."
  },
  {
    keywords: ["location", "address", "where", "map", "agra"],
    answer: "GS Clinic is located in Agra, Uttar Pradesh, India. You can use the Google Map section on this website for directions."
  },
  {
    keywords: ["service", "services", "consultation", "checkup", "diagnostic", "diabetes", "bp", "blood pressure"],
    answer: "Services include general consultation, preventive checkups, chronic care, diagnostics guidance, family healthcare, and emergency triage guidance."
  },
  {
    keywords: ["appointment", "book", "booking", "visit", "slot"],
    answer: "You can book an appointment using the form on this website. The clinic team can confirm your preferred slot by phone or WhatsApp."
  },
  {
    keywords: ["doctor", "available", "availability", "consultant"],
    answer: "Doctor availability depends on the daily appointment schedule. For same-day visits, please call or send a WhatsApp message to the clinic placeholder number."
  },
  {
    keywords: ["emergency", "urgent", "severe", "accident", "chest pain", "breathing", "unconscious"],
    answer: "For life-threatening symptoms such as chest pain, severe breathing difficulty, unconsciousness, stroke signs, or major injury, contact local emergency services or visit the nearest hospital immediately."
  },
  {
    keywords: ["phone", "whatsapp", "contact", "email"],
    answer: "You can contact GS Clinic at +91 00000 00000 or email hello@gsclinic.example. These are placeholders and can be customized."
  }
];

const fallbackAnswer = "I can help with clinic timings, location, services, appointment booking, doctor availability, contact details, and emergency guidance. Please ask one of those topics.";

const getAssistantAnswer = (question) => {
  const normalizedQuestion = question.toLowerCase();
  const matchedAnswer = assistantAnswers.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );
  return matchedAnswer ? matchedAnswer.answer : fallbackAnswer;
};

const appendMessage = (text, type) => {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("open");
  if (chatWindow.classList.contains("open")) {
    chatInput.focus();
  }
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.remove("open");
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  chatInput.value = "";

  setTimeout(() => {
    appendMessage(getAssistantAnswer(question), "bot");
  }, 350);
});

document.addEventListener("click", (event) => {
  const clickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
  if (!clickInsideNav && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
