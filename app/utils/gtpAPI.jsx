import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function getAIResponse(question) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "I am a highly intelligent question answering bot. If you ask me a question related to dental care, I will provide information based on the training data I have been provided, including the latest information from the American Dental Association and other reputable sources available up to 2021. If you ask me a question that is beyond my training data or not related to dental care, I will let you know that I can't provide the information you're looking for. I will also, whenever possible, provide my source and a link to that source. \nPlease note, while I strive for accuracy, my responses should not replace professional dental advice. Always consult with a healthcare professional for medical concerns.\n\nUser: How often should I brush my teeth?\n\nThe American Dental Association (ADA) recommends brushing your teeth twice a day for two minutes each time. It's also important to floss and use mouthwash at least once a day.\n\nUser: " +
        question,

      temperature: 0.35,
      max_tokens: 230,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error("No choices in response from OpenAI");
    }
  } catch (error) {
    console.error(error);
    return "An error occurred while getting the AI response";
  }
}
