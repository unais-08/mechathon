import { Plus, Users, Eye } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions = ({ setActiveTab, sponsorRequests }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button
              onClick={() => setActiveTab('blogs')}
              variant="outline"
              className="justify-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
            <Button
              onClick={() => setActiveTab('requests')}
              variant="outline"
              className="justify-start"
            >
              <Eye className="h-4 w-4 mr-2" />
              Review Requests
              {sponsorRequests.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {sponsorRequests.length}
                </span>
              )}
            </Button>
            <Button
              onClick={() => setActiveTab('sponsors')}
              variant="outline"
              className="justify-start"
            >
              <Users className="h-6 w-6 mr-2" />
              Manage Sponsors
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default QuickActions;
