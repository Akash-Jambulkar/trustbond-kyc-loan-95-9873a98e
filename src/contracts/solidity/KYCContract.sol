
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RoleManagement.sol";

/**
 * @title KYCContract
 * @dev Handles KYC verification and document management
 */
contract KYCContract {
    // KYC status enum
    enum VerificationStatus { NotSubmitted, Pending, Verified, Rejected }
    
    // Document struct
    struct Document {
        string hash;
        uint256 timestamp;
        string documentType;
        bool verified;
    }
    
    // KYC Submission struct
    struct KYCSubmission {
        address userAddress;
        VerificationStatus status;
        uint256 submissionTimestamp;
        uint256 verificationTimestamp;
        address verifierAddress;
    }
    
    // State variables
    RoleManagement public roleManagement;
    mapping(address => KYCSubmission) public kycSubmissions;
    mapping(address => Document[]) private userDocuments;
    address[] public verifiers;
    
    // Statistics
    uint256 public totalUsers;
    uint256 public verifiedUsers;
    uint256 public pendingVerifications;
    uint256 public rejectedVerifications;
    
    // Events
    event DocumentSubmitted(address indexed user, uint256 documentId);
    event KYCStatusChanged(address indexed user, VerificationStatus status);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    
    /**
     * @dev Constructor
     * @param _roleManagementAddress Address of the role management contract
     */
    constructor(address _roleManagementAddress) {
        roleManagement = RoleManagement(_roleManagementAddress);
        // Add contract deployer as first verifier
        verifiers.push(msg.sender);
    }
    
    /**
     * @dev Ensures caller is admin
     */
    modifier onlyAdmin() {
        require(roleManagement.isAdmin(msg.sender), "Only admin can call this function");
        _;
    }
    
    /**
     * @dev Ensures caller is a verifier
     */
    modifier onlyVerifier() {
        require(isVerifier(msg.sender), "Only verifiers can call this function");
        _;
    }
    
    /**
     * @dev Submit KYC documents
     * @param _documentHashes Array of document hashes (IPFS or other storage hashes)
     */
    function submitKYC(string[] memory _documentHashes) public {
        // User can only submit once or resubmit if rejected
        require(
            kycSubmissions[msg.sender].status == VerificationStatus.NotSubmitted || 
            kycSubmissions[msg.sender].status == VerificationStatus.Rejected,
            "KYC already submitted or verified"
        );
        
        // Create or update submission
        if (kycSubmissions[msg.sender].userAddress == address(0)) {
            kycSubmissions[msg.sender] = KYCSubmission({
                userAddress: msg.sender,
                status: VerificationStatus.Pending,
                submissionTimestamp: block.timestamp,
                verificationTimestamp: 0,
                verifierAddress: address(0)
            });
            totalUsers++;
            pendingVerifications++;
        } else {
            kycSubmissions[msg.sender].status = VerificationStatus.Pending;
            kycSubmissions[msg.sender].submissionTimestamp = block.timestamp;
            pendingVerifications++;
        }
        
        // Clear previous documents if resubmitting
        delete userDocuments[msg.sender];
        
        // Add new documents
        for (uint i = 0; i < _documentHashes.length; i++) {
            Document memory doc = Document({
                hash: _documentHashes[i],
                timestamp: block.timestamp,
                documentType: "general",  // Default type
                verified: false
            });
            userDocuments[msg.sender].push(doc);
            emit DocumentSubmitted(msg.sender, userDocuments[msg.sender].length - 1);
        }
        
        emit KYCStatusChanged(msg.sender, VerificationStatus.Pending);
    }
    
    /**
     * @dev Get user's KYC status
     * @param _user Address of the user
     * @return VerificationStatus enum value
     */
    function getKYCStatus(address _user) public view returns (VerificationStatus) {
        return kycSubmissions[_user].status;
    }
    
    /**
     * @dev Verify or reject a user's KYC submission
     * @param _user Address of the user
     * @param _isApproved Whether the KYC is approved
     */
    function verifyKYC(address _user, bool _isApproved) public onlyVerifier {
        require(kycSubmissions[_user].status == VerificationStatus.Pending, "KYC not pending");
        
        if (_isApproved) {
            kycSubmissions[_user].status = VerificationStatus.Verified;
            verifiedUsers++;
            pendingVerifications--;
            
            // Mark all documents as verified
            for (uint i = 0; i < userDocuments[_user].length; i++) {
                userDocuments[_user][i].verified = true;
            }
        } else {
            kycSubmissions[_user].status = VerificationStatus.Rejected;
            rejectedVerifications++;
            pendingVerifications--;
        }
        
        kycSubmissions[_user].verificationTimestamp = block.timestamp;
        kycSubmissions[_user].verifierAddress = msg.sender;
        
        emit KYCStatusChanged(_user, kycSubmissions[_user].status);
    }
    
    /**
     * @dev Get user's documents
     * @param _user Address of the user
     * @return Array of document hashes
     */
    function getUserDocuments(address _user) public view returns (string[] memory) {
        Document[] memory docs = userDocuments[_user];
        string[] memory hashes = new string[](docs.length);
        
        for (uint i = 0; i < docs.length; i++) {
            hashes[i] = docs[i].hash;
        }
        
        return hashes;
    }
    
    /**
     * @dev Request modification for a document
     * @param _documentId ID of the document
     * @param _newHash New document hash
     */
    function requestDocumentModification(uint256 _documentId, string memory _newHash) public {
        require(_documentId < userDocuments[msg.sender].length, "Invalid document ID");
        require(kycSubmissions[msg.sender].status != VerificationStatus.NotSubmitted, "No KYC submission found");
        
        userDocuments[msg.sender][_documentId].hash = _newHash;
        userDocuments[msg.sender][_documentId].timestamp = block.timestamp;
        userDocuments[msg.sender][_documentId].verified = false;
        
        // Reset status to pending
        if (kycSubmissions[msg.sender].status == VerificationStatus.Verified) {
            verifiedUsers--;
            pendingVerifications++;
        } else if (kycSubmissions[msg.sender].status == VerificationStatus.Rejected) {
            rejectedVerifications--;
            pendingVerifications++;
        }
        
        kycSubmissions[msg.sender].status = VerificationStatus.Pending;
        
        emit DocumentSubmitted(msg.sender, _documentId);
        emit KYCStatusChanged(msg.sender, VerificationStatus.Pending);
    }
    
    /**
     * @dev Add a verifier
     * @param _verifierAddress Address of the new verifier
     */
    function addVerifier(address _verifierAddress) public onlyAdmin {
        require(!isVerifier(_verifierAddress), "Already a verifier");
        verifiers.push(_verifierAddress);
        emit VerifierAdded(_verifierAddress);
    }
    
    /**
     * @dev Remove a verifier
     * @param _verifierAddress Address of the verifier to remove
     */
    function removeVerifier(address _verifierAddress) public onlyAdmin {
        require(isVerifier(_verifierAddress), "Not a verifier");
        
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _verifierAddress) {
                // Replace with the last element and pop
                verifiers[i] = verifiers[verifiers.length - 1];
                verifiers.pop();
                emit VerifierRemoved(_verifierAddress);
                break;
            }
        }
    }
    
    /**
     * @dev Check if an address is a verifier
     * @param _address Address to check
     * @return Boolean indicating if address is a verifier
     */
    function isVerifier(address _address) public view returns (bool) {
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _address) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Get system statistics
     * @return totalUsers Total number of users
     * @return verifiedUsers Number of verified users
     * @return pendingVerifications Number of pending verifications
     * @return rejectedVerifications Number of rejected verifications
     */
    function getSystemStats() public view returns (
        uint256, uint256, uint256, uint256
    ) {
        return (
            totalUsers,
            verifiedUsers,
            pendingVerifications,
            rejectedVerifications
        );
    }
}
