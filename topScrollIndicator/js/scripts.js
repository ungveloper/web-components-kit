document.addEventListener("DOMContentLoaded", () => {
  const topScrollIndicator = document.createElement("div");
  topScrollIndicator.setAttribute("id", "topScrollIndicator");

  document.body.appendChild(topScrollIndicator);

  const updateProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    let progressPercentage = (scrolled / totalHeight) * 100;
    if (progressPercentage > 99.93) {
      progressPercentage = 100;
    }

    topScrollIndicator.style.width = `${progressPercentage}%`;
  };

  updateProgress();

  window.addEventListener("scroll", updateProgress);
});