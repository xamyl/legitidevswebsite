const DEMO_INPUT = document.getElementById("demo-input")
const DEMO_BUTTON = document.getElementById("demo-fetch")
const DEMO_RESULT = document.getElementById("demo-result")

DEMO_BUTTON.addEventListener('click', async () => {
    const inputValue = DEMO_INPUT.value
    
    try {
        const response = await fetch(`https://api.omrih.me${inputValue}`)
        const json = await response.json();
        DEMO_RESULT.textContent = json
    } catch (err) {
        DEMO_RESULT.textContent = `There was an error trying while trying to call 'https://api.omrih.me${inputValue}': \n  ${err}`
    }
})