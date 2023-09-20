document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#header");

  if (header) {
    const headerScrollIndicator = document.createElement("div");
    headerScrollIndicator.id = "headerScrollIndicator";

    header.appendChild(headerScrollIndicator);

    const updateProgress = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressPercentage = (scrolled / totalHeight) * 100;

      headerScrollIndicator.style.width = `${progressPercentage}%`;
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);
  }
});