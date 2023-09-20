const TRANSITION_DURATION = 0.3;
let LAST_SCROLL_TOP = 0;
let ACCUMULATED_OFFSET = 0;
let IS_INITIAL_LOAD = true;

const handleScrollDown = (headerElement) => {
    headerElement.style.transition = `transform ${TRANSITION_DURATION}s ease`;
    headerElement.style.transform = "translateY(-100%)";
    ACCUMULATED_OFFSET = 0;
};

const handleScrollUp = (headerElement, delta) => {
    headerElement.style.transition = "none";
    ACCUMULATED_OFFSET += delta;
    const headerHeight = headerElement.clientHeight;
    ACCUMULATED_OFFSET = Math.min(ACCUMULATED_OFFSET, headerHeight);
    const translateYValue = headerHeight - ACCUMULATED_OFFSET;
    headerElement.style.transform = `translateY(-${translateYValue}px)`;
};

document.addEventListener("scroll", () => {
    if (IS_INITIAL_LOAD) {
        IS_INITIAL_LOAD = false;
        return;
    }

    const headerElement = document.querySelector("header");
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
    const delta = LAST_SCROLL_TOP - currentScrollTop;

    if (currentScrollTop === 0) {
        headerElement.style.transition = `transform ${TRANSITION_DURATION}s ease`;
        headerElement.style.transform = "translateY(0)";
        return;
    }

    if (currentScrollTop > LAST_SCROLL_TOP) {
        handleScrollDown(headerElement);
    } else {
        handleScrollUp(headerElement, delta);
    }

    LAST_SCROLL_TOP = currentScrollTop;
});