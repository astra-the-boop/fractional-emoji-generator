function drawSectorOverlay(
    img1: HTMLImageElement,
    img2: HTMLImageElement,
    crop: number
): HTMLCanvasElement{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const W = img1.naturalWidth;
    const H = img1.naturalHeight;
    canvas.width = W;
    canvas.height = H;

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
    const img1: HTMLImageElement = await loadImage(src1);
    const img2: HTMLImageElement = await loadImage(src2);

    if(document.getElementById("upvote")!==null){
        let upvote:HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
        let percentage:number = Number(upvote.value);
        const canvas = drawSectorOverlay(img1, img2, percentage);
        downloadCanvas(canvas, "result.png");
    }
}


document.getElementById("upvote")?.addEventListener("change", function(){
    let downvote: HTMLInputElement = document.getElementById("downvote") as HTMLInputElement;
    let upvote: HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
    downvote.value = String(100 - Number(upvote.value));
});


document.getElementById("downvote")?.addEventListener("change", function(){
    let downvote: HTMLInputElement = document.getElementById("downvote") as HTMLInputElement;
    let upvote: HTMLInputElement = document.getElementById("upvote") as HTMLInputElement;
    upvote.value = String(100 - Number(downvote.value));
});

// main("img/downvote.png", "img/upvote.png", 25);