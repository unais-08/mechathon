import { Card, CardContent } from '@/components/ui/card';

// Dummy data
const dummySponsors = [
  {
    id: 1,
    company: 'Tech Corp',
    amount: '$10,000',
    date: '2021',
    tier: 'Gold',
  },
  {
    id: 2,
    company: 'Green Innovations',
    amount: '$5,000',
    date: '2022',
    tier: 'Silver',
  },
  {
    id: 3,
    company: 'AI Ventures',
    amount: '$8,000',
    date: '2023',
    tier: 'Gold',
  },
];

const SponsorsList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Current Sponsors</h2>
        <p className="text-muted-foreground">View and manage your club's sponsors.</p>
      </div>

      <div className="space-y-4">
        {dummySponsors.map((sponsor) => (
          <Card key={sponsor.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none tracking-tight">{sponsor.company}</h3>
                  <p className="text-sm text-muted-foreground">Contribution: {sponsor.amount}</p>
                  <p className="text-xs text-muted-foreground">Partnership since {sponsor.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      sponsor.tier === 'Gold'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}
                  >
                    {sponsor.tier} Sponsor
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SponsorsList;
