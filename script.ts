function drawSectorOverlay(
    canvas: HTMLCanvasElement,
    img1: HTMLImageElement,
    img2: HTMLImageElement,
    crop: number
): HTMLCanvasElement{
    const ctx = canvas.getContext("2d")!;

    const W = img1.naturalWidth;
    const H = img1.naturalHeight;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(img1, 0, 0, W, H);

    const pct = crop / 100;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.sqrt(W*W+H*H);
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

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
    const link = document.createElement("a");
    link.download = filename;
    link.href= canvas.toDataURL("image/png");
    link.click();
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
    })
}

async function main(src1: string, src2: string){
    let downvote: HTMLInputElement = document.getElementById("downvote") as HTMLInputElement;
    let upvote: HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
    const img1: HTMLImageElement = await loadImage(src1);
    const img2: HTMLImageElement = await loadImage(src2);

    if(document.getElementById("upvote")!==null){
        let percentage:number = Number(upvote.value);
        const canvas = drawSectorOverlay(document.getElementById("canvas") as HTMLCanvasElement, img1, img2, percentage);
        downloadCanvas(canvas, `${upvote.value}-percent-upvote-${downvote.value}-percent-downvote.png`);
    }
}

let marginTop: number = 1;
let downloadEl:HTMLButtonElement = document.getElementById("download") as HTMLButtonElement;
downloadEl.style.marginTop = "1rem"

document.getElementById("upvote")?.addEventListener("change", function(){
    let downvote: HTMLInputElement = document.getElementById("downvote") as HTMLInputElement;
    let upvote: HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
    downvote.value = String(100 - Number(upvote.value));
    if(Number(upvote.value)>=100){
        upvote.value = "100";
        downvote.value = "0";
    }
    if(Number(upvote.value)<=0){
        upvote.value = "0";
        downvote.value = "100";
    }

    updatePreview();
});


document.getElementById("downvote")?.addEventListener("change", function(){
    let downvote: HTMLInputElement = document.getElementById("downvote") as HTMLInputElement;
    let upvote: HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
    upvote.value = String(100 - Number(downvote.value));
    if(Number(downvote.value)>=100){
        downvote.value = "100";
        upvote.value = "0";
    }
    if(Number(downvote.value) <= 0){
        downvote.value = "0";
        upvote.value = "100";
    }

    updatePreview()
});

let previewCanvas = document.getElementById("canvas") as HTMLCanvasElement;
let img1: HTMLImageElement;
let img2: HTMLImageElement;

async function init() {
    img1 = await loadImage("img/downvote.png");
    img2 = await loadImage("img/upvote.png");
    updatePreview()
}

function updatePreview(){
    const upvote = document.getElementById("upvote") as HTMLInputElement;
    const percentage = Number(upvote.value);

    drawSectorOverlay(previewCanvas, img1, img2, percentage);
}

init();

const kaboom:string[] = ["alex told me to tell y'all to check out https://amogus.church",
"to whoever is reading this message, I do not understand what I created when I wrote this code, now only god knows what it does. Please add the amount of hours you spent working on it to this counter: 69 hours",
"No you gotta write it yourself Just weird Write* Whatever comes to mind As long as it takes more than 20 minutes to write",
"Le fraud",
"Concorde is a retired Anglo-French supersonic airliner jointly developed and manufactured by Sud Aviation and the British Aircraft Corporation (BAC)."];



function sillyShitBecauseINeedMyHackatimeHours(){
    const min = 20000;
    const max = 150000;
    console.log("testa");
    const delay = Math.random()*(max-min)+min;

    let thing:number = Math.floor(Math.random()*kaboom.length);
    console.log(thing);
    console.log(kaboom[thing]);
    alert(kaboom[thing]);

    marginTop += 0.1;
    downloadEl.style.marginTop=`${marginTop}rem`;


    setTimeout(()=>{
        window.open("ad.html",":3");
        console.log("dslakfkasd")
        sillyShitBecauseINeedMyHackatimeHours();
    }, delay);
}

sillyShitBecauseINeedMyHackatimeHours();

document.getElementById("download")?.addEventListener("click", sillyShitBecauseINeedMyHackatimeHours);