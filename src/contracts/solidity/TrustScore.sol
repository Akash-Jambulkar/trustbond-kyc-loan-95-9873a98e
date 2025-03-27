
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RoleManagement.sol";
import "./KYCContract.sol";

/**
 * @title TrustScore
 * @dev Manages trust scores for users in the system
 */
contract TrustScore {
    // Trust score history struct
    struct ScoreHistory {
        uint256 score;
        uint256 timestamp;
        string reason;
    }
    
    // Trust score data struct
    struct TrustScoreData {
        uint256 score;
        uint256 lastUpdated;
        uint8 verificationLevel;
        ScoreHistory[] history;
    }
    
    // State variables
    RoleManagement public roleManagement;
    KYCContract public kycContract;
    mapping(address => TrustScoreData) private trustScoreDataMap;
    mapping(address => uint256) public trustScores;  // Direct access for backward compatibility
    address public admin;
    
    // Events
    event TrustScoreUpdated(address indexed user, uint256 oldScore, uint256 newScore);
    
    /**
     * @dev Constructor
     * @param _roleManagementAddress Address of the role management contract
     * @param _kycContractAddress Address of the KYC contract
     */
    constructor(address _roleManagementAddress, address _kycContractAddress) {
        roleManagement = RoleManagement(_roleManagementAddress);
        kycContract = KYCContract(_kycContractAddress);
        admin = msg.sender;
    }
    
    /**
     * @dev Ensures only admin or banks can call certain functions
     */
    modifier onlyAuthorized() {
        require(
            roleManagement.isAdmin(msg.sender) || 
            roleManagement.hasRole(msg.sender, "bank"),
            "Caller not authorized"
        );
        _;
    }
    
    /**
     * @dev Gets a user's trust score
     * @param _user Address of the user
     * @return Current trust score
     */
    function getTrustScore(address _user) public view returns (uint256) {
        return trustScores[_user];
    }
    
    /**
     * @dev Gets all trust score data for a user
     * @param _user Address of the user
     * @return Full trust score data struct
     */
    function getTrustScoreData(address _user) public view returns (
        uint256 score,
        uint256 lastUpdated,
        uint8 verificationLevel,
        ScoreHistory[] memory history
    ) {
        TrustScoreData storage data = trustScoreDataMap[_user];
        return (
            data.score,
            data.lastUpdated,
            data.verificationLevel,
            data.history
        );
    }
    
    /**
     * @dev Gets trust score history
     * @param _user Address of the user
     * @return Array of score history records
     */
    function getTrustScoreHistory(address _user) public view returns (ScoreHistory[] memory) {
        return trustScoreDataMap[_user].history;
    }
    
    /**
     * @dev Updates a user's trust score
     * @param _user Address of the user
     * @param _newScore New trust score
     */
    function updateTrustScore(address _user, uint256 _newScore) public onlyAuthorized {
        require(_newScore <= 100, "Score must be between 0 and 100");
        
        uint256 oldScore = trustScores[_user];
        
        // Initialize if first time
        if (trustScoreDataMap[_user].lastUpdated == 0) {
            trustScoreDataMap[_user] = TrustScoreData({
                score: _newScore,
                lastUpdated: block.timestamp,
                verificationLevel: 1,
                history: new ScoreHistory[](0)
            });
        } else {
            trustScoreDataMap[_user].score = _newScore;
            trustScoreDataMap[_user].lastUpdated = block.timestamp;
        }
        
        // Add to history
        trustScoreDataMap[_user].history.push(ScoreHistory({
            score: _newScore,
            timestamp: block.timestamp,
            reason: "Updated by authority"
        }));
        
        // Update the direct access mapping as well
        trustScores[_user] = _newScore;
        
        emit TrustScoreUpdated(_user, oldScore, _newScore);
    }
    
    /**
     * @dev Updates trust score with a reason
     * @param _user Address of the user
     * @param _newScore New trust score
     * @param _reason Reason for the update
     */
    function updateTrustScoreWithReason(address _user, uint256 _newScore, string memory _reason) public onlyAuthorized {
        require(_newScore <= 100, "Score must be between 0 and 100");
        
        uint256 oldScore = trustScores[_user];
        
        // Initialize if first time
        if (trustScoreDataMap[_user].lastUpdated == 0) {
            trustScoreDataMap[_user] = TrustScoreData({
                score: _newScore,
                lastUpdated: block.timestamp,
                verificationLevel: 1,
                history: new ScoreHistory[](0)
            });
        } else {
            trustScoreDataMap[_user].score = _newScore;
            trustScoreDataMap[_user].lastUpdated = block.timestamp;
        }
        
        // Add to history
        trustScoreDataMap[_user].history.push(ScoreHistory({
            score: _newScore,
            timestamp: block.timestamp,
            reason: _reason
        }));
        
        // Update the direct access mapping as well
        trustScores[_user] = _newScore;
        
        emit TrustScoreUpdated(_user, oldScore, _newScore);
    }
    
    /**
     * @dev Calculate a trust score for a user based on their KYC status and history
     * This is a simplified example - a real implementation would use much more data
     * @param _user Address of the user
     * @return Calculated trust score
     */
    function calculateScore(address _user) public view returns (uint256) {
        // Base score
        uint256 score = 50;
        
        // Add points for KYC verification
        if (kycContract.getKYCStatus(_user) == KYCContract.VerificationStatus.Verified) {
            score += 30;
        }
        
        // Add points for verification level
        score += (uint256(trustScoreDataMap[_user].verificationLevel) * 5);
        
        // Ensure score is within bounds
        if (score > 100) {
            score = 100;
        }
        
        return score;
    }
    
    /**
     * @dev Get average trust score across all users
     * @return Average trust score
     */
    function getAverageTrustScore() public view returns (uint256) {
        uint256 totalScore = 0;
        uint256 count = 0;
        
        // Note: This is inefficient for a large number of users
        // A real implementation would track a running average
        for (uint i = 0; i < 10; i++) {
            if (trustScoreDataMap[address(uint160(i))].lastUpdated > 0) {
                totalScore += trustScoreDataMap[address(uint160(i))].score;
                count++;
            }
        }
        
        if (count == 0) return 0;
        return totalScore / count;
    }
    
    /**
     * @dev Upgrade a user's verification level
     * @param _user Address of the user
     * @param _newLevel New verification level
     */
    function upgradeVerificationLevel(address _user, uint8 _newLevel) public onlyAuthorized {
        require(_newLevel > trustScoreDataMap[_user].verificationLevel, "New level must be higher");
        require(_newLevel <= 5, "Level cannot exceed 5");
        
        trustScoreDataMap[_user].verificationLevel = _newLevel;
        
        // Recalculate score based on new level
        uint256 newScore = calculateScore(_user);
        updateTrustScoreWithReason(_user, newScore, "Verification level upgraded");
    }
}
