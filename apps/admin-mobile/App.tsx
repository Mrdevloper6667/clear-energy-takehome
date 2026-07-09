import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Button } from 'react-native';
import { ApiClient, OrderCard } from '@clear-energy/shared';

const apiClient = new ApiClient({ baseUrl: 'http://localhost:4000' });

export default function App() {
  const [actionItem, setActionItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      setActionItem(null);
      
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const data = await apiClient.get<any[]>('/pending-actions?adminId=a-201', controller.signal);
      
      if (data && data.length > 0) {
        setActionItem(data[0]);
      } else {
        setActionItem(null);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    return () => abortControllerRef.current?.abort();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Admin App</Text>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <Button title="Retry" onPress={fetchOrder} />
          </View>
        )}

        {!loading && !error && !actionItem && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pending orders to review.</Text>
            <Button title="Refresh" onPress={fetchOrder} />
          </View>
        )}

        {!loading && !error && actionItem && (
          <OrderCard 
            mode="admin" 
            actionItem={actionItem} 
            onActionPress={() => alert('Order approved')} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
