// 1. SELECT ELEMENTS
const hamburger = document.querySelector(".hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const homeCaret = document.getElementById("home-caret");
const homeDropdown = document.getElementById("home-dropdown");

// 2. SIDEBAR TOGGLE LOGIC (HAMBURGER CLICK)
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  // AOS Animation Reset when sidebar opens
  if (sidebar.classList.contains("active")) {
    const aosItems = sidebar.querySelectorAll("[data-aos]");

    aosItems.forEach((item) => {
      item.classList.remove("aos-animate");
    });

    // Small delay to allow sidebar to slide in before AOS starts
    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  }
});

// 3. HOME DROPDOWN TOGGLE (CARET CLICK)
// Specifically handles showing/hiding Home 2 and rotating the arrow
// if (homeCaret) {
//   homeCaret.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevents click from bubbling up

//     homeDropdown.classList.toggle("open");
//     homeCaret.classList.toggle("rotate");
//   });
// }
// 4. CLOSE SIDEBAR (OVERLAY CLICK)

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// Drop Down
// 5)) DROP DOWN TOGGLE LOGIC (DROPDOWN ICON CLICK)
// const dropdown = document.querySelector(".dropdown");
// const dropToggle = document.querySelector(".drop-toggle");

// dropToggle.addEventListener("click", function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//   dropdown.classList.toggle("active");
// });

// // Close dropdown when clicking outside
// window.addEventListener("click", function () {
//   dropdown.classList.remove("active");
// });

// End

// data target count

const initTrendingCounters = () => {
  const trendingSection = document.querySelector(".trending-section");
  const counters = document.querySelectorAll(".view-count");

  if (!trendingSection || counters.length === 0) return;

  const formatNumber = (num) => {
    return Math.floor(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const startCounting = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let countObj = { value: 0 };

      gsap.to(countObj, {
        value: target,
        // CHANGED: Increased from 3 to 6 for a slower, more cinematic crawl
        duration: 10,
        // OPTIONAL: Using 'none' or 'power1.out' makes the speed feel more consistent
        ease: "power1.out",
        onUpdate: () => {
          counter.innerText = formatNumber(countObj.value);
        },
        onComplete: () => {
          counter.innerText = formatNumber(target);
        },
      });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(trendingSection);
};

document.addEventListener("DOMContentLoaded", initTrendingCounters);
