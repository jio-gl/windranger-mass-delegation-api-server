-- Delegatees are account that receive delegation of voting power from Delegators
CREATE TABLE IF NOT EXISTS Delegation
(
    token_address     CHAR(20),
    delegator_address CHAR(20),
    delegatee_address CHAR(20),
    proof             VARCHAR,
    delegated_weight  BIGINT,
    delegated_block   BIGINT,
    PRIMARY KEY (token_address,
                 delegator_address,
                 delegatee_address)
);

CREATE INDEX IF NOT EXISTS Delegation_index_delegator
    ON Delegation (
                   token_address,
                   delegator_address
        );

CREATE INDEX IF NOT EXISTS Delegation_index_delegatee
    ON Delegation (
                   token_address,
                   delegatee_address
        );

-- Delegators delegate their voting power to Delegatees
CREATE TABLE IF NOT EXISTS Delegators
(
    token_address     CHAR(20),
    delegator_address CHAR(20),
    trie_root         CHAR(32),
    delegated_block   BIGINT,
    PRIMARY KEY (token_address, delegator_address)
);

CREATE TABLE IF NOT EXISTS Token
(
    token_address CHAR(20) PRIMARY KEY,
    deployed_instance CHAR(20) 
);