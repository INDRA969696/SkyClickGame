function wrapscore(angka) {
  if (angka >= 1000000000000000) {
    return (angka >= 1000000000000000).toFixed(1) + 'Qd';
  } else if (angka >= 1000000000000) {
    return (angka / 1000000000000).toFixed(1) + 'T';
  } else if (angka >= 1000000000) {
    return (angka / 1000000000).toFixed(1) + 'B';
  } else if (angka >= 1000000) {
    return (angka / 1000000).toFixed(1) + 'M';
  }else if (angka >= 1000) {
    return (angka / 1000).toFixed(3) + 'K';
  }
  return angka;
}
// data angka
const realscore = document.querySelector('#realscore');
const perclick = document.querySelector('#perclick_count');
const price_slot_1 = document.querySelector('#slot1');
// data button
const BtnClick = document.querySelector('#clickvar');
const BtnReset = document.querySelector('#reset_btn');
const BtnMarket = document.querySelector('#button_market');
//slot buying item button 
const notif = document.querySelector('#notif')
const slot1 = document.querySelector('#slot1_buy')
// img settings //
// button click img
const button_click = document.querySelector('#button_click');
const button_un_click = document.querySelector('#button_un_click');
// market button & menu
const button_market = document.querySelector('#market_button_png');
const button_market_click = document.querySelector('#market_button_click_png')
const menu_market = document.querySelector('#market_ui_menu')

let score = Number(localStorage.getItem('scoresave')) || 0;
let click = Number(localStorage.getItem('clicksave')) || 1;

let slot_1 = Number(localStorage.getItem('priceslot1')) || 100;

realscore.innerText = wrapscore(score);
perclick.innerText = wrapscore(click);
price_slot_1.innerText = wrapscore(slot_1);

BtnReset.addEventListener('click', () => {
  localStorage.removeItem('scoresave')
  localStorage.removeItem('clicksave')
  localStorage.removeItem('priceslot1')
  score = 0;
  click = 1;
  slot_1 = 100;
  realscore.innerText = wrapscore(score);
  perclick.innerText = wrapscore(click);
  price_slot_1.innerText = wrapscore(slot_1)
});
BtnClick.addEventListener('click', () => {
  score += click;
  realscore.innerText = wrapscore(score);
  localStorage.setItem('scoresave', score);
  if (button_click && button_un_click) {
    button_click.style.display ='block'
    button_un_click.style.display = 'none'
    setTimeout( () => {
      button_click.style.display ='none'
      button_un_click.style.display = 'block'
    }, 80);
  }
});
BtnMarket.addEventListener('click', () => {
  // BUKA Market Menu
  if (menu_market.style.display === 'block') {
    button_market.style.display = 'block';
    button_market_click.style.display = 'none';
    menu_market.style.display = 'none';
    menu_market.style.pointerEvents = 'none';
  } 
  // TUTUP Market Menu
  else {
    button_market.style.display = 'none';
    button_market_click.style.display = 'block';
    menu_market.style.display = 'block';
    menu_market.style.pointerEvents = 'auto';
  }
});
slot1.addEventListener('click', () => {
  if (score >= slot_1) {
    score -= slot_1;
    click += 1;
    slot_1 = Math.floor(slot_1 * 1.17);
    realscore.innerText = wrapscore(score);
    perclick.innerText = wrapscore(click);
    price_slot_1.innerText = wrapscore(slot_1);
    localStorage.setItem('scoresave', score);
    localStorage.setItem('clicksave', click);
    localStorage.setItem('priceslot1', slot_1);
  }
  else {
    notif.style.display = 'block'
    setTimeout( () => {
      notif.style.display = 'none'
    }, 800);
  }
});
