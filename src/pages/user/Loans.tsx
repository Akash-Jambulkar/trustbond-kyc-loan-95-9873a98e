
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Wallet, CreditCard, BadgeCheck, Clock, Check, X, CalendarIcon, DollarSign, Building, BanknoteIcon } from 'lucide-react';

const Loans: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);

  // Mock data for demonstration
  const activeLoans = [
    { id: 1, amount: "$5,000", purpose: "Home Renovation", bank: "First Federal Bank", approvalDate: "2023-04-10", status: "active", interestRate: "5.2%", term: "24 months", remainingAmount: "$3,750", paid: 25 },
    { id: 2, amount: "$3,000", purpose: "Medical Expenses", bank: "Metro Bank", approvalDate: "2023-06-15", status: "active", interestRate: "4.8%", term: "12 months", remainingAmount: "$2,500", paid: 17 },
  ];
  
  const pendingApplications = [
    { id: 3, amount: "$10,000", purpose: "Education", bank: "Citizens Trust", applicationDate: "2023-05-05", status: "pending" },
  ];
  
  const loanHistory = [
    { id: 4, amount: "$2,000", purpose: "Emergency Fund", bank: "First Federal Bank", applicationDate: "2023-03-20", status: "rejected", reason: "Insufficient trust score" },
    { id: 5, amount: "$1,500", purpose: "Car Repair", bank: "Metro Bank", approvalDate: "2022-11-10", completionDate: "2023-02-10", status: "completed", interestRate: "6.0%", term: "3 months" },
  ];

  const availableBanks = [
    { id: 1, name: "First Federal Bank", trustScoreRequired: 75, interestRates: "4.5% - 6.5%" },
    { id: 2, name: "Metro Bank", trustScoreRequired: 70, interestRates: "4.8% - 7.2%" },
    { id: 3, name: "Citizens Trust", trustScoreRequired: 80, interestRates: "4.2% - 5.9%" },
  ];

  const loanPurposes = [
    { id: "home", name: "Home Renovation" },
    { id: "education", name: "Education" },
    { id: "medical", name: "Medical Expenses" },
    { id: "debt", name: "Debt Consolidation" },
    { id: "business", name: "Business Expenses" },
    { id: "other", name: "Other Purpose" }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><X className="mr-1 h-3 w-3" /> Rejected</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800"><BadgeCheck className="mr-1 h-3 w-3" /> Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleLoanApplication = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle loan application would go here
    setApplyDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Loan Center</h1>
            <p className="text-muted-foreground">Apply for loans and manage your existing loan accounts</p>
          </div>
          <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Apply for Loan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Loan Application</DialogTitle>
                <DialogDescription>
                  Complete the form below to apply for a new loan. Your application will be reviewed based on your trust score and verification status.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLoanApplication}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                      <Input id="loan-amount" type="number" min="500" placeholder="e.g., 5000" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="loan-purpose">Loan Purpose</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanPurposes.map(purpose => (
                            <SelectItem key={purpose.id} value={purpose.id}>{purpose.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loan-bank">Select Bank</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a financial institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBanks.map(bank => (
                          <SelectItem key={bank.id} value={bank.id.toString()}>{bank.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loan-term">Loan Term</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Desired Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loan-details">Additional Details</Label>
                    <Textarea id="loan-details" placeholder="Provide any additional information to support your application" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Submit Application</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLoans.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Currently active loans
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${activeLoans.reduce((acc, loan) => {
                  const amount = parseInt(loan.amount.replace(/[^0-9]/g, ''));
                  return acc + amount;
                }, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Total active loan amount
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="active">Active Loans</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="history">Loan History</TabsTrigger>
          </TabsList>
          
          {/* Active Loans Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeLoans.map((loan) => (
                <Card key={loan.id} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-primary/5">
                    <div className="flex justify-between">
                      <CardTitle>{loan.purpose}</CardTitle>
                      {getStatusBadge(loan.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-3 w-3 mr-1" />
                      {loan.bank}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="text-2xl font-bold">{loan.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Remaining</p>
                        <p className="text-xl font-semibold">{loan.remainingAmount}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{loan.paid}% paid</span>
                      </div>
                      <Progress value={loan.paid} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Term</p>
                        <p className="font-medium">{loan.term}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Approval Date</p>
                        <p className="font-medium">{loan.approvalDate}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-card border-t px-6 py-3">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm">
                        Payment Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <BanknoteIcon className="mr-1 h-4 w-4" />
                        Make Payment
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {activeLoans.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Active Loans</h3>
                  <p className="text-muted-foreground mb-4">You don't have any active loans at the moment.</p>
                  <Button onClick={() => setApplyDialogOpen(true)}>Apply for a Loan</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Loan Applications</CardTitle>
                <CardDescription>
                  Your loan applications that are waiting for approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingApplications.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.amount}</TableCell>
                          <TableCell>{application.purpose}</TableCell>
                          <TableCell>{application.bank}</TableCell>
                          <TableCell>{application.applicationDate}</TableCell>
                          <TableCell>{getStatusBadge(application.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Pending Applications</h3>
                    <p className="text-muted-foreground mb-4">You don't have any pending loan applications.</p>
                    <Button onClick={() => setApplyDialogOpen(true)}>Apply for a Loan</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Loan History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan History</CardTitle>
                <CardDescription>
                  Past loan applications and completed loans
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loanHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanHistory.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.amount}</TableCell>
                          <TableCell>{loan.purpose}</TableCell>
                          <TableCell>{loan.bank}</TableCell>
                          <TableCell>
                            {loan.status === "completed" ? loan.completionDate : loan.applicationDate}
                          </TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell>
                            {loan.status === "rejected" ? (
                              <span className="text-xs text-red-500">Reason: {loan.reason}</span>
                            ) : loan.status === "completed" ? (
                              <span className="text-xs">Term: {loan.term}, Rate: {loan.interestRate}</span>
                            ) : (
                              <span>-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <BadgeCheck className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Loan History</h3>
                    <p className="text-muted-foreground">You don't have any past loans or applications.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Loans;
