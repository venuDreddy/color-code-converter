const hexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
// input
const hexInput = document.querySelector(".hex");
const rgbInput = document.querySelector(".rgb");
const hslInput = document.querySelector(".hsl");

const hexBtn = document.querySelector(".hex-btn");
const rgbBtn = document.querySelector(".rgb-btn");
const hslBtn = document.querySelector(".hsl-btn");

const hexHeading = document.querySelector("#hex-heading");
const rgbHeading = document.querySelector("#rgb-heading");
const hslHeading = document.querySelector("#hsl-heading");

const hexArticle = document.querySelector(".hex-rgb");
const rgbArticle = document.querySelector(".rgb-hex");
const hslArticle = document.querySelector(".hsl-rgb");

const viceVersa = document.querySelectorAll(".vice-versa");

// let globalRgb = [];
// let globalHex = [];
// let globalHslToRgb = [];
let invalid;

const forms = document.querySelectorAll("form");
forms.forEach(function (item) {
  item.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});

// hex button
hexBtn.addEventListener("click", function (e) {
  console.log(hexInput.value);
  if (hexInput.value === "") {
    document.body.style.backgroundColor = `#FFFFFF`;
    defaultValue();
  } else {
    let rgb = hexToRgb(hexInput.value);
    rgbInput.value = `${rgb[0]},${rgb[1]},${rgb[2]}`;

    let hsl = rgbToHsl(rgbInput.value);
    hslInput.value = `${hsl[0]},${hsl[1]},${hsl[2]}`;
  }

  viceVersa.forEach(function (item) {
    item.style.backgroundColor = "black";
    item.style.color = "white";
  });
});

// rgb button
rgbBtn.addEventListener("click", function (e) {
  if (rgbInput.value === "") {
    document.body.style.backgroundColor = `#FFFFFF`;
    defaultValue();
  } else {
    let hex = rgbTohex(rgbInput.value);
    hexInput.value = `#${hexValues[hex[0]]}${hexValues[hex[1]]}${
      hexValues[hex[2]]
    }${hexValues[hex[3]]}${hexValues[hex[4]]}${hexValues[hex[5]]}`;

    let hsl = rgbToHsl(rgbInput.value);
    hslInput.value = `${hsl[0]},${hsl[1]},${hsl[2]}`;
  }

  viceVersa.forEach(function (item) {
    item.style.backgroundColor = "black";
    item.style.color = "white";
  });
});

// hsl button
hslBtn.addEventListener("click", function (e) {
  if (hslInput.value === "") {
    document.body.style.backgroundColor = `#FFFFFF`;
    defaultValue();
  } else {
    let rgb = hslToRgb(hslInput.value);
    rgbInput.value = `${rgb[0]},${rgb[1]},${rgb[2]}`;

    let hex = rgbTohex(rgbInput.value);
    hexInput.value = `#${hexValues[hex[0]]}${hexValues[hex[1]]}${
      hexValues[hex[2]]
    }${hexValues[hex[3]]}${hexValues[hex[4]]}${hexValues[hex[5]]}`;
  }

  viceVersa.forEach(function (item) {
    item.style.backgroundColor = "black";
    item.style.color = "white";
  });
});

// hex to rgb conversion
function hexToRgb(item) {
  const hex = item;
  const red = hex.slice(1, 3).split("");
  const green = hex.slice(3, 5).split("");
  const blue = hex.slice(5, 7).split("");
  const colorArray = [red, green, blue];

  let rgb = [];
  colorArray.forEach(function (item, index) {
    let sum = 0;
    let i;
    for (i = 0; i < 2; i++) {
      if (item[i] === "A" || item[i] === "a") {
        item[i] = 10;
      } else if (item[i] === "B" || item[i] === "b") {
        item[i] = 11;
      } else if (item[i] === "C" || item[i] === "c") {
        item[i] = 12;
      } else if (item[i] === "D" || item[i] === "d") {
        item[i] = 13;
      } else if (item[i] === "E" || item[i] === "e") {
        item[i] = 14;
      } else if (item[i] === "F" || item[i] === "f") {
        item[i] = 15;
      } else {
        item[i] = +item[i];
      }
    }
    // console.log(item);
    sum = item[0] * 16 + item[1];
    rgb[index] = sum;
  });
  // globalRgb = rgb;

  document.body.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  return rgb;
}

// rgb to hex conversion
function rgbTohex(item) {
  const rgb = item;
  const colorArray = rgb.split(",");
  let hex = [];
  colorArray.forEach(function (item, index) {
    let position;
    position = index + index;
    if (item == 0) {
      hex[position] = 0;
      hex[position + 1] = 0;
    } else {
      hex[position] = Math.floor(+item / 16);
      hex[position + 1] = +item % 16;
    }
    // console.log(hex);
  });
  // globalHex = hex;

  document.body.style.backgroundColor = `#${hexValues[hex[0]]}${
    hexValues[hex[1]]
  }${hexValues[hex[2]]}${hexValues[hex[3]]}${hexValues[hex[4]]}${
    hexValues[hex[5]]
  }`;
  return hex;
}

// hsl to rgb conversion

function hslToRgb(item) {
  const hsl = item;
  const colorArray = hsl.split(",");
  let colorArray2 = [];
  colorArray2[0] = +colorArray[0];
  colorArray2[1] = +colorArray[1] / 100;
  colorArray2[2] = +colorArray[2] / 100;

  let rgb = [];
  let r1, g1, b1;
  let r, g, b;

  let c = (1 - Math.abs(2 * colorArray2[2] - 1)) * colorArray2[1];
  let h = colorArray2[0] / 60;
  let x = c * (1 - Math.abs((h % 2) - 1));

  if (h >= 0 && h < 1) {
    r1 = c;
    g1 = x;
    b1 = 0;
  }
  if (h >= 1 && h < 2) {
    r1 = x;
    g1 = c;
    b1 = 0;
  }
  if (h >= 2 && h < 3) {
    r1 = 0;
    g1 = c;
    b1 = x;
  }
  if (h >= 3 && h < 4) {
    r1 = 0;
    g1 = x;
    b1 = c;
  }
  if (h >= 4 && h < 5) {
    r1 = x;
    g1 = 0;
    b1 = c;
  }
  if (h >= 5 && h < 6) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }
  let m = colorArray2[2] - c / 2;

  r = Math.round((r1 + m) * 255);
  g = Math.round((g1 + m) * 255);
  b = Math.round((b1 + m) * 255);
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;

  document.body.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  return rgb;
}

// rgb to hsl conversion
function rgbToHsl(item) {
  const rgb = item;
  const colorArray = rgb.split(",");
  let colorArray2 = [];
  colorArray2[0] = +colorArray[0];
  colorArray2[1] = +colorArray[1];
  colorArray2[2] = +colorArray[2];
  // console.log(colorArray2);
  let r1, g1, b1;
  r1 = colorArray2[0] / 255;
  g1 = colorArray2[1] / 255;
  b1 = colorArray2[2] / 255;

  let max, min, diff;
  max = Math.max(r1, g1, b1);
  min = Math.min(r1, g1, b1);
  diff = max - min;

  // hue calculation
  let h;
  if (diff === 0) {
    h = 0;
  } else if (max === r1) {
    h = 60 * (((g1 - b1) / diff) % 6);
  } else if (max === g1) {
    h = 60 * ((b1 - r1) / diff + 2);
  } else if (max === b1) {
    h = 60 * ((r1 - g1) / diff + 4);
  } else if (h < 0) {
    h = 360 + h;
  }

  // lightness calculation
  let l;
  l = (max + min) / 2;

  // saturation calculation
  let s;
  if (diff === 0) {
    s = 0;
  } else {
    s = diff / (1 - Math.abs(2 * l - 1));
  }
  let hsl = [];
  h = Math.round(h);
  l = l * 100;
  // l = Math.floor(l) + Math.round((l - Math.floor(l)) * 10) / 10;
  s = s * 100;
  // s = Math.floor(s) + Math.round((s - Math.floor(s)) * 10) / 10;
  l = Math.round(l);
  s = Math.round(s);
  hsl = [h, s, l];
  // console.log(hsl);
  return hsl;
}
// rgbToHsl("233,76,34");

// default values
function defaultValue() {
  hexInput.value = `#FFFFFF`;
  rgbInput.value = `255,255,255`;
  hslInput.value = `0,0,100`;
}
