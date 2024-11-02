import { useState, useCallback } from "react";
import { storyClient } from "@/utils/storySDK";
import { useAccount } from "wagmi"; // Assuming you're using wagmi for wallet connection

export const useStoryProtocol = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const registerIPAsset = useCallback(
    async (name: string, description: string, mediaUrl: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!address) {
          throw new Error("Wallet not connected");
        }

        const response = await storyClient.ipAsset.register({
          name,
          description,
          mediaUrl,
          txOptions: {
            from: address,
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
