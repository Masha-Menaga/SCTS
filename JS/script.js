// LINKS
const seekerForm = "https://docs.google.com/forms/d/e/1FAIpQLSfg-qbBpfglQb3-7fnsF1_KtXtjqEvel1guDbRPte2nTgjaug/viewform?usp=sharing&ouid=114148624651630355285";
const giverForm = "https://docs.google.com/forms/d/e/1FAIpQLSfmsT2m0r7ecU1zAeCTKfNWoBfkRFoH2Xwg25W_n00d5nLbFw/viewform?usp=sharing&ouid=114148624651630355285";

// BUTTON ACTIONS
function goToSeeker() {
    window.open(seekerForm, "_blank");
}

function showPassword() {
    document.getElementById("passwordBox").style.display = "block";
}

function checkPassword() {
    const password = document.getElementById("password").value;

    if (password === "admin123") {
        window.open(giverForm, "_blank");
    } else {
        alert("Wrong Password");
    }
}

// FETCH JOBS
const sheetURL = "https://opensheet.elk.sh/1zaIHQTo_d9D2gKZyb_LbyuxsU4_xKuVDOGnNrASlG9Y/Jobs";

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("jobs");
    container.innerHTML = "";

    const jobs = data.filter(job => job["Job Title"]);

    // duplicate for smooth scrolling
    const displayJobs = [...jobs, ...jobs];

    displayJobs.slice(0, 10).forEach((job, index) => {

      const div = document.createElement("div");
      div.classList.add("job-card");

      div.innerHTML = `
        ${index < 2 ? '<span class="new-badge">NEW</span>' : ''}
        <h4>📘 ${job["Job Title"]}</h4>
        <p>${job["Department"]}</p>
        <small>🏫 ${job["Branch"]}</small>
        <a href="${seekerForm}" target="_blank" class="apply-btn">Apply Now</a>
      `;

      container.appendChild(div);

    });

  })
  .catch(() => {
    document.getElementById("jobs").innerHTML = "Unable to load jobs";
  });