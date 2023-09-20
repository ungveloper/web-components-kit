document.addEventListener("DOMContentLoaded", () => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const inPageNavigation = document.getElementById("inPageNavigation");

  if (isMobileDevice) {
    inPageNavigation.remove();
    return;
  }

  const getActiveSection = (sections) => {
    let currentSection = null;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top <= 0) {
        currentSection = section;
      }
    });

    return currentSection;
  };

  const scrollToElement = (element) => {
    element.scrollIntoView();
    window.scrollBy(0, 2);
  };

  const createNavigationItem = (element) => {
    const li = document.createElement("li");
    li.textContent = element.textContent;
    li.addEventListener("click", () => scrollToElement(element));

    return li;
  };

  const updateActiveNavItem = () => {
    const contentElement = document.querySelector(".content");
    const navElement = inPageNavigation.querySelector("nav");
    const contentAbsoluteTop =
      window.scrollY + contentElement.getBoundingClientRect().top;

    navElement.classList.toggle("sticky", window.scrollY >= contentAbsoluteTop);

    const sections = document.querySelectorAll("section");
    const currentSection = getActiveSection(sections);

    if (currentSection) {
      const h2 = currentSection.querySelector("h2");
      const h3s = Array.from(currentSection.querySelectorAll("h3"));
      let currentTitle = h2;

      h3s.forEach((h3) => {
        if (h3.getBoundingClientRect().top <= 0) {
          currentTitle = h3;
        }
      });

      const matchingNavItem = Array.from(
        inPageNavigation.querySelectorAll("li")
      ).find((li) => li.textContent === currentTitle.textContent);

      const currentActive = inPageNavigation.querySelector("li.active");

      if (!matchingNavItem.classList.contains("active")) {
        if (currentActive) {
          currentActive.classList.remove("active");
        }
        matchingNavItem.classList.add("active");
      }
    }
  };

  const buildInPageNavigation = () => {
    const h2Elements = document.querySelectorAll("section h2");
    const ul = document.createElement("ul");

    h2Elements.forEach((h2) => {
      ul.appendChild(createNavigationItem(h2));

      const subH3Elements = h2.parentElement.querySelectorAll("h3");
      if (subH3Elements.length > 0) {
        const subUl = document.createElement("ul");
        subH3Elements.forEach((h3) => {
          subUl.appendChild(createNavigationItem(h3));
        });
        ul.appendChild(subUl);
      }
    });

    const newNav = document.createElement("nav");
    newNav.appendChild(ul);

    while (inPageNavigation.firstChild) {
      inPageNavigation.removeChild(inPageNavigation.firstChild);
    }
    inPageNavigation.appendChild(newNav);
  };

  buildInPageNavigation();
  window.addEventListener("scroll", updateActiveNavItem);
  updateActiveNavItem();
});