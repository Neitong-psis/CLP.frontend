import BrandPanel from './_components/BrandPanel';
import LoginCard from './_components/LoginCard';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
      <BrandPanel />
      <LoginCard />
    </div>
  );
}
