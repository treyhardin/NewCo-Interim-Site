import { setActiveNavigation } from "../components/header/header";

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

let navigationObserverOptions = {
  rootMargin: "0px",
  threshold: 0.2,
};

const navigationCallback = (entries, observer) => {

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveNavigation(entry.target.id)
    }
  });
};

export const observer = new IntersectionObserver(callback, options);
export const navigationObserver = new IntersectionObserver(navigationCallback, navigationObserverOptions);