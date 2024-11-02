import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';

const config: StoryConfig = {
  chainId: 80001, // Mumbai testnet
  // Add your API key if you have one
  // apiKey: process.env.STORY_PROTOCOL_API_KEY,
};

export const storyClient = new StoryClient(config); 