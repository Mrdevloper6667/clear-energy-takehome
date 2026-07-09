export interface Order {
  id: string;
  customerName: string;
  address: string;
  amountPaise: number;
  sku: { code: string; name: string; qty: number };
  status: 'placed' | 'assigned' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
  placedAt: string;
  eta: string | null;
}

export interface TripStop {
  seq: number;
  orderId: string;
  customerName: string;
  sku: string;
  address: string;
  distanceKm: number;
  status: 'pending' | 'active' | 'done' | 'skipped';
  etaMin: number | null;
}

export interface PendingAction {
  id: string;
  category: 'mi_empty' | 'mi_full' | 'cash' | 'prior_delivery' | 'unassigned' | 'verification' | 'branch_assign' | 'kyc';
  summary: string;
  priority: 'low' | 'med' | 'high' | 'breached';
  ageMinutes: number;
  slaMinutes: number;
  action: 'approve' | 'route' | 'decide' | 'assign' | 'remind' | 'review';
}
