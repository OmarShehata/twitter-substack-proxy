function loadFromLocalStorage(urlParams, inputElement) {
    if (urlParams.get('url') == null) {
    if (localStorage.getItem('url')) {
      inputElement.value = localStorage.getItem('url')
    }
  }
}

function updateOutput(inputElement, outputElement) {
    const newUrl = inputElement.value
    const encodedUrl = encodeURIComponent(inputElement.value)
    localStorage.setItem('url', newUrl)
    
    
    outputElement.innerHTML = `${window.location.origin}/url/${encodedUrl}`
}

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const outputElement = document.querySelector("#output")
  const inputElement = document.querySelector("#substack_url")
  
  loadFromLocalStorage(urlParams, inputElement)
  
  inputElement.oninput = (e) => {
    updateOutput(inputElement, outputElement)
  }
  updateOutput(inputElement, outputElement)
}

