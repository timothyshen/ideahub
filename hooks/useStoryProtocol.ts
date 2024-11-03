import { useState, useCallback, useMemo } from "react";
import { custom, zeroAddress } from "viem";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { useAccount, useWalletClient } from "wagmi";

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
    return StoryClient.newClient(config);
  }, [walletClient]);

  const createCollection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!storyClient || !address) {
        throw new Error("Client not initialized or wallet not connected");
      }

      // Check if the caller is the owner
      const ownerAddress = process.env.NEXT_PUBLIC_OWNER_WALLET_KEY;
      if (address.toLowerCase() !== ownerAddress?.toLowerCase()) {
        throw new Error("Only owner can create collection");
      }

      const newCollection = await storyClient.nftClient.createNFTCollection({
        name: "Ideas Collection",
        symbol: "IDEAS",
        isPublicMinting: true,
        mintOpen: true,
        mintFeeRecipient: zeroAddress,
        contractURI: "",
        txOptions: { waitForTransaction: true },
      });

      return newCollection;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create collection"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storyClient, address]);

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
    createCollection,
    registerIPAsset,
    loading,
    error,
  };
};
