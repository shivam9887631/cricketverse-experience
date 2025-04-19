
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMatch } from '@/services/cricketApi';
import MatchDatabaseIntegration from '@/components/match/MatchDatabaseIntegration';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { addNotification } from '@/services/notificationService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MatchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { data: matchData, isLoading } = useMatch(id || '');
  
  useEffect(() => {
    // Send a notification when user views match details
    if (currentUser && id) {
      const notifyMatchView = async () => {
        try {
          await addNotification({
            userId: currentUser.uid,
            title: 'Match Viewed',
            message: `You viewed match with ID: ${id}`,
            type: 'info',
            isRead: false,
            createdAt: new Date()
          });
        } catch (error) {
          console.error('Failed to create notification:', error);
        }
      };
      
      notifyMatchView();
    }
  }, [currentUser, id]);
  
  if (!id) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center p-8 bg-muted rounded-lg">
            <h2 className="text-xl font-bold mb-2">Match ID Not Found</h2>
            <p className="mb-4">No match ID was provided in the URL.</p>
            <Button asChild>
              <Link to="/">Go to Matches List</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Match Details</h1>
          <Button variant="outline" asChild>
            <Link to="/">Back to Matches</Link>
          </Button>
        </div>
        
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ) : matchData ? (
          <Card className="mb-6 transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{matchData.title}</span>
                <Badge variant={
                  matchData.status === 'Live' ? 'destructive' : 
                  matchData.status === 'Completed' ? 'secondary' : 
                  'outline'
                }>
                  {matchData.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{matchData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-medium">{matchData.venue || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Series</p>
                  <p className="font-medium">{matchData.series || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Match Type</p>
                  <p className="font-medium">{matchData.matchType || 'Not specified'}</p>
                </div>
              </div>
              
              {matchData.result && (
                <div className="mb-4 p-3 bg-muted rounded-md">
                  <p className="font-semibold">{matchData.result}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="p-6 border rounded-lg shadow-sm bg-destructive/10 text-center">
            <h2 className="text-xl font-bold mb-2">Error Loading Match</h2>
            <p>Unable to load match data for ID: {id}</p>
            <Button className="mt-4" asChild>
              <Link to="/">Return to Matches</Link>
            </Button>
          </div>
        )}
        
        <MatchDatabaseIntegration matchId={id} />
      </div>
    </Layout>
  );
};

export default MatchDetails;
