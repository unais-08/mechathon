import AdminRegisterForm from '@/components/admin/auth/AdminRegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div>
        <AdminRegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
