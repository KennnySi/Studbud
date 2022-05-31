document.getElementById('search').addEventListener('click', () => {
    searchDictionary()
})

// send a request to dictionaryapi to check the word
function searchDictionary() {
    let key = document.getElementById('key').value
    // if there no word in the input
    if (key == '') {
        alert('Please enter a key')
        return
    }
    // send ajax request
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + key)
    xhr.onload = function() {
        if (this.status == 200) {
            let data = JSON.parse(this.response)
            let html = ''
            // if the word is found in the dictionary
            //  print the word and its meaning
            data.forEach(function(item) {
                html += `
                <div class="flex justify-between align-center">
                    <div>
                        <h2>${item.word}</h2>
                       ${item.meanings.map((meaning) => {
                    return `<p>
                            <strong>${meaning.partOfSpeech}</strong>
                            <hr/>
                            <strong>Meaning</strong>
                        ${meaning.definitions.map((m) => `<li>${m.definition}</li>`).join('')}
                        </p>`
                }).join('')}
                    </div>
                </div>
                `
            })
            document.getElementById('dictionary').innerHTML = html
        }
        // if the word is not found
        else {
            let data = JSON.parse(this.response)
            alert(data.message)
        }
    }
    xhr.send()
}