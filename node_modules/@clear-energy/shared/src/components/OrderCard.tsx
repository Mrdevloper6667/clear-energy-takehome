import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type OrderMode = 'customer' | 'driver' | 'admin';

export interface OrderCardProps {
  mode: OrderMode;
  order: {
    id: string;
    status: string;
    customerId?: string;
    items?: Array<{ name: string; quantity: number }>;
  };
  onActionPress?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ mode, order, onActionPress }) => {
  const getModeStyles = () => {
    switch (mode) {
      case 'customer': return styles.customerContainer;
      case 'driver': return styles.driverContainer;
      case 'admin': return styles.adminContainer;
      default: return styles.defaultContainer;
    }
  };

  return (
    <View style={[styles.container, getModeStyles()]}>
      <Text style={styles.headerText}>Order ID: {order.id}</Text>
      <Text style={styles.statusText}>Status: {order.status}</Text>
      
      {mode === 'admin' && (
        <Text style={styles.detailText}>Customer: {order.customerId}</Text>
      )}

      {mode === 'customer' && order.items && (
        <View style={styles.itemsContainer}>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.detailText}>
              - {item.quantity}x {item.name}
            </Text>
          ))}
        </View>
      )}

      {onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Text style={styles.actionButtonText}>
            {mode === 'customer' ? 'Cancel Order' : mode === 'driver' ? 'Accept Trip' : 'Approve'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  customerContainer: {
    backgroundColor: '#f5f9ff',
  },
  driverContainer: {
    backgroundColor: '#fffcf5',
  },
  adminContainer: {
    backgroundColor: '#fcf5ff',
  },
  defaultContainer: {
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  itemsContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  actionButton: {
    marginTop: 12,
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
