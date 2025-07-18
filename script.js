const phoneticMap = {
  A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo',
  F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett',
  K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar',
  P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango',
  U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
  0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four',
  5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine',
  ".": 'Period', ",": "Comma", "?": "Question Mark", "!": "Exclamation Point",
  "@": "At Symbol", "#": "Hash", "&": "Ampersand", "-": "Dash",
  "/": "Slash", "=": "Equals", "+": "Plus", "*": "Asterisk"
};

const listContainer = document.getElementById('phonetic-list');
for (let [letter, code] of Object.entries(phoneticMap)) {
  const div = document.createElement('div');
  div.className = 'phonetic-item';
  div.textContent = `${letter} = ${code}`;
  listContainer.appendChild(div);
}

function convertText() {
  const inputField = document.getElementById('textInput');
  const input = inputField.value.trim();
  const resultDiv = document.getElementById('result');
  const simpleMode = document.getElementById('simpleToggle').checked;

  if (!input) {
    resultDiv.classList.remove('show');
    resultDiv.textContent = '';
    return;
  }

  const converted = input.toUpperCase().split('').map(char => {
    if (phoneticMap[char]) {
      return simpleMode ? phoneticMap[char] : `${char} (${phoneticMap[char]})`;
    } else if (char === ' ') {
      return '/';
    } else {
      return simpleMode ? char : `${char}`;
    }
  }).join(' ');

  resultDiv.textContent = converted;
  resultDiv.classList.add('show');
}

document.getElementById('textInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    convertText();
  }
});

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('textInput').value = text;
    convertText();
  } catch (err) {
    alert("Failed to read clipboard. Make sure you have permission.");
  }
}

function clearText() {
  document.getElementById('textInput').value = '';
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = '';
  resultDiv.classList.remove('show');
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const savedSimpleMode = localStorage.getItem('simpleMode');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  if (savedSimpleMode === 'true') {
    document.getElementById('simpleToggle').checked = true;
  }

  document.getElementById('simpleToggle').addEventListener('change', () => {
    const isChecked = document.getElementById('simpleToggle').checked;
    localStorage.setItem('simpleMode', isChecked.toString());
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
