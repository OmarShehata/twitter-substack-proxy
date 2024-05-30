window.onload = function() {
  const outputElement = document.querySelector("#output")
  const inputElement = document.querySelector("#substack_url")
  
  inputElement.oninput = async (e) => {
    if (inputElement.value == '') {
      document.querySelector("#you-can-now-text").style.display = 'block'
      outputElement.innerHTML = ''
      return
    }

    try {
      // generate the url
      outputElement.innerHTML = 'loading...'
      const url = encodeURIComponent(inputElement.value)
      console.log("Generating url for", inputElement.value)
      const response = await fetch(`/generate-url/${url}`);
      const data = await response.json();
      console.log("response: ", data)
      if (data.done == false) {
        throw Error(data.error)
      }

      // display the result 
      document.querySelector("#you-can-now-text").style.display = 'block'
      outputElement.innerHTML = `${window.location.origin}/articles/${data.hash}.html`
    } catch (e) {
      console.error(e)
      outputElement.innerHTML = 'Error: ' + String(e)
    }
    
  }

}

