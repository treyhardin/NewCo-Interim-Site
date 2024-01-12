let options = {
  rootMargin: "0px",
  threshold: 0.5,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      let delay = 0

      if (entry.target.dataset.animationDelay) {
        delay = entry.target.dataset.animationDelay
      }

      setTimeout(() => {
        entry.target.dataset.animated = true
      }, delay)
      
    }
  });
};

export const observer = new IntersectionObserver(callback, options);