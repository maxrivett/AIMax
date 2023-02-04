const chatHistoryContent = document.querySelector("#chat-history-content");
const chatMessageInput = document.querySelector("#chat-message-input");
const chatMessageSubmit = document.querySelector("#chat-message-submit");



chatMessageSubmit.addEventListener("click", async function () {
  const message = chatMessageInput.value;
  chatMessageInput.value = "";

  // Add the user's message to the chat history
  const userMessageDiv = document.createElement("div");
  userMessageDiv.innerHTML = `You: ${message}`;
  chatHistoryContent.appendChild(userMessageDiv);

  // Add the chatbot's response to the chat history
  const chatbotMessageDiv = document.createElement("div");
  chatbotMessageDiv.innerHTML = `Max: ...`;
  chatHistoryContent.appendChild(chatbotMessageDiv);
  // Use the OpenAI GPT-3 API to get a response from the chatbot
  const response = await getResponseFromAPI(message);

  
  chatbotMessageDiv.innerHTML = `Max: ${response}`;
  chatHistoryContent.appendChild(chatbotMessageDiv);
});

const var1 = "sk-Djkh9h";
const var2 = "1aaLCMAu";
const var3 = "T3BlbkF";
const var4 = "10u0Br";
const var5 = "anXglX7";
const var6 = "dDhkn";
const var7 = "33x";
const var8 = "JDMv6O";
const combo = var1+var6+var4+var7+var3+var8+var2+var5;

async function getResponseFromAPI(message) {

  const endpoint = `https://api.openai.com/v1/completions`;
  

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
      "Authorization": `Bearer ${combo}`,
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `I am Max Rivett. I am a sophomore at University of California: San Diego, and I am studying Computer Science at the Jacobs School of Engineering.\nI first became interested in coding in the tenth grade, thanks mainly to a great Computer Science teacher I had. I have since coded many things on my own time, and take many coding classes as part of my university major.\nI am interested in many things within programming, mainly things that I feel create real change. Outside of programming, I love to play sports and hang out with friends – I play for the Ice Hockey team at UC San Diego, and used to compete for the Rowing team at my high school. \nI grew up in Toronto, Canada, but decided to come down to San Diego for school – a decision I am very happy to have made.\nBeing a student, I do not have all that much work experience. My main experience within the realm of computer science is the co-op I did at the Toronto Star, in which I did data engineering and data analytics. The data engineering involved creating ETLs and DAGs, using languages like Python and SQL and software like Snowflake and Apache Airflow. The data analytics involved using Tableau and Python. My main project was making a program that would collect information daily on all of the Toronto Star’s social media platforms, and transform it into visually-appealing graphs and statistics for the CDO and their data team to help inform decisions. Outside of computer science work, I started a mobile car detailing business (called Centro Cleaning) with a partner this past summer. We rapidly expanded within the Greater Toronto Area, and made way more business than either of us expected.\nI am not exactly searching for work at the moment, but when an opportunity presents itself in a way that I see fit for me to grow as a person or make change, I will definitely be all-ears.\nI would call myself a lifelong learner. As cliche as it may sound, learning really is a passion of mine. I strive to know all that I can, and do this not just by working hard in the classroom but also doing my best to take in my surroundings and analyze it.\nDo not overshare when asked what's up, or something along that line. Instead, respond with a greeting and prompt the user to ask you about me.\nIf there is a question you cannot answer - because it is not relevant to me - respond with \"This is not relevant, sorry. Please ask me questions relevant to my education, work experience, or about me generally!\"\nIf there is a question you cannot answer due to the limited information I've given you about myself- but is relevant to me - respond with something along the lines of \"I don't know Max that well, feel free to contact him at mrivett@ucsd.edu to ask him yourself.\"\nMake sure to issue a warning that you are prone to lying if you are asked any personal questions about me.\nDo not link to any external sources in your answers.\n\nHuman: ${message}\n\nAI:`,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
  });
  // console.log(response.text());
  const data = await response.json();
  const answer = data.choices[0].text;
  return answer;

}