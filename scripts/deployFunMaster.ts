import { toNano } from '@ton/core';
import { FunMaster } from '../wrappers/FunMaster';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const funMaster = provider.open(await FunMaster.fromInit());

    await funMaster.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(funMaster.address);

    // run methods on `funMaster`
}
