// @ts-nocheck

import {
  RegisterDerivativeWithLicenseTokensResponse,
  SnapshotResponse,
  ClaimRevenueResponse,
  CollectRoyaltyTokensResponse,
  StoryClient,
  StoryConfig,
  IpMetadata,
  PIL_TYPE,
  RegisterDerivativeResponse,
  RegisterIpAndAttachPilTermsResponse,
  RegisterIpAndMakeDerivativeResponse,
  RegisterIpResponse,
  CreateIpAssetWithPilTermsResponse,
} from "@story-protocol/core-sdk";
import { http } from "viem";
import { privateKeyToAccount, Address, Account } from "viem/accounts";
import { createHash } from "crypto";
import {
  NFTContractAddress,
  NonCommercialSocialRemixingTermsId,
  RPCProviderUrl,
  account,
  CurrencyAddress,
} from "./utils/utils";
import { mintNFT } from "./utils/mintNFT";

const main = async function () {
  const privateKey: Address = `0x${process.env.WALLET_PRIVATE_KEY}`;
  const account: Account = privateKeyToAccount(privateKey);

  const config: StoryConfig = {
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chainId: "1516",
  };
  const client = StoryClient.newClient(config);

  const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
    title: "My IP Asset",
    description: "This is a test IP asset",
    watermarkImg: "https://picsum.photos/200",
    attributes: [
      {
        key: "Rarity",
        value: "Legendary",
      },
    ],
  });

  const nftMetadata = {
    name: "NFT representing ownership of IP Asset",
    description: "This NFT represents ownership of an IP Asset",
    image: "https://picsum.photos/200",
  };

  const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
  const ipHash = createHash("sha256").update(ipIpfsHash).digest("hex");

  const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
  const nftHash = createHash("sha256").update(nftIpfsHash).digest("hex");

  const ParentIPA: CreateIpAssetWithPilTermsResponse =
    await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
      nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
      pilType: PIL_TYPE.COMMERCIAL_REMIX,
      mintingFee: 1,
      currency: CurrencyAddress,
      commercialRevShare: 5,
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: { waitForTransaction: true },
    });

  console.log(
    `Root IPA created at transaction hash ${ParentIPA.txHash}, IPA ID: ${ParentIPA.ipId}, License Terms ID: ${ParentIPA.licenseTermsId}`
  );
  console.log(
    `View on the explorer: https://explorer.story.foundation/ipa/${ParentIPA.ipId}`
  );

  const AttachResponse = await client.license.attachLicenseTerms({
    ipId: ParentIPA.ipId as Address,
    licenseTemplate: "0x8BB1ADE72E21090Fc891e1d4b88AC5E57b27cB31",
    licenseTermsId: 2,
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `License Terms attached at transaction hash ${AttachResponse.txHash}`
  );

  const response3 = await client.license.mintLicenseTokens({
    licenseTermsId: 2,
    licensorIpId: ParentIPA.ipId as Address,
    receiver: account.address,
    amount: 1,
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `License Token minted at transaction hash ${response3.txHash}, License IDs: ${response3.licenseTokenIds}`
  );

  const ChildIPA: RegisterDerivativeResponse =
    await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
      nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
      derivData: {
        parentIpIds: [ParentIPA.ipId!],
        licenseTermsIds: [ParentIPA.licenseTermsId!],
      },
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: { waitForTransaction: true },
    });

  console.log(
    `Deriv IPA created at transaction hash ${ChildIPA.txHash}, IPA Deriv ID: ${ChildIPA.childIpId}`
  );
  console.log(
    `View on the explorer: https://explorer.story.foundation/ipa/${ChildIPA.childIpId}`
  );

  // const parentIP = "0x1FB81ED2c6D44F93603fdfd7C829dcbe7217e148"
  // const childIP = "0xfD4d97251d1597424a203BE8A202af9d43C7529D"
  const parentVault = client.royalty.getRoyaltyVaultAddress(
    "0xAe91A48C53AebbAd1a2112Bbf13C48052F384D40"
  );
  console.log(`Parent Vault Address: ${(await parentVault).toString()}`);

  const childVault = client.royalty.getRoyaltyVaultAddress(ChildIPA.childIpId!);
  console.log(`Child Vault Address: ${(await childVault).toString()}`);

  // 5. Collect Royalty Tokens
  //
  // Docs: https://docs.story.foundation/docs/collect-and-claim-royalty#collect-royalty-tokens
  const collectRoyaltyTokensResponse: CollectRoyaltyTokensResponse =
    await client.royalty.collectRoyaltyTokens({
      parentIpId: ParentIPA.ipId as Address,
      royaltyVaultIpId: ChildIPA.childIpId as Address,
      txOptions: { waitForTransaction: true },
    });
  console.log(
    `Collected royalty token ${collectRoyaltyTokensResponse.royaltyTokensCollected} at transaction hash ${collectRoyaltyTokensResponse.txHash}`
  );

  // 6. Claim Revenue
  //
  // Docs: https://docs.story.foundation/docs/collect-and-claim-royalty#claim-revenue
  const snapshotResponse: SnapshotResponse = await client.royalty.snapshot({
    royaltyVaultIpId: ChildIPA.childIpId as Address,
    txOptions: { waitForTransaction: true },
  });
  console.log(
    `Took a snapshot with ID ${snapshotResponse.snapshotId} at transaction hash ${snapshotResponse.txHash}`
  );
  const claimRevenueResponse: ClaimRevenueResponse =
    await client.royalty.claimRevenue({
      snapshotIds: [snapshotResponse.snapshotId as bigint],
      royaltyVaultIpId: ChildIPA.childIpId as Address,
      token: "0x91f6F05B08c16769d3c85867548615d270C42fC7",
      txOptions: { waitForTransaction: true },
    });
  console.log(
    `Claimed revenue token ${claimRevenueResponse.claimableToken} at transaction hash ${claimRevenueResponse.txHash}`
  );
};

main();
