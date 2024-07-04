import "@stdlib/deploy";
import "./data";
import "./deposit_vault";
import "./deposit_account";
import "./withdraw_vault";
import "./withdraw_account";
import "./badge_collection";
import "./badge_item";

// === Deposit Vault Contract === //

contract DepositVault with BaseDepositVault, Deployable {
    override const storageReserve: Int = ton("0.1");

    // from BaseDepositVault
    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int as coins = 0;
    claimed_bonus_amount: Int as coins = 0;

    active: Bool = true;
    min_claim_amount: Int as coins = 1;
    bonus_percentage: Int as uint8 = 3; // 3%
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

contract DepositAccount with BaseDepositAccount {
    override const storageReserve: Int = ton("0.02");

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
    override const storageReserve: Int = ton("0.1");

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
    override const storageReserve: Int = ton("0.02");

    // from BaseAccount
    owner: Address; // from Ownable

    vault: Address;
    seqno: Int as uint64 = 0;
    withdrawn_amount: Int as coins = 0;
    // ============================

    init(owner: Address, vault: Address) {
        self.owner = owner;
        self.vault = vault;
    }

    override inline fun _get_account_state_init(owner: Address): StateInit {
        return initOf WithdrawAccount(owner, self.vault);
    }
}

// === Badge Collection Contract === //

contract BadgeCollection with BaseBadgeCollection, Deployable {
    override const storageReserve: Int = ton("0.05");

    // from BaseBadgeCollection
    owner: Address; // from OwnableTransferrable

    next_item_index: Int as uint64 = 0;                 
    content: Cell;

    pubkey: Int = 0;
    // ============================

    init(owner: Address, content: Cell) {
        self.owner = owner;
        self.content = content;
    }

    override inline fun _get_badge_item_init(index: Int): StateInit {
        return initOf BadgeItem(myAddress(), index);
    }
}

// === Badge Item Contract === //

contract BadgeItem with BaseBadgeItem {
    override const storageReserve: Int = ton("0.05");

    // from BaseBadgeItem
    initialized: Bool = false;
    index: Int as uint64;
    collection: Address;
    owner: Address? = null;
    content: Cell? = null;
    authority: Address? = null;
    revoked_at: Int as uint64 = 0;
    // ============================

    init(collection: Address, index: Int) {
        self.collection = collection;
        self.index = index;
    }
}