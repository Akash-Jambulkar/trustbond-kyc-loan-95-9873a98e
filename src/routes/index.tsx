
import { RouteObject } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import companyRoutes from './companyRoutes';
import solutionsRoutes from './solutionsRoutes';
import resourcesRoutes from './resourcesRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import bankRoutes from './bankRoutes';
import adminRoutes from './adminRoutes';
import analyticsRoutes from './analyticsRoutes';

// Export individual route groups for direct access
export { default as publicRoutes } from './publicRoutes';
export { default as companyRoutes } from './companyRoutes';
export { default as solutionsRoutes } from './solutionsRoutes';
export { default as resourcesRoutes } from './resourcesRoutes';
export { default as authRoutes } from './authRoutes';
export { default as userRoutes } from './userRoutes';
export { default as bankRoutes } from './bankRoutes';
export { default as adminRoutes } from './adminRoutes';
export { default as analyticsRoutes } from './analyticsRoutes';

// Combine all routes
const routes: RouteObject[] = [
  ...publicRoutes,
  ...companyRoutes,
  ...solutionsRoutes,
  ...resourcesRoutes,
  ...authRoutes,
  ...userRoutes,
  ...bankRoutes,
  ...adminRoutes,
  ...analyticsRoutes
];

export default routes;
