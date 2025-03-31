
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface TrustScoreGaugeProps {
  score: number | null;
  status?: 'verified' | 'pending' | 'rejected' | 'not_started';
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const TrustScoreGauge: React.FC<TrustScoreGaugeProps> = ({
  score,
  status = 'pending',
  title = 'Trust Score',
  description = 'Based on verification level and blockchain history',
  size = 'md',
  showIcon = true
}) => {
  // Define sizing based on the size prop
  const getSize = () => {
    switch (size) {
      case 'sm':
        return {
          height: 'h-2',
          text: 'text-lg',
          padding: 'p-3'
        };
      case 'lg':
        return {
          height: 'h-4',
          text: 'text-4xl',
          padding: 'p-6'
        };
      default: // md
        return {
          height: 'h-3',
          text: 'text-2xl',
          padding: 'p-4'
        };
    }
  };
  
  // Get color class based on score
  const getColorClass = () => {
    if (score === null) return 'bg-gray-300';
    
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const sizeClasses = getSize();
  const colorClass = getColorClass();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {showIcon && getStatusIcon()}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={`${sizeClasses.padding}`}>
        {score !== null ? (
          <>
            <div className={`${sizeClasses.text} font-bold mb-2 flex justify-between items-center`}>
              <span>{score}</span>
              <span className="text-xs font-normal text-muted-foreground">/ 100</span>
            </div>
            <Progress className={`${sizeClasses.height} ${colorClass}`} value={score} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Low Trust</span>
              <span>High Trust</span>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <Shield className="h-8 w-8 mx-auto text-muted-foreground opacity-50 mb-2" />
            <p className="text-muted-foreground">No trust score available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrustScoreGauge;
