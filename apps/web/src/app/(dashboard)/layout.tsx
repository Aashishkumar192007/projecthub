import MasterLayout from '@/components/layout/MasterLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MasterLayout>{children}</MasterLayout>;
}
