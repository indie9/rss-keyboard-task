let root = document.createElement('div');
root.className = 'root';
let inputText = '';
let area = document.createElement('textarea');
area.readOnly = true;
area.className = 'area';
let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(root);
let titleMessage = document.createElement('div');
titleMessage.classList.add('title_message');
titleMessage.innerHTML = 'Virtual Keyboard  direct by <a href="https://github.com/indie9" target="_blank" > Nikolay Galanov </a>';
let subMessage = document.createElement('div');
subMessage.classList.add('sub_message');
subMessage.innerHTML = '<p>Клавиатура создана в операционной системе Windows</p> <p>Для переключения языка комбинация: левыe ctrl + alt</p>';
root.append(titleMessage);
root.append(area);
root.append(keyboard);
root.append(subMessage);

let row = document.createElement('div');
let langFlag;
if (window.localStorage.getItem('langFlag')) {
  langFlag = window.localStorage.getItem('langFlag');
} else {
  langFlag = 'Ru';
}
let caseFlag = 'Low';
let ctrlDown = false;
let shiftDown = false;

const changeCase = () => {
  let keys = document.getElementsByClassName('key');
  let keysLang;
  let keysCase;
  let allKeys;
  let xz;

  for (let i = 0; i < keys.length; i += 1) {
    allKeys = keys[i].childNodes;
    for (let j = 0; j < allKeys.length; j += 1) {
      xz = allKeys[j].childNodes;
      for (let g = 0; g < xz.length; g += 1) {
        xz[g].classList.add('hidden');
      }
    }
  }
  for (let i = 0; i < keys.length; i += 1) {
    if (langFlag === 'Ru') {
      keysLang = keys[i].firstChild;
    } else {
      keysLang = keys[i].lastChild;
    }
    keysLang.classList.remove('hidden');
    if (caseFlag === 'Up') {
      keysCase = keysLang.firstChild;
    } else {
      keysCase = keysLang.lastChild;
    }
    keysCase.classList.remove('hidden');
  }
};

const keypress = (keycode) => {
  let key = document.getElementsByClassName(keycode)[0];
  key.classList.add('active');
  switch (keycode) {
    case 'Tab':
      inputText += '   ';
      area.value = inputText;
      return;
    case 'Enter':
      inputText += '\n';
      area.value = inputText;
      return;
    case 'Backspace':
      inputText = inputText.replace(/.$/, '');
      area.value = inputText;
      return;
    case 'ArrowLeft':
      inputText += '◄';
      area.value = inputText;
      return;
    case 'ArrowRight':
      inputText += '►';
      area.value = inputText;
      return;
    case 'ArrowUp':
      inputText += '▲';
      area.value = inputText;
      return;
    case 'ArrowDown':
      inputText += '▼';
      area.value = inputText;
      return;
    case 'CapsLock':
      if (caseFlag === 'Up') {
        caseFlag = 'Low';
      } else {
        caseFlag = 'Up';
      }
      changeCase();
      return;
    case 'ShiftLeft':
      if (!shiftDown) {
        if (caseFlag === 'Up') {
          caseFlag = 'Low';
        } else {
          caseFlag = 'Up';
        }
      }
      changeCase();
      shiftDown = true;
      return;
    case 'ShiftRight':
      if (!shiftDown) {
        if (caseFlag === 'Up') {
          caseFlag = 'Low';
        } else {
          caseFlag = 'Up';
        }
      }
      changeCase();
      shiftDown = true;
      return;
    case 'ControlLeft':
      ctrlDown = true;
      return;
    case 'ControlRight':
      ctrlDown = true;
      return;
    case 'MetaLeft':
      return;
    case 'AltLeft':
      if (ctrlDown) {
        if (langFlag === 'Eng') {
          langFlag = 'Ru';
          window.localStorage.setItem('langFlag', 'Ru');
        } else {
          langFlag = 'Eng';
          window.localStorage.setItem('langFlag', 'Eng');
        }
        changeCase();
      }
      return;
    case 'AltRight':
      return;
    case 'Delete':
      return;
    default:
      break;
  }
  let keyInner = document.getElementsByClassName(`${keycode}${langFlag}${caseFlag}`)[0];
  if (!keyInner) {
    return;
  }
  inputText += keyInner.innerHTML;
  area.value = inputText;
};

const keyUnpress = (keycode) => {
  let key = document.getElementsByClassName(keycode)[0];
  
  if (keycode === 'ControlLeft') {
    ctrlDown = false;
  }
  if (keycode === 'ControlRight') {
    ctrlDown = false;
  }
  if (keycode === 'ShiftLeft') {
    shiftDown = false;
    if (caseFlag === 'Up') {
      caseFlag = 'Low';
    } else {
      caseFlag = 'Up';
    }
    changeCase();
  }
  if (keycode === 'ShiftRight') {
    shiftDown = false;
    if (caseFlag === 'Up') {
      caseFlag = 'Low';
    } else {
      caseFlag = 'Up';
    }
    changeCase();
  }
  if (!key) {
    return;
  }
  key.classList.remove('active');
};

let rowInnerClass = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
let rowInner = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
let rowInnerUP = ['Ё', '!', `'`, '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'];
let rowInnerEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
let rowInnerUPEng = ['~', '!', `'`, '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'];

const containRow = () =>{
  for (let i = 0; i < rowInnerClass.length; i += 1) {
    let key = document.createElement('div');
    let keyRu = document.createElement('div');
    let keyRuUp = document.createElement('div');
    let keyRuLow = document.createElement('div');
    let keyEng = document.createElement('div');
    let keyEngUp = document.createElement('div');
    let keyEngLow = document.createElement('div');
    key.classList.add('key');
    key.addEventListener('mousedown', () => {
      key.classList.add('active');
      keypress(key.classList[1]);
    });
    key.addEventListener('mouseup', () => {
      key.classList.remove('active');
      keyUnpress(key.classList[1]);
    });
    keyRu.classList.add('Ru');
    keyRuLow.classList.add(`${rowInnerClass[i]}RuLow`);
    keyRuUp.classList.add(`${rowInnerClass[i]}RuUp`);
    keyEng.classList.add('Eng');
    keyEngLow.classList.add(`${rowInnerClass[i]}EngLow`);
    keyEngUp.classList.add(`${rowInnerClass[i]}EngUp`);
    key.classList.add(rowInnerClass[i]);
    keyRuLow.innerHTML = rowInner[i];
    keyRuUp.innerHTML = rowInnerUP[i];
    keyEngLow.innerHTML = rowInnerEng[i];
    keyEngUp.innerHTML = rowInnerUPEng[i];
    keyRuUp.classList.add('hidden');
    keyEngUp.classList.add('hidden');
    if (langFlag === 'Ru') {
      keyEngLow.classList.add('hidden');
    } else {
      keyRuLow.classList.add('hidden');
    }
    row.appendChild(key);
    key.appendChild(keyRu);
    keyRu.appendChild(keyRuUp);
    keyRu.appendChild(keyRuLow);
    key.appendChild(keyEng);
    keyEng.appendChild(keyEngUp);
    keyEng.appendChild(keyEngLow);
  }
  row.className = 'row';
  keyboard.appendChild(row);
};

containRow();

row = document.createElement('div');
rowInnerClass = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'];
rowInner = ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del'];
rowInnerUP = ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Del'];
rowInnerEng = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del'];
rowInnerUPEng = ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Del'];

containRow();

row = document.createElement('div');
rowInnerClass = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'];
rowInner = ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'];
rowInnerUP = ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '\\', 'Enter'];
rowInnerEng = ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, '\\', 'Enter'];
rowInnerUPEng = ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', `"`, '\\', 'Enter'];

containRow();

row = document.createElement('div');
rowInnerClass = ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
rowInner = ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#129145;', 'Shift'];
rowInnerUP = ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&#129145;', 'Shift'];
rowInnerEng = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#129145;', 'Shift'];
rowInnerUPEng = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&#129145;', 'Shift'];

containRow();

row = document.createElement('div');
rowInnerClass = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
rowInner = ['Ctrl', 'WIN', 'Alt', ' ', 'Alt', '&#129152;', '&#129155;', '&#129154;', 'Ctrl'];
rowInnerUP = ['Ctrl', 'WIN', 'Alt', ' ', 'Alt', '&#129152;', '&#129155;', '&#129154;', 'Ctrl'];
rowInnerEng = ['Ctrl', 'WIN', 'Alt', ' ', 'Alt', '&#129152;', '&#129155;', '&#129154;', 'Ctrl'];
rowInnerUPEng = ['Ctrl', 'WIN', 'Alt', ' ', 'Alt', '&#129152;', '&#129155;', '&#129154;', 'Ctrl'];

containRow();

document.addEventListener('keydown', (event)=>{
  keypress(event.code);
});

document.addEventListener('keyup', (event)=>{
  keyUnpress(event.code);
});
