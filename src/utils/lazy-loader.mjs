const callback = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-src");
      entry.target.setAttribute("src", url);

      lazyLoader.unobserve(entry.target)
    }
  });
};

const lazyLoader = new IntersectionObserver(callback, {});

const test = (item) => {
  lazyLoader.observe(item);
};

export { test };
