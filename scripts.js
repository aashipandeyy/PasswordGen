document.addEventListener("DOMContentLoaded", () => {
const copyBtn=document.querySelector('#copyBtn');
const copyMsg=document.querySelector('#copyMsg');
const passwordDisplay=document.querySelector('#passwordDisplay');
const lengthDisplay=document.querySelector('#numberLength');
const slider=document.querySelector('#slider');
const lc=document.querySelector('#lc');
const uc=document.querySelector('#uc');
const num=document.querySelector('#num');
const sym=document.querySelector('#sym');
const strength=document.querySelector('#strength');
const generate=document.querySelector('#generate');
const allCheckbox=document.querySelectorAll('input[type=checkbox]');
const symbols='~!@#$%^&*()_+{}[]\;,./|:"<>?';

let password="";
let initPass="";
let passlen=10;
let checkCount=0;
handleSlider();
setStrength('#ccc');

//sets password length
//reflect password length on the UI
function handleSlider(){
    slider.value=passlen;
    lengthDisplay.innerText=passlen;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((passlen-min)*100/(max-min)) + "% 100%"
}
slider.addEventListener('input',(e)=>{
    passlen=e.target.value;
    handleSlider();
})

function setStrength(color){
    strength.style.backgroundColor=color;
    strength.style.boxShadow=`0 0 10px ${color}`;
}


function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
    //Math.random returns values between 0 and 1. May return decimals too
    //.floor for handling decimals and Math.random()*(max-min) to lie between 0 and max-min and add min to lie between min to max-min
}
function generateRandomNumber(){
    return getRandomInt(0,9);
}
function generateRandomLC(){
    return String.fromCharCode(getRandomInt(97,123));
}
function generateRandomUC(){
    return String.fromCharCode(getRandomInt(65,91));
}
function generateRandomSymbol(){
    const rnd=getRandomInt(0,symbols.length);
    return symbols[rnd];
}
function calcStrength(){
    let hasUC=false;
    let hasLC=false;
    let hasNum=false;
    let hasSym=false;
    if(uc.checked) hasUC=true;
    if(lc.checked) hasLC=true;
    if(num.checked) hasNum=true;
    if(sym.checked) hasSym=true;
    if(hasUC && hasLC && (hasNum || hasSym) && passlen>=8) setStrength("#0f0");
    else if((hasLC || hasUC) && (hasNum || hasSym) && passlen>=6) setStrength("#ff0");
    else setStrength("#f00");
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.remove("opacity-0", "scale-0");
    copyMsg.classList.add("opacity-100", "scale-100");
    setTimeout(() => {
    copyMsg.classList.remove("opacity-100", "scale-100");
    copyMsg.classList.add("opacity-0", "scale-0");
    }, 2000);
}
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value) copyContent();
})

function handleCheckbox(){
    checkCount=0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked) checkCount++;
    });
    if(passlen<checkCount) {
        passlen=checkCount;
        handleSlider();
    }
}
//any checkbox gets changed, the counter starts all over again to count the number of boxes checked
allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbox);
})

generate.addEventListener('click',()=>{
    if(checkCount<=0) return;
    if(passlen<checkCount){
        passlen=checkCount;
        handleSlider();
    }
    //remove old password
    password="";
    let arr=[];
    if(uc.checked) arr.push(generateRandomUC);
    if(lc.checked) arr.push(generateRandomLC);
    if(num.checked) arr.push(generateRandomNumber);
    if(sym.checked) arr.push(generateRandomSymbol);
    // if(uc.checked) password+=generateRandomUC();
    // if(lc.checked) password+=generateRandomLC();
    // if(num.checked) password+=generateRandomNumber();
    // if(sym.checked) password+=generateRandomSymbol();

    for(let i=0;i<arr.length;i++) password+=arr[i]();
    for(let i=0;i<passlen-arr.length;i++) password+=arr[getRandomInt(0,arr.length)]();
    password=shuffle(Array.from(password));
    passwordDisplay.value=password;
    calcStrength();
})

function shuffle(shufflePassword){
    //Fisher Yates Method
    //Applied on arrays
    for(let i=shufflePassword.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=shufflePassword[i];
        shufflePassword[i]=shufflePassword[j];
        shufflePassword[j]=temp;
    }
    let str="";
    shufflePassword.forEach((el)=>str+=el);
    return str;
}
})