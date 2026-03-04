import type { Metadata } from 'next';
import AuthProtectedComponent from '@/router/protected/auth-protected.component';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <AuthProtectedComponent>
          {children}
        </AuthProtectedComponent>
      </>
  );
}
