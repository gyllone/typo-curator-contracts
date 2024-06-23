import "@stdlib/deploy";
import "./deposit_vault";
import "./deposit_account";
import "./withdraw_vault";
import "./withdraw_account";

// === Deposit Vault Contract === //

contract DepositVault with BaseDepositVault, Deployable {
    override const storageReserve: Int = ton("0.05");

    // from BaseDepositVault
    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int as coins = 0;
    claimed_bonus_amount: Int as coins = 0;

    active: Bool = true;
    min_claim_amount: Int as coins = 1000000;
    bonus_percentage: Int as uint8 = 5; // 5%
    // ============================

    init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        self.owner = owner;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
    }

    override inline fun _get_account_init(owner: Address): StateInit {
        return initOf DepositAccount(owner, myAddress());
    }
}

// === Deposit Account Contract === //

contract DepositAccount with BaseDepositAccount, Deployable {
    override const storageReserve: Int = ton("0.01");

    // from BaseDepositAccount
    owner: Address; // from Ownable

    vault: Address;
    referrer: Address?;
    deposit_amount: Int as coins = 0;
    bonus_amount: Int as coins = 0;
    // ============================

    init(owner: Address, vault: Address) {
        self.owner = owner;
        self.vault = vault;
    }

    override inline fun _get_account_state_init(owner: Address): StateInit {
        return initOf DepositAccount(owner, self.vault);
    }
}

// === Withdraw Vault Contract === //

contract WithdrawVault with BaseWithdrawVault, Deployable {
    override const storageReserve: Int = ton("0.05");

    // from BaseWithdrawVault
    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int as coins = 0;
    withdrawn_amount: Int as coins = 0;

    active: Bool = true;
    pubkey: Int = 0;
    // ============================

    init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        self.owner = owner;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
    }

    override inline fun _get_account_init(owner: Address): StateInit {
        return initOf WithdrawAccount(owner, myAddress());
    }
}

// === Withdraw Account Contract === //

contract WithdrawAccount with BaseWithdrawAccount, Deployable {
    override const storageReserve: Int = ton("0.01");

    // from BaseAccount
    owner: Address; // from Ownable

    vault: Address;
    seqno: Int as uint64 = 0;
    // ============================

    init(owner: Address, vault: Address) {
        self.owner = owner;
        self.vault = vault;
    }

    override inline fun _get_account_state_init(owner: Address): StateInit {
        return initOf WithdrawAccount(owner, self.vault);
    }
}