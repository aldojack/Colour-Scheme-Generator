document.addEventListener('DOMContentLoaded', () => {
    const schemeModes = ['Monochrome', 'Monochrome-Dark', 'Monochrome-Light', 'Analogic', 'Complement', 'Analogic-Complement', 'Triad', 'Quad']
    const colourPicker = document.getElementById('seed-picker')
    const modeOptions = document.getElementById('mode-list');
    
    const baseUrl = "https://www.thecolorapi.com/scheme";
    const shadesCount = 5;
    let currentColour = colourPicker.value;
    let currentMode = '';
    let shades = '';
    const year = document.querySelector('span');
    year.textContent = new Date().getFullYear();
    
    colourPicker.addEventListener('change', (event) => {
        
        currentColour = event.target.value;
        console.log("Seed picker: ",currentColour, currentMode)
        getColours(currentColour.substring(1), currentMode);
    })

    modeOptions.addEventListener('change', (event) => {
        currentMode = event.target.value;
        console.log("Mode: ", currentColour, currentMode)
        getColours(currentColour.substring(1), currentMode);
    })

    function renderPage() {
        loadList();
        loadDivs();
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

    function loadDivs() {
        const shadeContainer = document.getElementById('shades-container');

        for (let i = 0; i < shadesCount; i++) {
            const div = document.createElement('div');
            div.classList.add('colour-shade');
            div.addEventListener('click', event => {
                const value = div.textContent;
                navigator.clipboard.writeText(value);
                alert(`${value} copied to clipboard`)
            })
            shadeContainer.appendChild(div);
        }
        shades = document.querySelectorAll(".colour-shade")
    }

    function loadShades(shadesArr) {
        shades.forEach((shade, index) => {
            shade.style.backgroundColor = shadesArr[index].hex.value;
            shade.textContent = shadesArr[index].hex.value;
        })
    }

    async function getColours(hexValue, mode) {
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}&count=${shadesCount}`)
        const { colors } = await response.json()
        console.log(colors)
        loadShades(colors);
    }

    renderPage();
    
})