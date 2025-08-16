import AdminLoginForm from '@/components/auth/AdminLoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
