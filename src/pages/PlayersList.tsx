
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePlayers } from '@/services/cricketApi';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// Player images mapping with actual cricket player images
const playerImages = {
  'Virat Kohli': 'https://resources.pulse.icc-cricket.com/ICC/photo/2023/11/24/1aeabc3f-9d60-48d8-b5c9-d9cf34ae0f43/GettyImages-1235363734.jpg',
  'Rohit Sharma': 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319700/319702.png',
  'MS Dhoni': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiANpXkWX5qE-HV22qNXLhCbaiB5iN6KeDJn2lj3AYxQ&s',
  'KL Rahul': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYdVGGKsS4eEtq4aqLOoRxW-o5H2mSuaXDGqLBdw-8A&s',
  'Jasprit Bumrah': 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319938.png',
  'Ravindra Jadeja': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfpGiZxKsb-iLCK7HALIAGXg_JJcx04Vvbf0v9S7B&s'
};

const PlayersList = () => {
  const { data: players, isLoading, error } = usePlayers();

  // Mock data for players if API fails
  const mockPlayers = [
    {
      id: '1',
      name: 'Virat Kohli',
      team: 'Royal Challengers',
      stats: { matches: 250, runs: 12000, wickets: 4, average: 49.95 }
    },
    {
      id: '2',
      name: 'Rohit Sharma',
      team: 'Mumbai Indians',
      stats: { matches: 230, runs: 10500, wickets: 2, average: 45.65 }
    },
    {
      id: '3',
      name: 'Jasprit Bumrah',
      team: 'Mumbai Indians',
      stats: { matches: 150, runs: 200, wickets: 250, average: 22.15 }
    },
    {
      id: '4',
      name: 'MS Dhoni',
      team: 'Chennai Super Kings',
      stats: { matches: 280, runs: 5500, wickets: 0, average: 38.75 }
    },
    {
      id: '5',
      name: 'Ravindra Jadeja',
      team: 'Chennai Super Kings',
      stats: { matches: 220, runs: 3200, wickets: 180, average: 31.25 }
    },
    {
      id: '6',
      name: 'KL Rahul',
      team: 'Lucknow Super Giants',
      stats: { matches: 180, runs: 8500, wickets: 0, average: 47.22 }
    },
  ];

  const displayPlayers = players || mockPlayers;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">Browse all cricket players</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-destructive">Error loading players: {error.toString()}</p>
              <p className="text-center">Showing sample data instead</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPlayers.map((player, idx) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={playerImages[player.name as keyof typeof playerImages] || `https://resources.pulse.icc-cricket.com/ICC/photo/2023/10/01/5c89ea63-9ac8-49a1-88af-fe194f9b86a1/GettyImages-1243278328.jpg`} 
                          alt={player.name}
                        />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{player.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mt-1">
                            {player.team}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Matches</p>
                        <p className="text-2xl">{player.stats.matches}</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Runs</p>
                        <p className="text-2xl">{player.stats.runs}</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Wickets</p>
                        <p className="text-2xl">{player.stats.wickets}</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Average</p>
                        <p className="text-2xl">{player.stats.average}</p>
                      </div>
                    </div>
                    <Button asChild className="w-full mt-4" variant="outline">
                      <Link to={`/players/${player.id}`}>View Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PlayersList;
