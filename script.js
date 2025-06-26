// Gun initialization with public relay server
const gun = Gun('https://gun-manhattan.herokuapp.com/gun');

// Reference to the shared toggle state
const toggleRef = gun.get('toggleSync');

const toggle = document.getElementById('toggle');
const dot = document.getElementById('dot');

// When toggle changes (user interaction), update Gun
toggle.addEventListener('change', () => {
  const newState = toggle.checked ? 'on' : 'off';
  toggleRef.put({ state: newState });
});

// Listen for state changes from Gun (realtime sync)
toggleRef.on(data => {
  if (!data || !data.state) return;

  const isOn = data.state === 'on';
  dot.style.backgroundColor = isOn ? 'white' : 'black';
  toggle.checked = isOn;
});
