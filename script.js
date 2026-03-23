"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
function drawSectorOverlay(canvas, img1, img2, crop) {
    const ctx = canvas.getContext("2d");
    const W = img1.naturalWidth;
    const H = img1.naturalHeight;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img1, 0, 0, W, H);
    const pct = crop / 100;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.sqrt(W * W + H * H);
    const startAngle = Math.PI;
    const endAngle = startAngle + 2 * Math.PI * pct;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img2, 0, 0, W, H);
    ctx.restore();
    return canvas;
}
function downloadCanvas(canvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
}
function loadImage(src) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
    });
}
function main(src1, src2) {
    return __awaiter(this, void 0, void 0, function* () {
        let downvote = document.getElementById("downvote");
        let upvote = document.getElementById("upvote");
        const img1 = yield loadImage(src1);
        const img2 = yield loadImage(src2);
        if (document.getElementById("upvote") !== null) {
            let percentage = Number(upvote.value);
            const canvas = drawSectorOverlay(document.getElementById("canvas"), img1, img2, percentage);
            downloadCanvas(canvas, `${upvote.value}-percent-upvote-${downvote.value}-percent-downvote.png`);
        }
    });
}
let marginTop = 1;
let downloadEl = document.getElementById("download");
downloadEl.style.marginTop = "1rem";
(_a = document.getElementById("upvote")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
    let downvote = document.getElementById("downvote");
    let upvote = document.getElementById("upvote");
    downvote.value = String(100 - Number(upvote.value));
    if (Number(upvote.value) >= 100) {
        upvote.value = "100";
        downvote.value = "0";
    }
    if (Number(upvote.value) <= 0) {
        upvote.value = "0";
        downvote.value = "100";
    }
    updatePreview();
});
(_b = document.getElementById("downvote")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function () {
    let downvote = document.getElementById("downvote");
    let upvote = document.getElementById("upvote");
    upvote.value = String(100 - Number(downvote.value));
    if (Number(downvote.value) >= 100) {
        downvote.value = "100";
        upvote.value = "0";
    }
    if (Number(downvote.value) <= 0) {
        downvote.value = "0";
        upvote.value = "100";
    }
    updatePreview();
});
let previewCanvas = document.getElementById("canvas");
let img1;
let img2;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        img1 = yield loadImage("img/downvote.png");
        img2 = yield loadImage("img/upvote.png");
        updatePreview();
    });
}
function updatePreview() {
    const upvote = document.getElementById("upvote");
    const percentage = Number(upvote.value);
    drawSectorOverlay(previewCanvas, img1, img2, percentage);
}
init();
const kaboom = ["alex told me to tell y'all to check out https://amogus.church",
    "to whoever is reading this message, I do not understand what I created when I wrote this code, now only god knows what it does. Please add the amount of hours you spent working on it to this counter: 69 hours",
    "No you gotta write it yourself Just weird Write* Whatever comes to mind As long as it takes more than 20 minutes to write",
    "Le fraud",
    "Concorde is a retired Anglo-French supersonic airliner jointly developed and manufactured by Sud Aviation and the British Aircraft Corporation (BAC).",
    "The Hack Foundation (d.b.a. Hack Club) is a 501(c)(3) non-profit organization based in California aiming to teach and encourage teenagers to code, engineer, and develop."];
function sillyShitBecauseINeedMyHackatimeHours() {
    const min = 20000;
    const max = 150000;
    console.log("testa");
    const delay = Math.random() * (max - min) + min;
    let thing = Math.floor(Math.random() * kaboom.length);
    console.log(thing);
    console.log(kaboom[thing]);
    alert(kaboom[thing]);
    marginTop += 0.1;
    downloadEl.style.marginTop = `${marginTop}rem`;
    setTimeout(() => {
        window.open("ad.html", ":3");
        console.log("dslakfkasd");
        sillyShitBecauseINeedMyHackatimeHours();
    }, delay);
}
sillyShitBecauseINeedMyHackatimeHours();
(_c = document.getElementById("download")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", sillyShitBecauseINeedMyHackatimeHours);
//kim jong un is a master of goon
//me and p diddy had a sneaky sneaky link
//he showed me his giant dingaling
//jeffrey epstein touched me when i was a teen
