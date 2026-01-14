const sheetURL = "https://script.google.com/macros/s/AKfycbyykVuTFRvdWK0uLkcbJ52_uOFOvZkXGx66oecY8vQUivC1iah52kGzAyBjdkZQbntWdw/exec";
const params = new URLSearchParams(window.location.search);
const username = params.get("u");
fetch(sheetURL)
    .then(response => response.json())
    .then(data => {

        if(data.length === 0 || !user) throw "No data found";

        function driveImage(url) {
  if (!url) return "";
  const id = url.match(/[-\w]{25,}/);
  return id
    ? `https://drive.google.com/thumbnail?id=${id[0]}&sz=w2000`
    : url;
}

        
        /* nav-data */
        const container1 = document.getElementById("nav-data");

        data.forEach(item => {
            container1.innerHTML = `
       <h1 onclick="toggleInfo()" style="color: #2563eb;">
        ${item.shortName}
       </h1>

    <div class="info-box" id="infoBox">
      <img src="${driveImage(item.proimage)}" alt="Profile Picture">
      <h3>${item.fullName}</h3>
      <p>${item.saddress}</p>
    </div>
  `;
        });

        // Slider Section
       const sliderImages = data[0].slider
  .split(",")
  .map(url => url.trim());

let currentIndex = 0;
const slider = document.getElementById("slider");



function changeSlide() {
  slider.style.backgroundImage = `url('${driveImage(sliderImages[currentIndex])}')`;
  currentIndex = (currentIndex + 1) % sliderImages.length;
}

changeSlide();
setInterval(changeSlide, 5000);

        /* youtube-data */
        const container2 = document.getElementById("youtube-card");

        data.forEach(item => {
            container2.innerHTML = `
    <a href="${driveImage(item.yurl)}" target="_blank">
      <img src="${driveImage(item.yimage)}" alt="YouTube Thumbnail">
    </a>
    <p>${item.title}</p>
  `;
        });
        /* instagram-data */
        const container3 = document.getElementById("instagram-card");

        data.forEach(item => {
            container3.innerHTML = `
    <a href="${driveImage(item.iurl)}" target="_blank">
      <img src="${driveImage(item.iimage)}" alt="Instagram Thumbnail">
    </a>
    <p>${item.title}</p>
  `;
        });

        /* facebook-data */
        const container4 = document.getElementById("facebook-card");
        data.forEach(item => {
            container4.innerHTML = `
    <a href="${driveImage(item.furl)}" target="_blank">
      <img src="${driveImage(item.fimage)}" alt="Facebook Thumbnail">
    </a>
    <p>${item.title}</p>
  `;
        });

        /* thought-data */
        const container5 = document.getElementById("thought-data");

        data.forEach(item => {
            container5.innerHTML = `
    ${item.thought}
  `;
        });


        /* map-data */
        const container6 = document.getElementById("map-data");

        data.forEach(item => {
            container6.innerHTML = `
    <iframe src="${driveImage(item.map)}" width="100%" height="320px" frameborder="0" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.25);"></iframe>
  `;
        });

        data.forEach(item => {

            document.getElementById("instagram-data").href = driveImage(item.iurl);
            document.getElementById("facebook-data").href = driveImage(item.furl);
            document.getElementById("youtube-data").href = driveImage(item.yurl);
            document.getElementById("gmail-data").href = `mailto:${item.gmail}`;

        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById("home").innerHTML = `<p style="color:red; text-align:center;">Something went wrong, try again</p>`;
    });



fetch(sheetURL)
  .then(res => res.json())
  .then(data => {

    const user = data.find(item => item.username === username);

    if (!user) {
      document.body.innerHTML = "Something went wrong, try again";
      return;
    }

    document.getElementById("name").innerText = user.fullName;
    document.getElementById("address").innerText = user.saddress;
    document.getElementById("photo").src = driveImage(user.proimage);
  })
  .catch(() => {
    document.body.innerHTML = "Something went wrong, try again";
  });

