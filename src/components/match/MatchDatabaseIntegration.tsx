
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/hooks/useDatabase';
import { useMatch } from '@/services/cricketApi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { storeMatchData } from '@/utils/notificationUtils';
import { syncMatchToFirebase, logMatchActivity } from '@/utils/matchUtils';

// Define types for our Firestore data
interface UserMatch {
  matchId: string;
  userId: string;
  notes: string;
  favorite: boolean;
  createdAt: string;
}

interface MatchDatabaseIntegrationProps {
  matchId?: string;
}

const MatchDatabaseIntegration = ({ matchId }: MatchDatabaseIntegrationProps) => {
  const currentMatchId = matchId || "";
  const { currentUser } = useAuth();
  const userId = currentUser?.uid || "";
  
  // State for notes
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Use our Firebase hook with real-time updates
  const {
    createDocument,
    updateDocument,
    useRealtimeDocument,
    isCreating,
    isUpdating
  } = useFirestore<UserMatch>("userMatches");
  
  // Get match data from Cricket API
  const { data: matchData, isLoading: isMatchLoading } = useMatch(currentMatchId);
  
  // Get user's match data from Firestore in real-time
  const { 
    data: userMatchData, 
    loading: isUserMatchLoading 
  } = useRealtimeDocument(userId ? `${userId}_${currentMatchId}` : undefined);
  
  // Update state when userMatchData is loaded
  useEffect(() => {
    if (userMatchData) {
      setNotes(userMatchData.notes || "");
      setIsFavorite(userMatchData.favorite || false);
    }
  }, [userMatchData]);

  // Toast hook
  const { toast } = useToast();

  // Save match data to Firebase
  const saveMatchToFirebase = async () => {
    if (!currentUser || !matchData) return;
    
    try {
      const success = await storeMatchData(currentUser.uid, currentMatchId, matchData);
      
      if (success) {
        toast({
          title: "Match Saved",
          description: "Match data has been saved to your profile."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save match data.",
        variant: "destructive"
      });
    }
  };

  // Sync full match data to Firebase collection
  const handleSyncToFirebase = async () => {
    if (!currentUser || !matchData) return;
    
    try {
      await syncMatchToFirebase(currentUser.uid, matchData);
      
      toast({
        title: "Match Synced",
        description: "Match data has been synced to Firebase."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync match data.",
        variant: "destructive"
      });
    }
  };
  
  // Save or update notes
  const handleSaveNotes = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save notes.",
        variant: "destructive"
      });
      return;
    }
    
    const data: UserMatch = {
      matchId: currentMatchId,
      userId: currentUser.uid,
      notes,
      favorite: isFavorite,
      createdAt: new Date().toISOString()
    };
    
    try {
      if (userMatchData) {
        await updateDocument({ 
          id: `${currentUser.uid}_${currentMatchId}`, 
          data: { notes, favorite: isFavorite } 
        });
        
        // Log activity
        if (matchData) {
          await logMatchActivity(
            currentUser.uid,
            currentMatchId,
            matchData.title,
            'note',
            'Updated match notes'
          );
        }
        
        toast({
          title: "Notes Updated",
          description: "Your match notes have been updated successfully."
        });
      } else {
        await createDocument(
          data, 
          `${currentUser.uid}_${currentMatchId}`
        );
        
        // Log activity
        if (matchData) {
          await logMatchActivity(
            currentUser.uid,
            currentMatchId,
            matchData.title,
            'note',
            'Created match notes'
          );
        }
        
        toast({
          title: "Notes Created",
          description: "Your match notes have been saved successfully."
        });
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes.",
        variant: "destructive"
      });
    }
  };
  
  // Toggle favorite status
  const toggleFavorite = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to favorite matches.",
        variant: "destructive"
      });
      return;
    }
    
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    try {
      if (userMatchData) {
        await updateDocument({ 
          id: `${currentUser.uid}_${currentMatchId}`, 
          data: { favorite: newFavoriteStatus } 
        });
        
        // Log activity
        if (matchData) {
          await logMatchActivity(
            currentUser.uid,
            currentMatchId,
            matchData.title,
            'favorite',
            newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites'
          );
        }
        
        toast({
          title: newFavoriteStatus ? "Added to Favorites" : "Removed from Favorites",
          description: newFavoriteStatus 
            ? "This match has been added to your favorites." 
            : "This match has been removed from your favorites."
        });
      } else {
        // Create a new document if one doesn't exist
        const data: UserMatch = {
          matchId: currentMatchId,
          userId: currentUser.uid,
          notes: notes,
          favorite: newFavoriteStatus,
          createdAt: new Date().toISOString()
        };
        
        await createDocument(
          data, 
          `${currentUser.uid}_${currentMatchId}`
        );
        
        // Log activity
        if (matchData) {
          await logMatchActivity(
            currentUser.uid,
            currentMatchId,
            matchData.title,
            'favorite',
            newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites'
          );
        }
        
        toast({
          title: "Added to Favorites",
          description: "This match has been added to your favorites."
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      // Revert state on error
      setIsFavorite(!newFavoriteStatus);
      
      toast({
        title: "Error",
        description: "Failed to update favorite status.",
        variant: "destructive"
      });
    }
  };
  
  const isLoading = isMatchLoading || isUserMatchLoading;
  const isSaving = isCreating || isUpdating;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Match Details</span>
            {currentUser && matchData && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSyncToFirebase}
                aria-label="Sync match to Firebase"
              >
                Sync to Firebase
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="space-y-4">
              {matchData ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{matchData.title}</h3>
                    <div className="space-x-2">
                      <Button
                        variant={isFavorite ? "default" : "outline"}
                        onClick={toggleFavorite}
                        disabled={!currentUser}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isFavorite ? "Favorited" : "Add to Favorites"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={saveMatchToFirebase}
                        disabled={!currentUser || !matchData}
                        aria-label="Save match data"
                      >
                        Save Match Data
                      </Button>
                    </div>
                  </div>
                  
                  {matchData.score && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team</TableHead>
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{matchData.teams.home}</TableCell>
                          <TableCell>{matchData.score.home}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{matchData.teams.away}</TableCell>
                          <TableCell>{matchData.score.away}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="block font-medium">
                      Your Notes
                    </label>
                    <Textarea
                      id="notes"
                      rows={4}
                      className="w-full resize-none border-input focus:border-primary"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add your notes about this match..."
                      disabled={!currentUser}
                    />
                    <Button 
                      onClick={handleSaveNotes} 
                      disabled={isSaving || !currentUser}
                      aria-label="Save notes"
                      className="mt-2"
                    >
                      {isSaving ? "Saving..." : "Save Notes"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p>No match data available. This could be because:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>The match ID is invalid</li>
                    <li>The Cricket API is unavailable</li>
                    <li>There was an error fetching the match data</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDatabaseIntegration;
