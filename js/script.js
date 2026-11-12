/* Borif Gido Portfolio — shared interactions */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const opening = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a[href]").forEach((link) => {
      const targetFile = link.getAttribute("href").split("/").pop();
      if (targetFile === currentFile) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function initScrollEffects() {
    const progress = document.querySelector(".progress-bar");
    const backToTop = document.querySelector(".back-to-top");

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (progress) progress.style.width = `${Math.min(100, amount)}%`;
      if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 450);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      });
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reducedMotion) {
      const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  function initTyping() {
    const target = document.querySelector("[data-typing]");
    if (!target || reducedMotion) return;

    const roles = [
      "Software Engineering Student",
      "Aspiring Full-Stack Developer",
      "Cybersecurity Enthusiast",
      "AI Engineer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const tick = () => {
      const role = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      target.textContent = role.slice(0, Math.max(0, characterIndex));

      let delay = deleting ? 38 : 72;
      if (!deleting && characterIndex === role.length) {
        deleting = true;
        delay = 1550;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }
      window.setTimeout(tick, delay);
    };

    tick();
  }

  function initProjectFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        cards.forEach((card) => {
          const categories = card.dataset.category.split(/\s+/);
          card.hidden = filter !== "all" && !categories.includes(filter);
        });
      });
    });
  }
function initContactForm() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    const submitButton = document.querySelector("#submit-btn");

    if (!form || !status || !submitButton) return;

    // Local backend address.
   const API_URL = "https://borif-portfolio.onrender.com/api/contact";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.className = "form-status";
        status.textContent = "";

        // Validate fields.
        const fields = [...form.querySelectorAll("[required]")];

        let firstInvalid = null;

        fields.forEach((field) => {
            const valid = field.checkValidity();

            field.setAttribute("aria-invalid", String(!valid));

            if (!valid && !firstInvalid) {
                firstInvalid = field;
            }
        });

        const emailField = form.querySelector('input[type="email"]');

        if (
            emailField &&
            emailField.value.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                emailField.value.trim()
            )
        ) {
            emailField.setAttribute("aria-invalid", "true");
            firstInvalid = firstInvalid || emailField;
        }

        if (firstInvalid) {
            status.classList.add("error");
            status.textContent =
                "Please complete all fields correctly.";

            firstInvalid.focus();
            return;
        }

        // Collect form information.
        const formData = new FormData(form);

        const data = {
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            subject: formData.get("subject").trim(),
            message: formData.get("message").trim()
        };

        // Prevent repeated submissions.
       submitButton.disabled = true;
submitButton.textContent = "Sending message...";

status.classList.remove("success", "error");
status.textContent = "Please wait while your message is being delivered...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to send your message."
                );
            }

            // Successful submission.
            status.classList.add("success");
            status.textContent = result.message;

            form.reset();

            fields.forEach((field) => {
                field.removeAttribute("aria-invalid");
            });

        } catch (error) {
            console.error("Contact form error:", error);

            status.classList.add("error");

            status.textContent =
                error.message ||
                "Unable to send your message. Please try again.";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send message";
        }
    });

    // Clear validation errors while typing.
    form.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("input", () => {
            if (field.checkValidity()) {
                field.removeAttribute("aria-invalid");
            }
        });
    });
}

  function initResumeActions() {
    const printButton = document.querySelector("[data-print-resume]");
    if (printButton) printButton.addEventListener("click", () => window.print());

    const pdfLink = document.querySelector("[data-resume-pdf]");
    if (!pdfLink) return;

    pdfLink.addEventListener("click", (event) => {
      // The PDF is intentionally not fabricated. Keep the action honest if it is missing.
      fetch(pdfLink.href, { method: "HEAD" })
        .then((response) => {
          if (!response.ok) throw new Error("PDF not available");
        })
        .catch(() => {
          event.preventDefault();
          window.alert("Add your real CV PDF at assets/borif-gido-cv.pdf before downloading.");
        });
    });
  }

  function initLocalImageFallbacks() {
    document.querySelectorAll("img[data-fallback]").forEach((image) => {
      image.addEventListener("error", () => {
        if (image.dataset.fallbackApplied === "true") return;
        image.dataset.fallbackApplied = "true";
        image.src = image.dataset.fallback;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollEffects();
    initTyping();
    initProjectFilters();
    initContactForm();
    initResumeActions();
    initLocalImageFallbacks();
  });
})();
  const themeButton = document.querySelector(".theme-toggle");
  const themeIcon = themeButton?.querySelector(".theme-toggle-icon");
  const themeLabel = themeButton?.querySelector(".theme-toggle-label");

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);

    const isDark = theme === "dark";
    themeButton?.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
    if (themeLabel) themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  setTheme(savedTheme || "dark");

  themeButton?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });