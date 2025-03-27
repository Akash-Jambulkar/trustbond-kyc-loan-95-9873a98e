
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RoleManagement.sol";
import "./TrustScore.sol";

/**
 * @title LoanManagement
 * @dev Manages loan applications, approvals, and repayments
 */
contract LoanManagement {
    // Loan status enum
    enum LoanStatus { Pending, Approved, Rejected, Active, Completed, Defaulted }
    
    // Payment struct
    struct Payment {
        uint256 amount;
        uint256 timestamp;
    }
    
    // Loan struct
    struct Loan {
        uint256 id;
        address borrower;
        address lender;
        uint256 amount;
        string purpose;
        uint256 durationInDays;
        uint256 interestRate;  // in basis points, 100 = 1%
        uint256 applyDate;
        LoanStatus status;
        uint256 remainingAmount;
        uint256 lastPaymentDate;
        Payment[] paymentHistory;
    }
    
    // State variables
    RoleManagement public roleManagement;
    TrustScore public trustScore;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public userLoans;
    mapping(address => uint256[]) public bankLoans;
    uint256 public loanIdCounter;
    
    // Events
    event LoanApplied(address indexed user, uint256 indexed loanId, uint256 amount);
    event LoanApproved(address indexed user, uint256 indexed loanId);
    event LoanRejected(address indexed user, uint256 indexed loanId, string reason);
    event LoanRepaid(address indexed user, uint256 indexed loanId, uint256 amount);
    event PaymentMade(uint256 indexed loanId, uint256 amount, uint256 remainingAmount);
    event LoanCompleted(uint256 indexed loanId);
    event LoanDefaulted(uint256 indexed loanId);
    
    /**
     * @dev Constructor
     * @param _roleManagementAddress Address of the role management contract
     * @param _trustScoreAddress Address of the trust score contract
     */
    constructor(address _roleManagementAddress, address _trustScoreAddress) {
        roleManagement = RoleManagement(_roleManagementAddress);
        trustScore = TrustScore(_trustScoreAddress);
        loanIdCounter = 0;
    }
    
    /**
     * @dev Ensures only banks can call certain functions
     */
    modifier onlyBank() {
        require(
            roleManagement.hasRole(msg.sender, "bank"),
            "Only banks can perform this action"
        );
        _;
    }
    
    /**
     * @dev Ensures only authorized users (admin or bank) can call certain functions
     */
    modifier onlyAuthorized() {
        require(
            roleManagement.isAdmin(msg.sender) ||
            roleManagement.hasRole(msg.sender, "bank"),
            "Not authorized"
        );
        _;
    }
    
    /**
     * @dev Apply for a loan
     * @param _amount Loan amount in wei
     * @param _purpose Purpose of the loan
     * @param _durationInDays Duration of the loan in days
     */
    function applyForLoan(
        uint256 _amount,
        string memory _purpose,
        uint256 _durationInDays
    ) public {
        // Ensure user has a role
        require(
            bytes(roleManagement.getUserRole(msg.sender)).length > 0,
            "User not registered"
        );
        
        // Create a new loan
        uint256 loanId = loanIdCounter++;
        
        loans[loanId] = Loan({
            id: loanId,
            borrower: msg.sender,
            lender: address(0),  // Will be set when approved
            amount: _amount,
            purpose: _purpose,
            durationInDays: _durationInDays,
            interestRate: 500,   // Default 5% (500 basis points)
            applyDate: block.timestamp,
            status: LoanStatus.Pending,
            remainingAmount: _amount,
            lastPaymentDate: 0,
            paymentHistory: new Payment[](0)
        });
        
        // Add to user's loan list
        userLoans[msg.sender].push(loanId);
        
        emit LoanApplied(msg.sender, loanId, _amount);
    }
    
    /**
     * @dev Approve a loan application (bank only)
     * @param _loanId ID of the loan
     */
    function approveLoan(uint256 _loanId) public onlyBank {
        Loan storage loan = loans[_loanId];
        
        require(loan.borrower != address(0), "Loan does not exist");
        require(loan.status == LoanStatus.Pending, "Loan not in pending status");
        
        // Set approval details
        loan.status = LoanStatus.Approved;
        loan.lender = msg.sender;
        
        // Add to bank's loan list
        bankLoans[msg.sender].push(_loanId);
        
        emit LoanApproved(loan.borrower, _loanId);
    }
    
    /**
     * @dev Reject a loan application (bank only)
     * @param _loanId ID of the loan
     */
    function rejectLoan(uint256 _loanId) public onlyBank {
        Loan storage loan = loans[_loanId];
        
        require(loan.borrower != address(0), "Loan does not exist");
        require(loan.status == LoanStatus.Pending, "Loan not in pending status");
        
        // Set rejection details
        loan.status = LoanStatus.Rejected;
        loan.lender = msg.sender;
        
        emit LoanRejected(loan.borrower, _loanId, "Application rejected");
    }
    
    /**
     * @dev Make a loan payment
     * @param _loanId ID of the loan
     */
    function makePayment(uint256 _loanId) public payable {
        Loan storage loan = loans[_loanId];
        
        require(loan.borrower == msg.sender, "Not the borrower");
        require(loan.status == LoanStatus.Approved || loan.status == LoanStatus.Active, "Loan not active");
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        // If first payment, set loan to active
        if (loan.status == LoanStatus.Approved) {
            loan.status = LoanStatus.Active;
        }
        
        // Update remaining amount
        uint256 remainingBefore = loan.remainingAmount;
        if (msg.value >= loan.remainingAmount) {
            // Payment completes the loan
            uint256 excess = msg.value - loan.remainingAmount;
            loan.remainingAmount = 0;
            loan.status = LoanStatus.Completed;
            
            // Refund excess payment
            if (excess > 0) {
                payable(msg.sender).transfer(excess);
            }
            
            emit LoanCompleted(_loanId);
        } else {
            // Partial payment
            loan.remainingAmount -= msg.value;
        }
        
        // Add to payment history
        loan.paymentHistory.push(Payment({
            amount: msg.value > remainingBefore ? remainingBefore : msg.value,
            timestamp: block.timestamp
        }));
        
        // Update last payment date
        loan.lastPaymentDate = block.timestamp;
        
        // Forward payment to lender
        payable(loan.lender).transfer(msg.value > remainingBefore ? remainingBefore : msg.value);
        
        emit PaymentMade(_loanId, msg.value, loan.remainingAmount);
    }
    
    /**
     * @dev Get all loans for a user
     * @param _user Address of the user
     * @return Array of loan structs
     */
    function getUserLoans(address _user) public view returns (Loan[] memory) {
        uint256[] memory userLoanIds = userLoans[_user];
        Loan[] memory result = new Loan[](userLoanIds.length);
        
        for (uint i = 0; i < userLoanIds.length; i++) {
            result[i] = loans[userLoanIds[i]];
        }
        
        return result;
    }
    
    /**
     * @dev Get all loans for a bank
     * @return Array of loan structs
     */
    function getBankLoans() public view returns (Loan[] memory) {
        uint256[] memory bankLoanIds = bankLoans[msg.sender];
        Loan[] memory result = new Loan[](bankLoanIds.length);
        
        for (uint i = 0; i < bankLoanIds.length; i++) {
            result[i] = loans[bankLoanIds[i]];
        }
        
        return result;
    }
    
    /**
     * @dev Get details for a specific loan
     * @param _loanId ID of the loan
     * @return Loan struct
     */
    function getLoanDetails(uint256 _loanId) public view returns (Loan memory) {
        require(loans[_loanId].borrower != address(0), "Loan does not exist");
        
        // Only borrower, lender, or admin can view loan details
        require(
            loans[_loanId].borrower == msg.sender ||
            loans[_loanId].lender == msg.sender ||
            roleManagement.isAdmin(msg.sender),
            "Not authorized to view this loan"
        );
        
        return loans[_loanId];
    }
    
    /**
     * @dev Mark a loan as defaulted (bank only)
     * @param _loanId ID of the loan
     */
    function markLoanAsDefaulted(uint256 _loanId) public onlyBank {
        Loan storage loan = loans[_loanId];
        
        require(loan.lender == msg.sender, "Not the lender of this loan");
        require(loan.status == LoanStatus.Active, "Loan not active");
        
        // Check if last payment was more than 30 days ago
        require(
            block.timestamp > loan.lastPaymentDate + 30 days || 
            (loan.lastPaymentDate == 0 && block.timestamp > loan.applyDate + 30 days),
            "Loan not eligible for default yet"
        );
        
        loan.status = LoanStatus.Defaulted;
        
        // Update borrower's trust score
        uint256 currentScore = trustScore.getTrustScore(loan.borrower);
        if (currentScore >= 10) {
            trustScore.updateTrustScoreWithReason(loan.borrower, currentScore - 10, "Loan default");
        } else {
            trustScore.updateTrustScoreWithReason(loan.borrower, 0, "Loan default");
        }
        
        emit LoanDefaulted(_loanId);
    }
    
    /**
     * @dev Get loan statistics for a bank
     * @return totalLoans Total number of loans
     * @return activeLoans Number of active loans
     * @return completedLoans Number of completed loans
     * @return defaultedLoans Number of defaulted loans
     * @return totalAmount Total amount loaned
     * @return activeAmount Amount currently active in loans
     */
    function getLoanStats() public view onlyBank returns (
        uint256 totalLoans,
        uint256 activeLoans,
        uint256 completedLoans,
        uint256 defaultedLoans,
        uint256 totalAmount,
        uint256 activeAmount
    ) {
        uint256[] memory bankLoanIds = bankLoans[msg.sender];
        
        for (uint i = 0; i < bankLoanIds.length; i++) {
            Loan storage loan = loans[bankLoanIds[i]];
            
            // Count total loans
            totalLoans++;
            
            // Count by status
            if (loan.status == LoanStatus.Active) {
                activeLoans++;
                activeAmount += (loan.amount - loan.remainingAmount);
            } else if (loan.status == LoanStatus.Completed) {
                completedLoans++;
            } else if (loan.status == LoanStatus.Defaulted) {
                defaultedLoans++;
            }
            
            // Add to total amount
            totalAmount += loan.amount;
        }
        
        return (totalLoans, activeLoans, completedLoans, defaultedLoans, totalAmount, activeAmount);
    }
    
    /**
     * @dev Update contract addresses (admin only)
     * @param _roleManagementAddress New role management contract address
     * @param _trustScoreAddress New trust score contract address
     */
    function updateContractAddresses(
        address _roleManagementAddress,
        address _trustScoreAddress
    ) public {
        require(roleManagement.isAdmin(msg.sender), "Only admin can update contract addresses");
        
        roleManagement = RoleManagement(_roleManagementAddress);
        trustScore = TrustScore(_trustScoreAddress);
    }
}
