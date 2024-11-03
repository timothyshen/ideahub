import { useState, useCallback, useMemo } from "react";
import { custom } from "viem";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { useAccount, useWalletClient } from "wagmi"; // Assuming you're using wagmi for wallet connection

export const useStoryProtocol = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const storyClient = useMemo(() => {
    if (!walletClient) return null;

    const config: StoryConfig = {
      wallet: walletClient,
      transport: custom(walletClient.transport),
      chainId: "odyssey",
    };
    const client = StoryClient.newClient(config);
    return client;
  }, [walletClient]);

  const registerIPAsset = useCallback(
    async (name: string, description: string, mediaUrl: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!address) {
          throw new Error("Wallet not connected");
        }

        const response = await storyClient?.ipAsset.register({
          name,
          description,
          mediaUrl,
          txOptions: {
            waitForTransaction: true,
          },
        });

        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to register IP asset"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [address]
  );

  return {
    registerIPAsset,
    loading,
    error,
  };
};
