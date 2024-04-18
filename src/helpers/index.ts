import gsap from "gsap";

export const onBeforeEnter = (el: any) => {
  el.style.opacity = "0";
  el.style.height = "0";
};

export const onEnter = (el: any, _done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    height: "auto",
    delay: +el.dataset.index * 0.3,
    // stagger: 0.2,

    // onComplete: done,
  });
};
export const onLeave = (el: any, _done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: +el.dataset.index * 0.3,
    // stagger: 0.2,

    // translateX: -20,
    // onComplete: done,
  });
};
