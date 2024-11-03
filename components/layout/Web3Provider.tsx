import {
    DynamicContextProvider,
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
    createConfig,
    WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { odyssey } from '@story-protocol/core-sdk';

const config = createConfig({
    chains: [odyssey],
    multiInjectedProviderDiscovery: false,
    transports: {
        [odyssey.id]: http(process.env.RPC_PROVIDER_URL),
    },
});

const queryClient = new QueryClient();

export default function App() {
    return (
        <DynamicContextProvider
            settings={{
                // Find your environment id at https://app.dynamic.xyz/dashboard/developer
                environmentId: "REPLACE-WITH-YOUR-ENVIRONMENT-ID",

                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <DynamicWagmiConnector>
                        <DynamicWidget />
                    </DynamicWagmiConnector>
                </QueryClientProvider>
            </WagmiProvider>
        </DynamicContextProvider>
    );
};