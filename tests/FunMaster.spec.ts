import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { FunMaster } from '../wrappers/FunMaster';
import '@ton/test-utils';

describe('FunMaster', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let funMaster: SandboxContract<FunMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        funMaster = blockchain.openContract(await FunMaster.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await funMaster.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: funMaster.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and funMaster are ready to use
    });
});
