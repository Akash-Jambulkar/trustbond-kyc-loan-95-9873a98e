
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiCategory } from '@/types/apiDirectory';
import ApiCategoryTable from './ApiCategoryTable';

interface ApiTabsProps {
  categories: ApiCategory[];
}

const ApiTabs: React.FC<ApiTabsProps> = ({ categories }) => {
  return (
    <Tabs defaultValue={categories[0].id} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.title.split(' ')[0]} {/* Just display the first word for space efficiency */}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <ApiCategoryTable category={category} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ApiTabs;
