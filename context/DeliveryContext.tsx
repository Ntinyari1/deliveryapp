import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DeliveryStatus = 'available' | 'accepted' | 'completed' | 'cancelled';

export interface Delivery {
  id: string;
  from: string;
  to: string;
  distance: string;
  payment: string;
  packageType: string;
  estimatedTime: string;
  status: DeliveryStatus;
  date: string;
  time: string;
  rating: number | null;
}

export interface DeliveryContextType {
  deliveries: Delivery[];
  acceptDelivery: (id: string) => void;
  completeDelivery: (id: string) => void;
  cancelDelivery: (id: string) => void;
}

const initialDeliveries: Delivery[] = [
  {
    id: '1',
    from: 'Westlands Shopping Mall',
    to: 'Karen Shopping Centre',
    distance: '12 km',
    payment: 'KSh 350',
    packageType: 'Document',
    estimatedTime: '25 mins',
    status: 'available',
    date: '2024-01-15',
    time: '14:30',
    rating: 5,
  },
  {
    id: '2',
    from: 'CBD - Kencom',
    to: 'Kilimani',
    distance: '5.2 km',
    payment: 'KSh 280',
    packageType: 'Small Package',
    estimatedTime: '15 mins',
    status: 'available',
    date: '2024-01-14',
    time: '10:15',
    rating: 4,
  },
  {
    id: '3',
    from: 'Parklands',
    to: 'Lavington',
    distance: '8.5 km',
    payment: 'KSh 420',
    packageType: 'Electronics',
    estimatedTime: '18 mins',
    status: 'available',
    date: '2024-01-13',
    time: '16:45',
    rating: 5,
  },
  {
    id: '4',
    from: 'Gigiri',
    to: 'Runda',
    distance: '6.8 km',
    payment: 'KSh 300',
    packageType: 'Fragile Item',
    estimatedTime: '20 mins',
    status: 'available',
    date: '2024-01-12',
    time: '09:20',
    rating: null,
  },
];

const DeliveryContext = createContext<DeliveryContextType | null>(null);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);

  const acceptDelivery = (id: string) => {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, status: 'accepted' } : d));
  };

  const completeDelivery = (id: string) => {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, status: 'completed' } : d));
  };

  const cancelDelivery = (id: string) => {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, status: 'cancelled' } : d));
  };

  return (
    <DeliveryContext.Provider value={{ deliveries, acceptDelivery, completeDelivery, cancelDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDeliveryContext(): DeliveryContextType {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error('useDeliveryContext must be used within a DeliveryProvider');
  return ctx;
} 