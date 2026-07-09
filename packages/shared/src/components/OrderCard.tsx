import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order, TripStop, PendingAction } from '../types';

export type OrderCardProps = 
  | { mode: 'customer'; order: Order; onActionPress?: () => void }
  | { mode: 'driver'; tripStop: TripStop; onActionPress?: () => void }
  | { mode: 'admin'; actionItem: PendingAction; onActionPress?: () => void };

export const OrderCard: React.FC<OrderCardProps> = (props) => {
  const getModeStyles = () => {
    switch (props.mode) {
      case 'customer': return styles.customerContainer;
      case 'driver': return styles.driverContainer;
      case 'admin': return styles.adminContainer;
      default: return styles.defaultContainer;
    }
  };

  const renderContent = () => {
    if (props.mode === 'customer') {
      const { order } = props;
      return (
        <>
          <Text style={styles.headerText}>Order ID: {order.id}</Text>
          <Text style={styles.statusText}>Status: {order.status}</Text>
          {order.sku && (
            <View style={styles.itemsContainer}>
              <Text style={styles.detailText}>
                - {order.sku.qty}x {order.sku.name}
              </Text>
            </View>
          )}
        </>
      );
    } else if (props.mode === 'driver') {
      const { tripStop } = props;
      return (
        <>
          <Text style={styles.headerText}>Trip Stop Seq: {tripStop.seq}</Text>
          <Text style={styles.statusText}>Status: {tripStop.status}</Text>
          <Text style={styles.detailText}>Address: {tripStop.address}</Text>
          <Text style={styles.detailText}>Distance: {tripStop.distanceKm} km</Text>
          <Text style={styles.detailText}>ETA Min: {tripStop.etaMin !== null ? tripStop.etaMin : 'N/A'}</Text>
        </>
      );
    } else if (props.mode === 'admin') {
      const { actionItem } = props;
      const breached = actionItem.ageMinutes > actionItem.slaMinutes;
      return (
        <>
          <Text style={styles.headerText}>Action ID: {actionItem.id}</Text>
          <Text style={styles.statusText}>Category: {actionItem.category}</Text>
          <Text style={styles.detailText}>Priority: {actionItem.priority}</Text>
          <Text style={styles.detailText}>Action: {actionItem.action}</Text>
          {breached && (
            <Text style={{ ...styles.detailText, color: 'red', fontWeight: 'bold' }}>
              BREACHED WARNING! (Age: {actionItem.ageMinutes}m &gt; SLA: {actionItem.slaMinutes}m)
            </Text>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, getModeStyles()]}>
      {renderContent()}

      {props.onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={props.onActionPress}>
          <Text style={styles.actionButtonText}>
            {props.mode === 'customer' ? 'Cancel Order' : props.mode === 'driver' ? 'Accept Trip' : 'Approve'}
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
