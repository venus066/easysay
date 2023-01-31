import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIATION_ID,
});

const OpenaiService = new OpenAIApi(configuration);

let chatData = ''

// Prompt description
function getPromptDescription(id) {

    let desc = ''
    desc = 'Rephrase with AI Friend where your AI Friend respond in cheerful, Valley girl, American English.\n\n'
    /*switch(id) {
        case 'JPN1':
            desc = 'Rephrase with AI Friend where your AI Friend respond in cheerful, young lady, Japanese.\n\n'
            break;
        case 'ENG2':
            desc = 'Rephrase with AI Friend where your AI Friend respond in Shakespearean, old English.\n\n'
            break;
        case 'US3':
            desc = 'Rephrase with AI Friend where your AI Friend respond in cheerful, Valley girl, American English.\n\n'
            break;
        case 'FIL4':
            desc = 'Rephrase with AI Friend where your AI Friend respond in cheerful, Filipino.\n\n'
            break;
        default:
    }*/

    return desc
}

export const getCompletion = async(message) => {
    let prompt = getPromptDescription()

    chatData += '\n'
    chatData += `You: ${message}`

    prompt += chatData

    // check token count
    const tokenPrompt = parseInt(prompt.length / 4) // we are making simple assumption that 4 chars = 1 token
    if (tokenPrompt > 1000) {
        /*
        The actual maximum number of tokens is around 2048 (new models support 4096).
        But I do not plan to hit it but put the ceiling a bit much lower then remove
        old messages after it is reached to continue chatting.
        */
        console.log("maximum!", tokenPrompt)

        // remove several lines from stored data
        let tmpData = chatData.split("\n").filter((d, i) => i > 20)
        chatData = tmpData.join("\n")

    }

    let reply = ''
    console.log('prompt:', prompt);
    // generate message
    try {
        const completion = await OpenaiService.createCompletion({
            model: "text-davinci-003",
            // model: "text-curie-001",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop:["You:"]
        })

        reply = completion.data.choices[0].text.split('AI Friend:')[1].trim()

    } catch(error) {
        console.log(error)
    }

    if (reply) {
        chatData += `\n`
        chatData += `AI Friend: ${reply}`
    }

    return {
        text: reply,
    }
}
