export function setBodyScroll(on: boolean) {
  if (on) {
    // Re-enable scrolling and remove the added padding.
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";
  } else {
    // Disable scrolling and compensate for the scrollbar width.
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}
