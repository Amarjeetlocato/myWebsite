// ===== STATUS MESSAGE DISPLAY =====
function showStatusMessage(message, type = "info") {
  // Remove existing message if any
  const existingMsg = document.getElementById("statusMessage");
  if (existingMsg) existingMsg.remove();

  // Create message element
  const msgElement = document.createElement("div");
  msgElement.id = "statusMessage";
  msgElement.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    animation: slideDown 0.4s ease-out;
    max-width: 90%;
  `;

  if (type === "searching") {
    msgElement.style.cssText += `
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    `;
    msgElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="spinner" style="width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        ${message}
      </div>
    `;
  } else if (type === "loading") {
    msgElement.style.cssText += `
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
    `;
    msgElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="spinner" style="width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        ${message}
      </div>
    `;
  } else if (type === "redirecting") {
    msgElement.style.cssText += `
      background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    `;
    msgElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        ✓ ${message}
      </div>
    `;
  } else if (type === "error") {
    msgElement.style.cssText += `
      background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
    `;
    msgElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        ✕ ${message}
      </div>
    `;
  }

  document.body.appendChild(msgElement);

  // Add animation styles
  if (!document.getElementById("statusAnimations")) {
    const style = document.createElement("style");
    style.id = "statusAnimations";
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  return msgElement;
}

// ===== HIDE STATUS MESSAGE =====
function hideStatusMessage() {
  const msgElement = document.getElementById("statusMessage");
  if (msgElement) {
    msgElement.style.animation = "fadeOut 0.4s ease-in";
    setTimeout(() => msgElement.remove(), 400);
  }
}
function driveImage(url) {
  if (!url) return "";
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://drive.google.com/thumbnail?id=${id[0]}&sz=w2000` : url;

  
  
}

// ===== LOAD PROFILE DATA ON TEMPLATE PAGES =====
function loadProfile(item) {
  if (!item) {
    console.error("No profile data provided");
    return;
  }

  try {
    // ===== NAV PROFILE =====
    const navData = document.getElementById("nav-data");
    if (navData) {
      navData.innerHTML = `
        <h1 onclick="toggleInfo()" style="color:#2563eb;">${item.shortName || item.fullName || "Profile"}</h1>
        <div class="info-box" id="infoBox">
          <img src="${driveImage(item.proimage)}" alt="Profile" style="width:100%; border-radius:10px;">
          <h3>${item.fullName || ""}</h3>
          <p>${item.saddress || ""}</p>
        </div>
      `;
    }

    // ===== SLIDER =====
    const slider = document.getElementById("slider");
    if (slider && item.slider) {
      const images = item.slider.split(",").map(s => s.trim());
      if (images.length > 0) {
        let currentIndex = 0;
        
        function changeSlide() {
          const imageUrl = driveImage(images[currentIndex]);
          slider.style.backgroundImage = `url('${imageUrl}')`;
          slider.style.backgroundSize = "cover";
          slider.style.backgroundPosition = "center";
          currentIndex = (currentIndex + 1) % images.length;
        }
        
        changeSlide();
        setInterval(changeSlide, 5000);
      }
    }

    // ===== SOCIAL CARDS =====
    const yImageUrl = driveImage(item.yimage);
    const iImageUrl = driveImage(item.iimage);
    const fImageUrl = driveImage(item.fimage);
    
    console.log("Profile Images:", { yImageUrl, iImageUrl, fImageUrl });
    
    // YouTube Card
    const youtubeCard = document.getElementById("youtube-card");
    if (youtubeCard) {
      youtubeCard.innerHTML = `
        <a href="${item.yurl || "#"}" target="_blank" rel="noopener noreferrer">
          <img src="${yImageUrl}" alt="YouTube" style="width:100%; height:auto; border-radius:10px;">
        </a>
        <p>YouTube</p>
      `;
    }

    // Instagram Card
    const instagramCard = document.getElementById("instagram-card");
    if (instagramCard) {
      instagramCard.innerHTML = `
        <a href="${item.iurl || "#"}" target="_blank" rel="noopener noreferrer">
          <img src="${iImageUrl}" alt="Instagram" style="width:100%; height:auto; border-radius:10px;">
        </a>
        <p>Instagram</p>
      `;
    }

    // Facebook Card
    const facebookCard = document.getElementById("facebook-card");
    if (facebookCard) {
      facebookCard.innerHTML = `
        <a href="${item.furl || "#"}" target="_blank" rel="noopener noreferrer">
          <img src="${fImageUrl}" alt="Facebook" style="width:100%; height:auto; border-radius:10px;">
        </a>
        <p>Facebook</p>
      `;
    }

    // ===== THOUGHT/BIO =====
    const thoughtData = document.getElementById("thought-data");
    if (thoughtData) {
      thoughtData.innerText = item.thought || "Welcome to my profile";
    }

    // ===== MAP =====
    const mapData = document.getElementById("map-data");
    if (mapData && item.map && typeof item.map === "string" && item.map.startsWith("http")) {
      mapData.innerHTML = `
        <a href="${item.map}" target="_blank" rel="noopener noreferrer">
          <img 
            class="map" 
            src="${driveImage(item.map)}" 
            loading="lazy" 
            alt="Location Map"
            style="width:100%; height:auto; border-radius:20px; cursor:pointer;">
        </a>
      `;
    }

    // ===== SOCIAL LINKS =====
    const instagramLink = document.getElementById("instagram-data");
    if (instagramLink) instagramLink.href = item.iurl || "#";
    
    const facebookLink = document.getElementById("facebook-data");
    if (facebookLink) facebookLink.href = item.furl || "#";
    
    const youtubeLink = document.getElementById("youtube-data");
    if (youtubeLink) youtubeLink.href = item.yurl || "#";

    console.log("Profile loaded successfully");
  } catch (error) {
    console.error("Error loading profile:", error.message);
  }
}

// ===== AUTO-LOAD PROFILE ON TEMPLATE PAGES =====
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on a template page (not the index page)
  const isTemplatePage = !document.getElementById("searchForm");
  
  if (isTemplatePage) {
    // Retrieve profile data from sessionStorage
    const profileDataStr = sessionStorage.getItem("profileData");
    
    if (profileDataStr) {
      try {
        const profileData = JSON.parse(profileDataStr);
        console.log("Loading profile data from sessionStorage:", profileData);
        loadProfile(profileData);
      } catch (error) {
        console.error("Error parsing profile data:", error.message);
      }
    } else {
      console.warn("No profile data found in sessionStorage. Redirecting to home...");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }
  }
});

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== EMAIL TO USERNAME CONVERTER =====
function convertEmailToUsername(email) {
  // Convert email: aksooon098@gmail.com → aksooon098_gmail_com
  return email.toLowerCase().replace(/@/g, "_").replace(/\./g, "_");
}

// ===== MAIN SEARCH FUNCTION =====
async function searchProfile(email) {
  // Validate email format
  if (!isValidEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  const user = convertEmailToUsername(email);
  const sheetURL = "https://script.google.com/macros/s/AKfycbyPYdKT5pYBjVACOTrqXhYr3YopfbUQu5kN5pYv2I4mx9QWsh9y7LttAY8qA9sn9__NWg/exec";

  try {
    // Show searching status
    showStatusMessage("🔍 Searching for profile...", "searching");

    // Fetch profile data from AppScript
    const response = await fetch(`${sheetURL}?user=${encodeURIComponent(user)}`, {
      // method: "GET",
      // headers: {
      //   "Content-Type": "application/json"
      // }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server. Please try again.");
    }

    // Show loading status
    showStatusMessage("⏳ Loading profile data...", "loading");

    const data = await response.json();
    console.log("Profile data fetched:", data);

    // Check if user was found
    if (!data || data.error) {
      throw new Error(data?.message || "Profile not found. Please check the email address.");
    }

    // Validate required fields
    if (!data.template) {
      console.warn("Warning: Template field missing, using default template 1");
      data.template = 1;
    }

    // Show redirecting status
    showStatusMessage("✓ Profile loaded successfully! Redirecting...", "redirecting");

    // Wait 1 second to let user see the success message, then redirect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Profile found - redirect based on template number
    redirectToTemplate(data, email);

  } catch (error) {
    console.error("Error fetching profile:", error.message);
    hideStatusMessage();
    throw error;
  }
}

// ===== TEMPLATE REDIRECT FUNCTION =====
function redirectToTemplate(profileData, email) {
  // Template mapping
  const templateMap = {
    1: "template1.html",
    2: "template2.html",
    3: "template3.html",
    4: "template.html"
  };

  try {
    // Get template number from data (convert to string for safety)
    let templateNo = parseInt(profileData.template) || 1;
    
    // Ensure templateNo is within valid range
    if (templateNo < 1 || templateNo > 4) {
      console.warn(`Invalid template number ${templateNo}, using default template 1`);
      templateNo = 1;
    }

    const templateFile = templateMap[templateNo] || "template1.html";

    // Create profile URL with email parameter
    const profileUrl = `${templateFile}?email=${encodeURIComponent(email)}`;

    console.log(`Redirecting to template ${templateNo}: ${profileUrl}`);

    // Store profile data in sessionStorage for the template page to access
    sessionStorage.setItem("profileData", JSON.stringify(profileData));
    sessionStorage.setItem("userEmail", email);

    // Redirect to the template page
    window.location.href = profileUrl;
  } catch (error) {
    console.error("Error in redirectToTemplate:", error.message);
    throw new Error("Failed to process profile. Please try again.");
  }
}

// ===== DARK MODE TOGGLE =====
function toggleMode() {
  document.body.classList.toggle("dark");
}

// ===== FORM SUBMISSION HANDLER =====
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  
  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("username");
      const submitBtn = document.getElementById("submitBtn");
      const email = emailInput.value.trim();

      // Validate email field
      if (!email) {
        showStatusMessage("⚠️ Please enter an email address", "error");
        setTimeout(() => hideStatusMessage(), 3000);
        return;
      }

      // Disable button during request
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Searching...";

      try {
        await searchProfile(email);
        // If successful, page will redirect, so no need to reset button
      } catch (error) {
        // Show error message with status
        showStatusMessage("❌ " + (error.message || "An unexpected error occurred. Please try again."), "error");
        
        // Re-enable button on error
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          hideStatusMessage();
        }, 3000);
        
        // Clear input for retry
        emailInput.focus();
      }
    });
  }
});