
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RoleManagement
 * @dev Handles role assignment and verification for the TrustBond system
 */
contract RoleManagement {
    // Role constants
    string public constant ROLE_ADMIN = "admin";
    string public constant ROLE_BANK = "bank";
    string public constant ROLE_USER = "user";
    string public constant ROLE_NONE = "none";
    
    // Mapping to store user roles
    mapping(address => string) public roles;
    
    // Contract owner/admin
    address public admin;
    
    // Event declarations
    event RoleAssigned(address indexed user, string role);
    event BankApproved(address indexed bankAddress);
    event BankRevoked(address indexed bankAddress);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);
    
    /**
     * @dev Constructor that sets up initial admin
     */
    constructor() {
        admin = msg.sender;
        roles[msg.sender] = ROLE_ADMIN;
        emit RoleAssigned(msg.sender, ROLE_ADMIN);
    }
    
    /**
     * @dev Ensures only admin can call certain functions
     */
    modifier onlyAdmin() {
        require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked(ROLE_ADMIN)), "Only admin can perform this action");
        _;
    }
    
    /**
     * @dev Returns the role of a user
     * @param _user Address of the user
     * @return Role as a string
     */
    function getUserRole(address _user) public view returns (string memory) {
        string memory role = roles[_user];
        if (bytes(role).length == 0) {
            return ROLE_NONE;
        }
        return role;
    }
    
    /**
     * @dev Checks if a user has a specific role
     * @param _user Address of the user
     * @param _role Role to check
     * @return Boolean indicating if user has the role
     */
    function hasRole(address _user, string memory _role) public view returns (bool) {
        return keccak256(abi.encodePacked(roles[_user])) == keccak256(abi.encodePacked(_role));
    }
    
    /**
     * @dev Registers a new user
     */
    function registerUser() public {
        require(bytes(roles[msg.sender]).length == 0, "Address already has a role");
        roles[msg.sender] = ROLE_USER;
        emit RoleAssigned(msg.sender, ROLE_USER);
    }
    
    /**
     * @dev Registers a bank (pending approval)
     * @param _bankId Bank identifier or license number
     */
    function registerBank(string memory _bankId) public {
        require(bytes(roles[msg.sender]).length == 0, "Address already has a role");
        // In a real system, we'd validate the bank ID
        // Here we just assign a pending_bank role
        roles[msg.sender] = "pending_bank";
        emit RoleAssigned(msg.sender, "pending_bank");
    }
    
    /**
     * @dev Approves a pending bank
     * @param _bankAddress Address of the bank to approve
     */
    function approveBank(address _bankAddress) public onlyAdmin {
        require(
            keccak256(abi.encodePacked(roles[_bankAddress])) == keccak256(abi.encodePacked("pending_bank")), 
            "Address is not a pending bank"
        );
        roles[_bankAddress] = ROLE_BANK;
        emit RoleAssigned(_bankAddress, ROLE_BANK);
        emit BankApproved(_bankAddress);
    }
    
    /**
     * @dev Revokes bank status
     * @param _bankAddress Address of the bank to revoke
     */
    function revokeBank(address _bankAddress) public onlyAdmin {
        require(
            keccak256(abi.encodePacked(roles[_bankAddress])) == keccak256(abi.encodePacked(ROLE_BANK)), 
            "Address is not a bank"
        );
        roles[_bankAddress] = "revoked_bank";
        emit RoleAssigned(_bankAddress, "revoked_bank");
        emit BankRevoked(_bankAddress);
    }
    
    /**
     * @dev Assigns a role to a user
     * @param _user Address of the user
     * @param _role Role to assign
     */
    function assignRole(address _user, string memory _role) public onlyAdmin {
        roles[_user] = _role;
        emit RoleAssigned(_user, _role);
    }
    
    /**
     * @dev Checks if an address is the admin
     * @param _address Address to check
     * @return Boolean indicating if address is admin
     */
    function isAdmin(address _address) public view returns (bool) {
        return hasRole(_address, ROLE_ADMIN);
    }
    
    /**
     * @dev Transfers admin role to a new address
     * @param _newAdmin Address of the new admin
     */
    function transferAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        
        // Remove admin role from current admin
        string memory oldAdminRole = roles[admin];
        address oldAdmin = admin;
        
        // Assign admin role to new admin
        admin = _newAdmin;
        roles[_newAdmin] = ROLE_ADMIN;
        
        emit RoleAssigned(_newAdmin, ROLE_ADMIN);
        emit AdminTransferred(oldAdmin, _newAdmin);
    }
}
