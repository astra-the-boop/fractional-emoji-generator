const adList:string[] = ["annabel1", "euan1", "euan2", "paolo1", "paolo2", "tongyu1", "tongyu2", "wacper1", "wacper2"]

document.addEventListener("DOMContentLoaded", () => {
    let ad:HTMLImageElement = document.getElementById("ad") as HTMLImageElement;
    let random: number = Math.floor(Math.random() * adList.length);
    let shit: string = `img/${adList[random]}.png`;
    console.log(random);
    console.log(shit);
    ad.src = shit;
})