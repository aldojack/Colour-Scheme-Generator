document.addEventListener('DOMContentLoaded', () => {
    const schemeModes = ['Monochrome', 'Monochrome-Dark', 'Monochrome-Light', 'Analogic', 'Complement', 'Analogic-Complement', 'Triad', 'Quad']
    const colourPicker = document.getElementById('seed-picker')
    const shades = document.querySelectorAll(".colour-shade");
    const modeOptions = document.getElementById('mode-list');
    const baseUrl = "https://www.thecolorapi.com/scheme";

    let currentColour = colourPicker.value;
    let currentMode = '';
    
    colourPicker.addEventListener('change', (event) => {
        
        currentColour = event.target.value;
        shade1.style.backgroundColor = currentColour;
        getColours(currentColour.substring(1), currentMode);
    })

    modeOptions.addEventListener('change', (event) => {
        currentMode = event.target.value;
        console.log(currentColour)
        getColours(currentColour,currentMode)
    })

    function renderPage() {
        loadList();
        getColours(currentColour.substring(1), currentMode);
    }
    
    function loadList() {
        schemeModes.forEach(mode => {
            const option = document.createElement('option');
            option.textContent = mode;
            option.value = mode.toLowerCase();
            modeOptions.appendChild(option);
        }) 
        currentMode = modeOptions.options[modeOptions.selectedIndex].value;
    }

    function loadShades(shadesArr) {
        shades.forEach((shade, index) => {
            shade.style.backgroundColor = shadesArr[index].hex.value;
        })
    }

    async function getColours(hexValue, mode) {
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}&count=${shades.length}`)
        const { colors } = await response.json()
        console.log(colors)
        loadShades(colors);
    }

    renderPage();
    
})