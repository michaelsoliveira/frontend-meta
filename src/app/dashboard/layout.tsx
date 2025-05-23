import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import { ReactQueryClientProvider } from '@/components/providers/react-query-client-provider';

export const metadata: Metadata = {
  title: 'Ambiental - Consultoria e Serviços ',
  description: 'Dashboard sistema de gerenciamento de condicionantes ambientais'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      {children}
    </ReactQueryClientProvider>
  );
}
