let options = {
  rootMargin: "0px",
  threshold: 0.9,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.dataset.animated = true
    }
  });
};

export const observer = new IntersectionObserver(callback, options);