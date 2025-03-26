
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  role: string;
}

interface UserProfileSectionProps {
  user: UserProfile;
  variant?: 'sidebar' | 'dropdown';
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user, variant = 'sidebar' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case 'admin':
        return 'Administrator';
      case 'bank':
        return 'Financial Institution';
      case 'user':
        return 'Individual User';
      default:
        return 'Guest';
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {user.email}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="text-sm font-medium text-foreground">
          {user.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {getRoleLabel()}
        </p>
      </div>
    </div>
  );
};

export default UserProfileSection;
