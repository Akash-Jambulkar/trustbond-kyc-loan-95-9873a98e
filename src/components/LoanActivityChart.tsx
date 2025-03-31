
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Check, X, Clock, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';

interface LoanActivityChartProps {
  data?: {
    approved: number;
    rejected: number;
    pending: number;
    distribution?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    timeline?: Array<{
      month: string;
      approved: number;
      rejected: number;
      pending: number;
    }>;
  };
  title?: string;
  description?: string;
}

const LoanActivityChart: React.FC<LoanActivityChartProps> = ({
  data,
  title = "Loan Activity",
  description = "Overview of loan applications and their statuses"
}) => {
  const [activeChart, setActiveChart] = useState('distribution');
  
  // Default data if none provided
  const defaultData = {
    approved: 32,
    rejected: 12,
    pending: 8,
    distribution: [
      { name: 'Approved', value: 32, color: '#10B981' },
      { name: 'Rejected', value: 12, color: '#EF4444' },
      { name: 'Pending', value: 8, color: '#F59E0B' }
    ],
    timeline: [
      { month: 'Jan', approved: 4, rejected: 2, pending: 1 },
      { month: 'Feb', approved: 5, rejected: 1, pending: 2 },
      { month: 'Mar', approved: 7, rejected: 3, pending: 0 },
      { month: 'Apr', approved: 6, rejected: 2, pending: 1 },
      { month: 'May', approved: 8, rejected: 1, pending: 3 },
      { month: 'Jun', approved: 10, rejected: 2, pending: 1 },
    ]
  };
  
  // Use provided data or default
  const chartData = data || defaultData;
  
  // Chart configuration
  const chartConfig = {
    approved: {
      label: 'Approved',
      theme: {
        light: '#10B981',
        dark: '#34D399'
      }
    },
    rejected: {
      label: 'Rejected',
      theme: {
        light: '#EF4444',
        dark: '#F87171'
      }
    },
    pending: {
      label: 'Pending',
      theme: {
        light: '#F59E0B',
        dark: '#FBBF24'
      }
    }
  };
  
  // Prepare data for pie chart
  const pieData = chartData.distribution || [
    { name: 'Approved', value: chartData.approved, color: chartConfig.approved.theme.light },
    { name: 'Rejected', value: chartData.rejected, color: chartConfig.rejected.theme.light },
    { name: 'Pending', value: chartData.pending, color: chartConfig.pending.theme.light }
  ];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full p-2 bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{chartData.approved}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full p-2 bg-red-100">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{chartData.rejected}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full p-2 bg-yellow-100">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{chartData.pending}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={activeChart} onValueChange={setActiveChart} className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto mb-4">
            <TabsTrigger value="distribution" className="flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2" />
              <span>Distribution</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center">
              <BarChartIcon className="h-4 w-4 mr-2" />
              <span>Timeline</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution">
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.timeline}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="approved" name="Approved" fill={chartConfig.approved.theme.light} />
                    <Bar dataKey="rejected" name="Rejected" fill={chartConfig.rejected.theme.light} />
                    <Bar dataKey="pending" name="Pending" fill={chartConfig.pending.theme.light} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanActivityChart;
