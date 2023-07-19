async function getGeneratedText() {
  const promptInput = document.getElementById('promptInput').value;
  console.log("promptInput")
  console.log(promptInput)
  const apiKey = ''; // Replace with your actual OpenAI API key

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": "Hi, I'm your financial literacy chatbot. How can I help you today? Things that I am good at:- Explaining and translating complicated financial language into simple terms.        - Explaining considerations that you should take in your financial life.Things I am not good at:- Giving financial advice of what you should do."}, {"role": "user", "content": promptInput}],
        "stream": true,
      })
    });
    
    console.log("response")
    console.log(response)

    // Handle the response
    console.log("error")
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const generatedText = data.choices[0].message.content;
      console.log(generatedText)
      const outputArea = document.getElementById('outputArea');
      outputArea.innerText = generatedText;
    } else {
      // Handle error response
      console.error('Error:', response.statusText);
      const outputArea = document.getElementById('outputArea');
      outputArea.innerText = 'Error occurred while generating text.';
    }
  } catch (error) {
    // Handle network error
    console.error('Network error:', error);
    const outputArea = document.getElementById('outputArea');
    outputArea.innerText = 'Network error occurred.';
  }
}