
import { useState, useEffect, useCallback } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { connectDB, isConnected } from '@/services/database/mongoConnection';
import { toast } from 'sonner';

type SyncFunction<T> = () => Promise<T>;

export function useRealTimeSync<T>(
  syncFunction: SyncFunction<T>,
  initialData: T,
  intervalMs: number = 30000, // Default to 30 seconds
  dependencies: any[] = []
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isConnected: isWalletConnected } = useBlockchain();

  const fetchData = useCallback(async () => {
    if (!isWalletConnected) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Ensure MongoDB connection
      if (!isConnected()) {
        await connectDB();
      }

      const result = await syncFunction();
      setData(result);
      setLastSynced(new Date());
    } catch (err: any) {
      console.error('Data sync error:', err);
      setError(err.message || 'Failed to synchronize data');
    } finally {
      setIsLoading(false);
    }
  }, [syncFunction, isWalletConnected]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  // Set up periodic sync
  useEffect(() => {
    if (!isWalletConnected) return;

    const interval = setInterval(() => {
      fetchData();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [fetchData, intervalMs, isWalletConnected]);

  const manualSync = async () => {
    try {
      await fetchData();
      toast.success("Data synchronized successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to synchronize data");
    }
  };

  return {
    data,
    isLoading,
    lastSynced,
    error,
    manualSync
  };
}
