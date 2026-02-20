const overlay = document.getElementById("driveOverlay");
const frame = document.getElementById("driveFrame");
const loading = document.getElementById("driveLoading");
const title = document.getElementById("driveTitle");
const openBtn = document.getElementById("driveOpenBtn");
const closeBtn = document.getElementById("driveCloseBtn");

function makeEmbedLink(url) {

  if (url.includes("/drive/folders/")) {
    const id = url.split("/drive/folders/")[1].split("/")[0].split("?")[0];
    return "https://drive.google.com/embeddedfolderview?id=" + id + "#list";
  }

  if (url.includes("/file/d/")) {
    const id = url.split("/file/d/")[1].split("/")[0].split("?")[0];
    return "https://drive.google.com/file/d/" + id + "/preview";
  }

  return url;
}

function openDrive(url, text) {

  const embedLink = makeEmbedLink(url);


  title.textContent = text || "Bac Story";

  openBtn.href = url;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  loading.style.display = "flex";
  frame.style.display = "none";

  frame.src = embedLink;

  frame.onload = function () {
    loading.style.display = "none";
    frame.style.display = "block";
  };
}


function closeDrive() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  frame.src = "";
}


closeBtn.addEventListener("click", closeDrive);

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    closeDrive();
  }
});

window.openDrive = openDrive;

// hadi bah bla mtfasi window.open mn html (14k line :"() win yl9aha y3rf bly link t3 drive w yoverridiha :)
const originalOpen = window.open;

window.open = function(url, target, features) {
  if (url && url.includes("drive.google.com")) {
    openDrive(url);
    return;
  }

  return originalOpen(url, target, features);
};