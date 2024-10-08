import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/fun_master.tact',
    options: {
        debug: true,
    },
};
