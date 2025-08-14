import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data: res } = await axios.get('/history');
        console.log('Fetched history:', res);
        setHistory(res.data || []);
      } catch (err) {
        setError('Failed to fetch hackathon history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      {history.length === 0 ? (
        <p className="text-muted-foreground">No hackathon history found.</p>
      ) : (
        history.map((entry) => (
          <Card key={entry.id} className="shadow-md">
            <CardContent className="py-6 space-y-2">
              <h2 className="text-xl font-semibold">{entry.title}</h2>
              <p className="text-muted-foreground text-sm">Year: {entry.year}</p>
              <p>
                <span className="font-medium">Team:</span> {entry.team_name}
              </p>
              <p>
                <span className="font-medium">Position:</span> #{entry.position}
              </p>
              <p>
                <span className="font-medium">Project:</span> {entry.project_title}
              </p>
              <p className="text-sm text-gray-700">{entry.description}</p>
              <p className="text-xs text-gray-400 text-right">
                Posted on {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default HistoryPage;
