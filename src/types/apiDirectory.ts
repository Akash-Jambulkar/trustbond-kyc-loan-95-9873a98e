
import { LucideIcon } from 'lucide-react';

export interface ApiParameter {
  name: string;
  type: string;
  description: string;
}

export interface ApiEndpoint {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: ApiParameter[];
  returns: string;
  auth: string;
}

export interface ApiCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  endpoints: ApiEndpoint[];
}
