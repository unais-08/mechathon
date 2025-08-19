import { useState } from 'react';
import { HandHeart, Check, X } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const initialRequests = [
  {
    id: 1,
    company: 'BlueOcean Inc.',
    amount: '$3,000',
    date: '2025-08-15',
  },
  {
    id: 2,
    company: 'CloudSprint',
    amount: '$5,000',
    date: '2025-08-12',
  },
];

const SponsorRequestsList = () => {
  const [sponsorRequests, setSponsorRequests] = useState(initialRequests);

  const handleSponsorAction = (id, action) => {
    setSponsorRequests((prev) => prev.filter((req) => req.id !== id));
    console.log(`${action.toUpperCase()} sponsor request ID:`, id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sponsor Requests</h2>
        <p className="text-muted-foreground">Review and manage sponsorship applications.</p>
      </div>

      {sponsorRequests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <HandHeart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No pending requests</h3>
              <p className="text-sm text-muted-foreground">
                All sponsor requests have been reviewed.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sponsorRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold leading-none tracking-tight">{request.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      Sponsorship Amount: {request.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">Submitted on {request.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSponsorAction(request.id, 'approve')}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 h-10 w-10"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSponsorAction(request.id, 'reject')}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 h-10 w-10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SponsorRequestsList;
