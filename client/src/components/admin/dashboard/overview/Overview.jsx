import DashboardCards from '@/components/admin/dashboard/overview/OverviewCards';
import QuickActions from '@/components/admin/dashboard/overview/QuickActions';

const Overview = ({ blogs, sponsorRequests, sponsors, activeTab, setActiveTab }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back to your admin panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-4">
        <DashboardCards blogs={blogs} sponsorRequests={sponsorRequests} sponsors={sponsors} />
      </div>

      <div className="grid">
        <QuickActions
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sponsorRequests={sponsorRequests}
        />
      </div>
    </div>
  );
};

export default Overview;
