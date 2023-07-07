function letsago(){
  let key = document.getElementById("APIKEY").value;
  if (key == "") {
    alert("cohere api key required");
    alert("instructions to get one are on my github");
    alert("k cool");
    return
  }

  document.getElementById("intro").hidden = true;
  document.getElementById("main").hidden = false;
}

function generate(prompt, tokens=400, success, error) {
  let key = document.getElementById("APIKEY").value;
  $.ajax({
    url: 'https://api.cohere.ai/v1/generate',
    type: 'POST',
    headers: {
      "Authorization": `BEARER ${key}`,
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "model": "command",
      "prompt": prompt,
      "max_tokens": tokens,
      "temperature": 0.9,
      "k": 0,
      "stop_sequences": [],
      "return_likelihoods": "NONE"
    }),
    success: success,
    error: error
  }); 
}

function genPrompt() {
  document.getElementById("text").innerText = "Loading...";
  document.getElementById('ficType').readOnly = true;
  document.getElementById('relType').readOnly = true;

  let prompt = `Generate a short but detailed ${document.getElementById("ficType").value} fanfic about ${document.getElementById("relType").value}, and describe the situation they are in.`;
  generate(prompt, 1800, function(x){
    x = x['generations'][0]['text'];
    document.getElementById("text").innerText = x;
  }, function(){

    document.getElementById("text").innerText = "An error occurred!";

  });

  document.getElementById('ficType').readOnly = false;
  document.getElementById('relType').readOnly = false;
}
