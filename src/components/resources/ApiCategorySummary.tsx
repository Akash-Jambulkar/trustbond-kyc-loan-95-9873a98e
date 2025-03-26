
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiCategory } from '@/types/apiDirectory';

interface ApiCategorySummaryProps {
  categories: ApiCategory[];
}

const ApiCategorySummary: React.FC<ApiCategorySummaryProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <category.icon className="mr-2 h-5 w-5 text-primary" />
              {category.title}
            </CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{category.endpoints.length}</p>
            <p className="text-muted-foreground text-sm">Available endpoints</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApiCategorySummary;
