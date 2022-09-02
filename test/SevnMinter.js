const truffleAssert = require('truffle-assertions');
const BigNumber = require('bignumber.js');

const Sevn = artifacts.require("Sevn");

contract('Sevn', accounts => {
    const decimals = BigNumber(10).pow(18);
    let instance;

    beforeEach('should setup the contract instance', async () => {
        instance = await Sevn.deployed();
    });

    it('deployed', async() => {
        const totalSupply = await instance.totalSupply();
        assert.equal(BigNumber(totalSupply).toFixed(),BigNumber(10000000).multipliedBy(decimals).toFixed(), 'balance wrong');

        const balanceOfOwner = await instance.balanceOf(accounts[0]);
        assert.equal(BigNumber(balanceOfOwner).toFixed(),BigNumber(10000000).multipliedBy(decimals).toFixed(), 'balance wrong');
        
        let isMinter = await instance.isMinter.call(accounts[0]);
        assert.equal(isMinter, true, 'Owner is not minter');
    });

    it('add minter', async() => {
        await truffleAssert.fails(
            instance.addMinter(accounts[1], {from: accounts[1]})
        );

        await truffleAssert.fails(
            instance.addMinter('0x0000000000000000000000000000000000000000')
        );

        await instance.addMinter(accounts[1])
    });

    it('is minter', async() => {
        let isMinter = await instance.isMinter.call(accounts[1]);
        assert.equal(isMinter, true, 'isMinter is not minter');

        let isMinter2 = await instance.isMinter.call(accounts[2]);
        assert.equal(isMinter2, false, 'isMinter is minter');
    })

    it('getMinterLength', async() => {
        let minterLength = await instance.getMinterLength();
        assert.equal(minterLength, 2, 'minterLength is wrong');
    });

    it('getMinter', async() => {
        let minter = await instance.getMinter(0);
        assert.equal(minter, accounts[0], 'getMinter is wrong');
    });

    it('mint', async() => {
        const amount = BigNumber(300000000).multipliedBy(decimals);

        await truffleAssert.fails(
            instance.mint(accounts[1], amount, {from: accounts[4]})
        );

        await instance.mint(accounts[0], amount, {from: accounts[1]});
        const totalSupply = await instance.totalSupply();
        assert.equal(BigNumber(totalSupply).toFixed(),BigNumber(310000000).multipliedBy(decimals).toFixed(), 'balance wrong');


        await truffleAssert.fails(
            instance.mint(accounts[1], amount)
        );

    })

    it('burn',  async() =>{
        const amount = BigNumber(10000000).multipliedBy(decimals);

        await truffleAssert.fails(
            instance.burn(amount, {from: accounts[1]})
        );

        await instance.burn(amount);
        const totalSupply = await instance.totalSupply();
        assert.equal(BigNumber(totalSupply).toFixed(),BigNumber(300000000).multipliedBy(decimals).toFixed(), 'balance wrong');
    });

    it('delMinter', async() => {
        await truffleAssert.fails(
            instance.delMinter(accounts[1], {from: accounts[1]})
        );

        await instance.delMinter(accounts[1]);
        let minterLength = await instance.getMinterLength();
        assert.equal(minterLength, 1, 'minterLength is wrong');

        let isMinter = await instance.isMinter.call(accounts[1]);
        assert.equal(isMinter, false, 'isMinter is minter');
    });

});