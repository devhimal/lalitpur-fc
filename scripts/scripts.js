document.addEventListener("DOMContentLoaded", () => {
  const languages = [
    "स्वागत छ", "स्वागत है", // "Welcome", "欢迎", "ようこそ", "환영합니다"
  ];

  const loaderText = document.getElementById("loader-text");
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".content");
  const heroImage = document.querySelector(".hero-image img");
  const words = document.querySelectorAll(".hero-title span");
  const tags = document.querySelectorAll(".hero-tag span");

  gsap.registerPlugin(ScrollTrigger);
  content.style.display = "none";

  const tl = gsap.timeline();

  // Preloader language sequence
  languages.forEach((lang) => {
    tl.to(loaderText, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => loaderText.textContent = lang
    });
    tl.to(loaderText, { duration: 0.2, opacity: 1 });
    tl.to({}, { duration: 0.7 });
  });

  // Hide preloader, show content
  tl.to(preloader, {
    duration: 0,
    opacity: 0,
    onComplete: () => {
      preloader.style.display = "none";
      content.style.display = "block";

      // 🟡 Image load wait
      heroImage.addEventListener("load", () => {
        const imgTimeline = gsap.timeline();

        // Animate hero image
        imgTimeline.from(heroImage, {
          duration: 5,
          opacity: 0,
          scale: 0,
          ease: "power2.out"
        });


        // ClipPath that gonna see after scroll
        gsap.set(heroImage, {
          clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
        });

        gsap.to(heroImage, {
          clipPath: "polygon(10% 0, 89% 0, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: heroImage,
            start: "top center",
            end: "bottom 20%",
            scrub: true,
            markers: true
          }
        });

        // Animate hero title words after image
        imgTimeline.fromTo(
          words,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2
          }
        );


        // Animate hero tags words after each words
        imgTimeline.fromTo(
          tags, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.6,
          ease: "back",
          stagger: 0.2
        }
        )

      });




      // 🟡 Fallback in case image is cached
      if (heroImage.complete) {
        heroImage.dispatchEvent(new Event("load"));
      }
    }
  });
});
