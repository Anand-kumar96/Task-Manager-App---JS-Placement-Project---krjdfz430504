const colorList = [
    {color : `linear-gradient(to right, rgb(185, 43, 39), rgb(21, 101, 192))`},
    {color : `linear-gradient(to right, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125))`},
    {color : `linear-gradient(to right, rgb(221, 62, 84), rgb(107, 229, 133))`},
    {color : `linear-gradient(to right, rgb(101, 153, 153), rgb(244, 121, 31))`},
    {color : `linear-gradient(to right, rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128))`},
    {color : `linear-gradient(to right, rgb(252, 92, 125), rgb(106, 130, 251))`},
    {color : `linear-gradient(to right, rgb(167, 112, 239), rgb(207, 139, 243), rgb(253, 185, 155))`},
    {color : `linear-gradient(to right, rgb(222, 97, 97), rgb(38, 87, 235))`},
    {color : `linear-gradient(to right, rgb(11, 72, 107), rgb(245, 98, 23))`},
    {color : `linear-gradient(to right, rgb(255, 75, 31), rgb(31, 221, 255))`},
    {color : `linear-gradient(to right, rgb(252, 53, 76), rgb(10, 191, 188))`},
    {color : `linear-gradient(to right, rgb(229, 93, 135), rgb(95, 195, 228))`},
    {color : `linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89))`},
    {color : `linear-gradient(to right, rgb(127, 127, 213), rgb(134, 168, 231), rgb(145, 234, 228))`},
    {color : `linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145))`},
    {color : `linear-gradient(to right, rgb(52, 148, 230), rgb(236, 110, 173))`},
    {color : `linear-gradient(to right, rgb(0, 153, 247), rgb(241, 23, 18))`},
    {color : `linear-gradient(to right, rgb(254, 172, 94), rgb(199, 121, 208), rgb(75, 192, 200))`},
    {color : `linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230))`},
    {color : `linear-gradient(to right, rgb(168, 0, 119), rgb(102, 255, 0))`},
    {color : `linear-gradient(to right, rgb(192, 57, 43), rgb(142, 68, 173))`},
    {color : `linear-gradient(to right, rgb(237, 66, 100), rgb(255, 237, 188))`},
    {color : `linear-gradient(to right, rgb(43, 192, 228), rgb(234, 236, 198))`},
    {color : `linear-gradient(to right, rgb(55, 59, 68), rgb(66, 134, 244))`},
    {color : `linear-gradient(to right, rgb(0, 210, 255), rgb(146, 141, 171))`},
    {color : `linear-gradient(to right, rgb(247, 255, 0), rgb(219, 54, 164))`},
    {color : `linear-gradient(to right, rgb(0, 65, 106), rgb(121, 159, 12), rgb(255, 224, 0))`},
    {color : `linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))`},
    {color : `linear-gradient(to right, rgb(251, 211, 233), rgb(187, 55, 125))`},
    {color : `linear-gradient(to right, rgb(69, 104, 220), rgb(176, 106, 179))`},
    {color : `linear-gradient(to right, rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100))`},
    {color : `linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))`},
    {color : `linear-gradient(to right, rgb(0, 65, 106), rgb(228, 229, 230))`},
    {color : `linear-gradient(to right, rgb(120, 2, 6), rgb(6, 17, 97))`},
    {color : `linear-gradient(to right, rgb(252, 53, 76), rgb(10, 191, 188))`},
];
const body = document.body;
const colorbtn = document.querySelector(".color_change")
colorbtn.addEventListener("click",() => {
    const selectedColor = colorList[Math.floor(Math.random()*(colorList.length + 1))].color;
    body.style.background =selectedColor;
});