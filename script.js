const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const canvas = document.getElementById("background_video");
const ctx = canvas.getContext("2d");

const frames = {
    getFrameLink: (index) => `img_seq/spade/spade${((index - 1) * 2 + 1).toString().padStart(5, "0")}.jpeg`,
    getFrame: (index) => {
        if (frames.cachedFrames[index]) {
            return frames.cachedFrames[index];
        }

        const img = new Image();
        img.src = frames.getFrameLink(index);
        frames.cachedFrames[index] = img;
        return img;
    },
    cachedFrames: {},
    totalFrames: 828,
    width: 1270,
    height: 720,
};

canvas.width = frames.width;
canvas.height = frames.height;

const startImg = frames.getFrame(1);
startImg.onload = function () {
    ctx.drawImage(startImg, 0, 0);
};

const updateImage = (index) => {
    const img = frames.getFrame(index);
    ctx.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(frames.totalFrames - 1, Math.floor(scrollFraction * frames.totalFrames));

    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const preloadImages = () => {
    for (let i = 1; i < frames.totalFrames; i++) {
        frames.getFrame(i);
    }
};

preloadImages();
