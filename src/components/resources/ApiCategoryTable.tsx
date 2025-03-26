
import React from 'react';
import { Copy, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ApiCategory } from '@/types/apiDirectory';

interface ApiCategoryTableProps {
  category: ApiCategory;
}

// Helper function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard');
  }).catch(() => {
    toast.error('Failed to copy');
  });
};

const ApiCategoryTable: React.FC<ApiCategoryTableProps> = ({ category }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <category.icon className="mr-2 h-5 w-5" />
          {category.title}
        </CardTitle>
        <CardDescription>
          APIs for {category.description.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Auth</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.endpoints.map((api, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{api.name}</TableCell>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {api.endpoint}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      api.method === 'POST' ? 'bg-green-100 text-green-800' :
                      api.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {api.method}
                    </Badge>
                  </TableCell>
                  <TableCell>{api.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{api.auth}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiCategoryTable;
