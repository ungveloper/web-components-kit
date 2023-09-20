document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.setAttribute("id", "scrollIndicator");

  const progressSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  progressSvg.setAttribute("viewBox", "0 0 100 100");

  const progressBackgroundCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressBackgroundCircle.setAttribute("cx", "50");
  progressBackgroundCircle.setAttribute("cy", "50");
  progressBackgroundCircle.setAttribute("r", "48");
  progressSvg.appendChild(progressBackgroundCircle);

  const progressCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressCircle.setAttribute("class", "progressCircle");
  progressCircle.setAttribute("cx", "50");
  progressCircle.setAttribute("cy", "50");
  progressCircle.setAttribute("r", "48");
  progressCircle.setAttribute("stroke-dasharray", "301.6");
  progressCircle.setAttribute("stroke-dashoffset", "301.6");
  progressSvg.appendChild(progressCircle);

  const progressText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  progressText.setAttribute("x", "50");
  progressText.setAttribute("y", "55");
  progressText.setAttribute("text-anchor", "middle");
  progressText.setAttribute("class", "progressText");
  progressText.textContent = "0%";
  progressSvg.appendChild(progressText);

  scrollIndicator.appendChild(progressSvg);

  document.body.appendChild(scrollIndicator);

  const updateProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    let progressPercentage = scrolled / totalHeight;

    progressPercentage = Math.min(progressPercentage, 1);

    const circumference = 2 * Math.PI * 48;
    const offset = circumference - progressPercentage * circumference;
    progressCircle.style.strokeDashoffset = offset;

    progressText.textContent = `${Math.round(progressPercentage * 100)}%`;

    if (Math.round(progressPercentage * 100) === 0) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  };

  updateProgress();

  window.addEventListener("scroll", updateProgress);
});