// PowerShell C:\Users\jantonin> cd ./ama.asset.net
// PowerShell C:\Users\jantonin\ama.asset.net> node private/_utils/decrypt.js

const Web3 = require('web3') 
const url = 'HTTP://127.0.0.1:8545'
const web3 = new Web3(url)

const decrypt = web3.eth.accounts.decrypt({
    version: 3,
    id: 'ff1c2b71-8467-419a-abbd-5350c33d02a5',
    address: '174dd4231ec79edd74101ad001331a644281f45c',
    crypto: {
        ciphertext: '95005b4f02ce21570c9b0169f23c01aa26c135ac20d45c018af14b555867ee40',
        cipherparams: { iv: '7e37971d980c33ffe3dd8d33cd40bd1f' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '55d426d752d6df4502fd0106c7168b67c39fe8f373db9d606fb56983c720fb20',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: '96dd5f54e3a7ad52625c9911ff3615102a3050fa2cc93413b640f3bd111398af'
    }
}, 'rinkeby2020');
console.log(decrypt)