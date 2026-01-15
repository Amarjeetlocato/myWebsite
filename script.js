const sheetURL =
  "https://script.google.com/macros/s/AKfycbwXafkf6E5czgrP0oL0WEmgmDaDuKuKtFz7RIM-5MmmJcrAFR8EPSmWg7vPAy1q7K3BQA/exec";

function driveImage(url) {
  if (!url) return "";
  
  // Extract ID from various Google Drive URL formats
  let id;
  
  // Format: https://drive.google.com/open?id=XXX
  let match = url.match(/[?&]id=([^&]+)/);
  if (match) {
    id = match[1];
  } else {
    // Format: https://drive.google.com/file/d/XXX/view
    match = url.match(/\/d\/([^\/]+)/);
    if (match) {
      id = match[1];
    } else {
      // Last resort: look for 25+ character ID
      match = url.match(/[-\w]{25,}/);
      if (match) {
        id = match[0];
      }
    }
  }
  
  if (id) {
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }
  
  return url;
}

// 🔑 GET user FROM URL
function getUserFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

document.addEventListener("DOMContentLoaded", async () => {

  const user = getUserFromURL();

  // ❌ No user in URL
  if (!user) {
    alert("Invalid profile link");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${sheetURL}?user=${encodeURIComponent(user)}`);
    const data = await res.json();

    console.log("PROFILE DATA:", data);
    console.log("Image URLs:", {
      proimage: data?.proimage,
      yimage: data?.yimage,
      iimage: data?.iimage,
      fimage: data?.fimage
    });

    if (!data || data.error) {
      alert("Profile not found");
      window.location.href = "index.html";
      return;
    }

    loadProfile(data);

  } catch (err) {
    console.error("FETCH ERROR", err);
    alert("Server error");
  }
});
function loadProfile(item) {
  // ===== NAV PROFILE =====
  const navData = document.getElementById("nav-data");
  if (navData) {
    navData.innerHTML = `
     <h1 onclick="toggleInfo()" style="color:#2563eb;">${item.shortName}</h1>
      <div class="info-box" id="infoBox">
        <img src="${driveImage(item.proimage)}" alt="Profile">
        <h3>${item.fullName}</h3>
        <p>${item.saddress}</p>
      </div>
    `;
  }

  // ===== SLIDER =====
  const slider = document.getElementById("slider");
  if (slider && item.slider) {
    const images = item.slider.split(",").map(s => s.trim());
    let i = 0;
    function changeSlide() {
      slider.style.backgroundImage = `url('${driveImage(images[i])}')`;
      i = (i + 1) % images.length;
    }
    changeSlide();
    setInterval(changeSlide, 5000);
  }

  // ===== CARDS =====
  const yImageUrl = driveImage(item.yimage);
  const iImageUrl = driveImage(item.iimage);
  const fImageUrl = driveImage(item.fimage);
  
  console.log("Converted URLs:", { yImageUrl, iImageUrl, fImageUrl });
  
  document.getElementById("youtube-card").innerHTML = `
    <a href="${item.yurl}" target="_blank">
      <img src="${yImageUrl}" onerror="console.error('YouTube image failed:', '${yImageUrl}')">
    </a>
    <p>YouTube</p>
  `;

  document.getElementById("instagram-card").innerHTML = `
    <a href="${item.iurl}" target="_blank">
      <img src="${iImageUrl}" onerror="console.error('Instagram image failed:', '${iImageUrl}')">
    </a>
    <p>Instagram</p>
  `;

  document.getElementById("facebook-card").innerHTML = `
    <a href="${item.furl}" target="_blank">
      <img src="${fImageUrl}" onerror="console.error('Facebook image failed:', '${fImageUrl}')">
    </a>
    <p>Facebook</p>
  `;


  // ===== THOUGHT =====
  const thought = document.getElementById("thought-data");
  if (thought) thought.innerText = item.thought || "";

  // ===== MAP =====
  if (item.map && item.map.startsWith("http")) {
      document.getElementById("map-data").innerHTML = `
        <iframe
          class="map"
          src="${item.map}"
          loading="lazy">
        </iframe>
      `;
    }

  // ===== SOCIAL LINKS =====
  document.getElementById("instagram-data").href = item.iurl;
  document.getElementById("facebook-data").href = item.furl;
  document.getElementById("youtube-data").href = item.yurl;
}

// ===== DARK MODE =====
function toggleMode() {
  document.body.classList.toggle("dark");
}
