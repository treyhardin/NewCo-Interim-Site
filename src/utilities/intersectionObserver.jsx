let options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const callback = (e) => {
  console.log(e)
}

export const observer = new IntersectionObserver(callback, options);