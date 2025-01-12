import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

export const validateWord = async (word: string, category: string, letter: string): Promise<boolean> => {
  try {
    const prompt = `Verify if "${word}" is a valid ${category} that starts with the letter "${letter}". 
                    Respond with true or false only.`;

    const response = await bedrock.send(new InvokeModelCommand({
      modelId: "anthropic.claude-v2",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt,
        max_tokens: 1,
        temperature: 0
      })
    }));

    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.completion.trim().toLowerCase() === 'true';
  } catch (error) {
    console.error('Error validating word with Bedrock:', error);
    return false;
  }
};