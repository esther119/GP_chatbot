async function getGeneratedText() {
  const promptInput = document.getElementById('promptInput').value;
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
        "messages": [
          { "role": "system", "content": "Hi, I'm your financial literacy chatbot. How can I help you today? Things that I am good at:- Explaining and translating complicated financial language into simple terms. - Explaining considerations that you should take in your financial life.Things I am not good at:- Giving financial advice of what you should do." },
          { "role": "user", "content": promptInput }
        ],
        "stream": true
      })
    });
  
    // Read the response as a stream of data
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    const outputArea = document.getElementById('outputArea');
    outputArea.innerText = "";
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      console.log("lines")
      console.log(lines)
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
        .filter((line) => line !== "" && line !== "[DONE]"); // Remove empty lines and "[DONE]"
      for (const parsedLine of parsedLines) {
        const content = JSON.parse(parsedLine).choices[0].delta.content
        if (content) {
          outputArea.innerText += content;
        }
      }
    }
  } catch (error) {
    // Handle error
    console.error('Error:', error);
    const outputArea = document.getElementById('outputArea');
    outputArea.innerText = 'An error occurred while processing the response.';
  }
}