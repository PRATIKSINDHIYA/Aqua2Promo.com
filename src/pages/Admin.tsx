import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Eye, 
  Download, 
  Search, 
  Filter,
  FileText,
  Calendar,
  User,
  Building,
  Phone,
  Mail
} from 'lucide-react';

interface Contract {
  id: string;
  fullName: string;
  designation: string;
  companyName: string;
  registeredAddress: string;
  mobileNumber: string;
  emailId: string;
  dateOfAgreement: string;
  digitalSignatureName: string;
  digitalSignatureDate: string;
  status: string;
  contractId: string;
  submittedAt: any;
}

const Admin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Check if user is admin (you can implement proper admin check)
  const isAdmin = currentUser?.email === 'admin@aqua2promo@gmail.com';

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      return;
    }

    fetchContracts();
  }, [currentUser, navigate, isAdmin, toast]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/admin/contracts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentUser?.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContracts(data.contracts || []);
      } else {
        throw new Error('Failed to fetch contracts');
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contracts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.emailId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (!currentUser || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Admin Panel - Contract Management
            </CardTitle>
            <p className="text-muted-foreground">
              Manage and review submitted contracts
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by company, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="sm:w-48">
                <Label htmlFor="status">Status Filter</Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading contracts...
                      </TableCell>
                    </TableRow>
                  ) : filteredContracts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No contracts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-mono text-sm">
                          {contract.contractId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {contract.companyName}
                        </TableCell>
                        <TableCell>{contract.fullName}</TableCell>
                        <TableCell>{contract.emailId}</TableCell>
                        <TableCell>{getStatusBadge(contract.status)}</TableCell>
                        <TableCell>{formatDate(contract.submittedAt)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedContract(contract)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Contract Details</DialogTitle>
                              </DialogHeader>
                              {selectedContract && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Contract ID
                                      </Label>
                                      <p className="font-mono text-sm">{selectedContract.contractId}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Status
                                      </Label>
                                      <div className="mt-1">{getStatusBadge(selectedContract.status)}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Full Name
                                      </Label>
                                      <p>{selectedContract.fullName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Designation
                                      </Label>
                                      <p>{selectedContract.designation}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Company Name
                                      </Label>
                                      <p>{selectedContract.companyName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Mobile Number
                                      </Label>
                                      <p>{selectedContract.mobileNumber}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Email ID
                                      </Label>
                                      <p>{selectedContract.emailId}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Date of Agreement
                                      </Label>
                                      <p>{selectedContract.dateOfAgreement}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                      Registered Address
                                    </Label>
                                    <p className="mt-1">{selectedContract.registeredAddress}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Digital Signature Name
                                      </Label>
                                      <p>{selectedContract.digitalSignatureName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">
                                        Signature Date
                                      </Label>
                                      <p>{selectedContract.digitalSignatureDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button variant="outline">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download PDF
                                    </Button>
                                    <Button variant="default">
                                      Approve
                                    </Button>
                                    <Button variant="destructive">
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;