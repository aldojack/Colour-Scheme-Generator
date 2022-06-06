document.addEventListener('DOMContentLoaded', () => {
    const schemeModes = ['Monochrome', 'Monochrome-Dark', 'Monochrome-Light', 'Analogic', 'Complement', 'Analogic-Complement', 'Triad', 'Quad']
    const colourPicker = document.getElementById('seed-picker')
    const shades = document.querySelectorAll(".colour-shade");
    const modeOptions = document.getElementById('mode-list');

    let currentColour = colourPicker.value;

        colourPicker.addEventListener('change', (event) => {
            
            currentColour = event.target.value;
            console.log(currentColour);
            shade1.style.backgroundColor = currentColour;
        })
    
    function loadList() {
        schemeModes.map(mode => {
            const option = document.createElement('option');
            console.log(option)
            option.textContent = mode;
            modeOptions.appendChild(option);
        })        
    }
    loadList();
})