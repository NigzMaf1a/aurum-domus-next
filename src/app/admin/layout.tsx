// app/admin/layout.tsx
//import AdminNav from '@/components/navs/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
       {/* Always present <AdminNav /> */}
      <main className="p-3" style={{ marginLeft: '220px' }}>
        {children}
      </main>
    </div>
  );
}
