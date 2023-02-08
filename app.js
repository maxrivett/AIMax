const chatHistoryContent = document.querySelector("#chat-history-content");
const chatMessageInput = document.querySelector("#chat-message-input");
const chatMessageSubmit = document.querySelector("#chat-message-submit");

// For the "toast" voice line
var voiceLines = ['I\'m thinking...', 'I am thinking...', 'Give me a moment...', 
    'I am formulating a response...', 'Wait one moment please...'];
var len = voiceLines.length;

// Opening message
const chatbotMessageDiv = document.createElement("div");
chatbotMessageDiv.innerHTML = `<b>Max:</b> Hello! I am AI Max, feel free to ask me any questions you have
    about my (Max's) life - but mainly work experience, education, etc. Send any questions/concerns to mrivett@ucsd.edu.`;
chatHistoryContent.appendChild(chatbotMessageDiv);


chatMessageSubmit.addEventListener("click", async function () {
  // To keep the toast voice line fresh
  let randomNumber = Math.floor(Math.random() * (len-1));
  var toastElement = M.toast({html: `${voiceLines[randomNumber]}`, classes: 'rounded'});
  
  // Take the user's prompt
  const message = chatMessageInput.value;
  chatMessageInput.value = "";

  // Add the user's message to the chat history
  const userMessageDiv = document.createElement("div");
  userMessageDiv.style.backgroundColor = "#e7f0fe";
  userMessageDiv.innerHTML = `<b>You:</b> ${message}`;
  chatHistoryContent.appendChild(userMessageDiv);

  // Add three dots in the meantime
  const chatbotMessageDiv = document.createElement("div");
  chatbotMessageDiv.innerHTML = `<b>Max:</b> ...`;
  chatHistoryContent.appendChild(chatbotMessageDiv);

  // Use the OpenAI GPT-3 API to get a response from the chatbot
  const response = await getResponseFromAPI(message);

  // Add the chatbot's response to the chat history
  chatbotMessageDiv.innerHTML = `<b>Max:</b> ${response}`;
  chatHistoryContent.appendChild(chatbotMessageDiv);

  // Remove the toast when the AI has made a response
  if (toastElement) {
    toastElement.dismiss();
  }
});

// Don't know what this could be...
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
  // GPT API link
  const endpoint = `https://api.openai.com/v1/completions`;
  var answer = "foo";
  try { // Added try-catch after repeated Error 429s.
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${combo}`,
      },
      body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `I am Max Rivett. I am a sophomore at UC San Diego, studying Computer Science. I first became interested in coding in the tenth grade, thanks mainly to a great Computer Science teacher I had. I code often in my own time, and take coding classes for school. I am interested in programming things that can make real change. In terms of programming languages, I have the most experience in Java but have recently used C a lot for coursework. I love to play and watch sports. I play for the UC San Diego Ice Hockey team. I grew up in Toronto, Canada, and went to Upper Canada College for high school, where I competed on their rowing team. My main work experience has been working at the Toronto Star, where I did a co-op in Data Engineering and Data Analytics. This involved creating ETLs and DAGs, using languages like Python and SQL and software like Snowflake, Apache Airflow, and Tableau. My main project was making a program that would collect information daily on all of the Toronto Star’s social media platforms, and transform it into visually-appealing graphs and statistics for the CDO and their data team to help inform decisions. I started a mobile car detailing business (called Centro Cleaning) with a partner this past summer. We rapidly expanded within the Greater Toronto Area, and made way more business than either of us expected. I would call myself a lifelong learner. As cliche as it may sound, learning really is a passion of mine. I have also done a lot of volunteering. My resume can be found at https://www.maxrivett.com/resume.pdf. What I bring to a team is work ethic and versatility – I challenge myself to be the best I can be, and aspire to achieve feats in a variety of disciplines. I am also an opinion writer for The Guardian, UC San Diego’s newspaper. \n\nIf there is a question you cannot answer - because it is not relevant to me - respond with something along the lines of \"This is not relevant, sorry. Please ask me questions relevant to my education, work experience, or about me generally!\"\nIf there is a question you cannot answer due to the limited information I've given you about myself- but is relevant to me - respond with something along the lines of \"I’m not sure, contact mrivett@ucsd.edu to ask the real Max this.\"\nMake sure to issue a warning that you are prone to lying if you are asked any personal questions about me.\nTry to be funny but nice.\n\nHuman: ${message}\n\nAI:`,
          temperature: 0.75,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
      })
    });
    const data = await response.json();
    answer = data.choices[0].text; // Select the best response
  } catch (e) {
    console.log(e);
    answer = "I'm sorry. It seems as though there is an error on my part, \
        likely because of a server malfunction, or too many requests in such \
        a short period of time. Please try again."
  }
  return answer;

}