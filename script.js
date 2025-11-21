/* hi this was made by Jake if u see this then ur cool */
const endDate = new Date("2025-12-19T23:59:59").getTime();
function updateCountdown() {
  const now = Date.now();
  const diff = endDate - now;
  if (diff < 0) {
    document.getElementById(
      "countdown"
    ).innerHTML = `<div class="cd-box"><span>DONATIONS CLOSED</span></div>`;
    return;
  }
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerHTML = `
    <div class="cd-box"><span>${days}</span><label>Days</label></div>
    <div class="cd-box"><span>${hours}</span><label>Hours</label></div>
    <div class="cd-box"><span>${minutes}</span><label>Minutes</label></div>
    <div class="cd-box"><span>${seconds}</span><label>Seconds</label></div>`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// this will be fun get ready for code magic
const schools = [
  {
    name: "Redwood High School", //LETS GO REDWOOD!!!
    color: "#d32f2f",
    amount: 0,
    logo: "https://image.maxpreps.io/school-mascot/1/2/6/12616b84-157c-48d3-b353-434576d9df8d.gif?version=636093507600000000&width=256&height=256&auto=webp&format=pjpg",
  },
  {
    name: "Tam High School", //u guys are fine i guess*/
    color: "#1565c0",
    amount: 0,
    logo: "https://th.bing.com/th/id/OIP.VIQM1HgTUuP3fZVgMsd8HwHaFj?w=206&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
];

const schoolUrls = {
  "Redwood High School":
    "https://funddrives.sfmfoodbank.org/general/redwood-merry-meals",
  "Tam High School":
    "https://funddrives.sfmfoodbank.org/general/tam-high-dollars-for-dishes",
};

const corsurl = "https://merrymeals.piguyraspberry.workers.dev";
const leaderboard = document.getElementById("leaderboard");
const mainContent = document.body;
const loadingSpinner = document.getElementById("loading-spinnerthing");

async function fetchAndParseAmount(ourl) {
  const urlWithParams = `${corsurl}?url=${encodeURIComponent(ourl)}`;

  try {
    const proxyResponse = await fetch(urlWithParams);
    const data = await proxyResponse.json();

    if (data.error) {
      console.error(`Worker Error for ${ourl}:`, data.error);
      return 0;
    }

    return data.amount || 0;
  } catch (error) {
    console.error(`Failed to connect to Worker:`, error);
    return 0;
  }
}

// phew
function renderLeaderboard() {
  leaderboard.innerHTML = "";

  const amounts = schools.map((s) => s.amount);
  const max = Math.max(...amounts);

  // guys if ur at 0 u dont deserve to be winning...
  const isWinningAvailable = max > 0;

  schools.forEach((s) => {
    const bar = document.createElement("div");
    bar.className = "school-bar";
    if (s.amount === max && isWinningAvailable) {
      bar.classList.add("school-bar--winner");
    }
    const name = document.createElement("div");
    name.className = "school-name";
    name.textContent = s.name;

    const outer = document.createElement("div");
    outer.className = "bar-outer";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.dataset.color = s.color;

    const logo = document.createElement("div");
    logo.className = "bar-logo";
    if (!s.logo.includes("REPLACE"))
      logo.style.backgroundImage = `url(${s.logo})`;

    const amount = document.createElement("div");
    amount.className = "school-amount";
    amount.textContent = "$" + s.amount.toLocaleString();

    // i hope this never has to be used but if NO ONE DONATES that this is what it is for
    if (s.amount === 0) {
      const zeroText = document.createElement("div");
      zeroText.className = "zero-amount-text";
      zeroText.textContent = "No donations yet :(";
      // css and html in js ????
      zeroText.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.4);
        font-size: 1.1rem;
        font-weight: 300;
        pointer-events: none;
        z-index: 2;
      `;
      outer.appendChild(zeroText);
    }

    fill.appendChild(logo);
    outer.appendChild(fill);

    bar.appendChild(name);
    bar.appendChild(outer);
    bar.appendChild(amount);

    leaderboard.appendChild(bar);

    //
    if (s.amount === max && isWinningAvailable) {
      const winningTag = document.createElement("div");
      winningTag.className = "winning-tag";
      winningTag.textContent = "WINNING!";
      winningTag.dataset.school = s.name.split(" ")[0].toLowerCase();
      // (this is not as good) leaderboard.appendChild(winningTag);
    }

    // graphic magic
    const percentage = (max > 0 ? (s.amount / max) * 100 : 0) + "%";

    if (window.innerWidth <= 800) {
      fill.style.height = percentage;
      fill.style.width = "100%";
    } else {
      fill.style.width = percentage;
      fill.style.height = "100%";
    }
  });
}

// data fetching (many tutorials were used)
async function fetchAmountsAndRender() {
  if (loadingSpinner) {
    loadingSpinner.classList.add("active");
  }
  const fetchPromises = schools.map(async (school) => {
    const url = schoolUrls[school.name];
    if (url) {
      school.amount = await fetchAndParseAmount(url);
    }
  });
  await Promise.all(fetchPromises);
  renderLeaderboard();

  requestAnimationFrame(() => {
    if (loadingSpinner) {
      loadingSpinner.classList.remove("active");
    }

    mainContent.classList.remove("is-loading");
  });
}
window.addEventListener("resize", renderLeaderboard);
fetchAmountsAndRender();

// snoow
function createSnowfall() {
  const container = document.getElementById("snow-container");
  const flakeCount = 150;
  for (let i = 0; i < flakeCount; i++) {
    const flake = document.createElement("div");
    flake.className = "flake";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = Math.random() * 3 + 2 + "s";
    flake.style.animationDelay = Math.random() * 5 + "s";
    flake.style.opacity = Math.random() * 0.5 + 0.2;
    flake.style.width = Math.random() * 3 + 1 + "px";
    flake.style.height = flake.style.width;
    container.appendChild(flake);
  }
}
createSnowfall();
