window.onload = function() {
  const outputElement = document.querySelector("#output")
  const inputElement = document.querySelector("#substack_url")
  const copyBtn = document.querySelector("#copy-btn")
  let timeoutid = null
  const DELAY_TIME_MS = 400
  
  inputElement.oninput = async (e) => {
    if (inputElement.value == '') {
      document.querySelector("#you-can-now-text").style.display = 'block'
      outputElement.innerHTML = ''
      copyBtn.style.display = 'none'
      return
    }

    // automatically submit 400ms after user starts typing
    // to avoid making requests one very key stroke
    // clear last pending request
    outputElement.innerHTML = 'waiting (for you to finish typing)...'

    if (timeoutid) {
      clearTimeout(timeoutid)
      timeoutid = null
    }

    timeoutid = setTimeout(async () => {
      outputElement.innerHTML = 'generating url...'

      try {
        // generate the url
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
        copyBtn.style.display = 'block'
        outputElement.innerHTML = `${window.location.origin}/articles/${data.hash}.html`
      } catch (e) {
        console.error(e)
        outputElement.innerHTML = 'Error: ' + String(e)
      }
    }, DELAY_TIME_MS)
  }

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(outputElement.innerHTML)
    copyBtn.innerHTML = '✅ Copied'

    if (window.timeoutid) {
      clearTimeout(window.timeoutid)
      delete window.timeoutid
    }
    window.timeoutid = setTimeout(() => {
      copyBtn.innerHTML = 'Copy'
    }, 1000)
  }

}


async function getSubstackMetaTags(url) {
  try {
    const articleRequest = await fetch(url, {mode: 'no-cors'});
    console.log(articleRequest)
    const htmlPage = await articleRequest.text();
  
    console.log(htmlPage)
  } catch (e) {
    console.log(e)
  }
 
}
