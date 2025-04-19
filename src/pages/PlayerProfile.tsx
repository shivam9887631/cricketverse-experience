
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  User, 
  Trophy, 
  BarChart, 
  Flag, 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp, 
  Activity,
  Calendar as CalendarIcon,
  PieChart,
  BarChart2,
  LineChart,
  Instagram,
  Twitter,
  Facebook,
  Bookmark,
  Share2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Player image mapping with unique images for each player
const playerImages = {
  'Virat Kohli': 'https://images.unsplash.com/photo-1593466144117-2d94837761a6?q=80&w=400&auto=format&fit=crop',
  'MS Dhoni': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&auto=format&fit=crop',
  'Rohit Sharma': 'https://images.unsplash.com/photo-1500280366556-a51583fd952f?q=80&w=400&auto=format&fit=crop',
  'KL Rahul': 'https://images.unsplash.com/photo-1546518071-fddcdda7580a?q=80&w=400&auto=format&fit=crop',
  'Jasprit Bumrah': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=400&auto=format&fit=crop',
  'Ravindra Jadeja': 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?q=80&w=400&auto=format&fit=crop'
};

// Mock player data
const players = [
  {
    id: '1',
    name: 'Virat Kohli',
    nickname: 'King Kohli',
    image: playerImages['Virat Kohli'],
    role: 'Batsman',
    battingStyle: 'Right-handed',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1988-11-05',
    age: 34,
    hometown: 'Delhi, India',
    team: 'Royal Challengers',
    jerseyNumber: 18,
    stats: {
      matches: 215,
      innings: 207,
      runs: 6624,
      average: 36.2,
      strikeRate: 129.8,
      centuries: 5,
      fifties: 44,
      sixes: 227,
      fours: 578,
      highestScore: 113,
      wickets: 4,
      economy: 8.8
    },
    achievements: [
      'Orange Cap winner - 2016',
      'Most runs in a single IPL season - 973 runs',
      'Most centuries in IPL history',
      'Most MVP awards in IPL'
    ],
    recentPerformances: [
      { match: 'vs Mumbai Indians', runs: 73, balls: 54, fours: 5, sixes: 2, date: '2023-04-02', wickets: 0 },
      { match: 'vs Chennai Super Kings', runs: 6, balls: 4, fours: 1, sixes: 0, date: '2023-03-28', wickets: 0 },
      { match: 'vs Delhi Capitals', runs: 50, balls: 34, fours: 4, sixes: 2, date: '2023-03-25', wickets: 0 },
      { match: 'vs Rajasthan Royals', runs: 82, balls: 47, fours: 7, sixes: 4, date: '2023-03-21', wickets: 0 },
      { match: 'vs Punjab Kings', runs: 29, balls: 26, fours: 3, sixes: 0, date: '2023-03-17', wickets: 0 },
    ],
    tournaments: [
      { name: 'IPL', seasons: 15, matches: 215, runs: 6624 },
      { name: 'BCCI Corporate Trophy', seasons: 3, matches: 12, runs: 387 },
      { name: 'Syed Mushtaq Ali Trophy', seasons: 2, matches: 8, runs: 243 }
    ],
    bio: "Virat Kohli is an Indian international cricketer and the former captain of the Indian national cricket team. He is widely regarded as one of the greatest batsmen of all time and the most successful captain in India's Test cricket history. Kohli is a right-handed batsman who has set numerous batting records and is considered the best chaser in limited-overs cricket."
  },
  {
    id: '2',
    name: 'MS Dhoni',
    nickname: 'Captain Cool',
    image: playerImages['MS Dhoni'],
    role: 'Wicketkeeper-Batsman',
    battingStyle: 'Right-handed',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1981-07-07',
    age: 41,
    hometown: 'Ranchi, India',
    team: 'Chennai Super Kings',
    jerseyNumber: 7,
    stats: {
      matches: 234,
      innings: 206,
      runs: 4982,
      average: 39.2,
      strikeRate: 135.2,
      centuries: 0,
      fifties: 24,
      sixes: 229,
      fours: 346,
      highestScore: 84,
      wickets: 0,
      economy: 0,
      stumpings: 39,
      catches: 132
    },
    achievements: [
      'Most matches as captain in IPL history',
      'Most consecutive IPL playoff qualifications as captain',
      'First captain to win the IPL trophy 4 times',
      'Most stumpings in IPL history'
    ],
    recentPerformances: [
      { match: 'vs Gujarat Titans', runs: 32, balls: 21, fours: 2, sixes: 2, date: '2023-04-03', wickets: 0 },
      { match: 'vs Kolkata Knight Riders', runs: 15, balls: 12, fours: 1, sixes: 1, date: '2023-03-29', wickets: 0 },
      { match: 'vs Rajasthan Royals', runs: 46, balls: 28, fours: 3, sixes: 3, date: '2023-03-25', wickets: 0 },
      { match: 'vs Royal Challengers Bangalore', runs: 12, balls: 9, fours: 0, sixes: 1, date: '2023-03-21', wickets: 0 },
      { match: 'vs Sunrisers Hyderabad', runs: 21, balls: 13, fours: 2, sixes: 1, date: '2023-03-17', wickets: 0 },
    ],
    tournaments: [
      { name: 'IPL', seasons: 15, matches: 234, runs: 4982 },
      { name: 'Champions League T20', seasons: 2, matches: 14, runs: 192 },
      { name: 'BCCI Corporate Trophy', seasons: 1, matches: 3, runs: 85 }
    ],
    bio: "Mahendra Singh Dhoni is an Indian former international cricketer who was captain of the Indian national cricket team in limited-overs formats from 2007 to 2017 and in Test cricket from 2008 to 2014. He is the only captain in cricket history to win all ICC trophies. Under his captaincy, India won the 2007 ICC World Twenty20, the 2010 and 2016 Asia Cups, the 2011 ICC Cricket World Cup, and the 2013 ICC Champions Trophy."
  }
];

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundPlayer = players.find(p => p.id === id);
      setPlayer(foundPlayer || players[0]); // Fallback to first player if not found
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleFollow = () => {
    toast({
      title: `Following ${player.name}`,
      description: "You'll receive updates about this player.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Profile shared",
      description: "Player profile link copied to clipboard.",
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full animate-spin"></div>
            <User className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!player) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <User className="w-16 h-16 text-primary/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Player Not Found</h2>
          <p className="text-muted-foreground text-center">
            The player you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Player Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-xl overflow-hidden mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Image */}
          <div className="relative h-80 md:h-full overflow-hidden">
            <img 
              src={player.image || playerImages[player.name] || 'https://images.unsplash.com/photo-1569078449082-d264d9e239c5?q=80&w=400&auto=format&fit=crop'} 
              alt={player.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="px-2 py-1 text-xs rounded-full bg-primary inline-block mb-2">
                {player.role}
              </div>
              <h1 className="text-2xl font-bold">{player.name}</h1>
              <p className="text-sm opacity-80">{player.nickname}</p>
            </div>
          </div>
          
          {/* Player Info */}
          <div className="md:col-span-2 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold">{player.name}</h1>
                <p className="text-lg text-muted-foreground">{player.team}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleFollow}
                  className="btn-primary px-3 py-1.5 text-sm flex items-center"
                >
                  <Bookmark className="w-4 h-4 mr-1.5" />
                  Follow
                </button>
                <button
                  onClick={handleShare}
                  className="btn-outline px-3 py-1.5 text-sm flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-1.5" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Jersey</span>
                <span className="text-xl font-bold">#{player.jerseyNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Age</span>
                <span className="text-xl font-bold">{player.age}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Matches</span>
                <span className="text-xl font-bold">{player.stats.matches}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Runs</span>
                <span className="text-xl font-bold">{player.stats.runs}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-2">Born:</span>
                <span>{new Date(player.dateOfBirth).toLocaleDateString()} ({player.age} years)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-2">From:</span>
                <span>{player.hometown}</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-2">Batting:</span>
                <span>{player.battingStyle}</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-2">Bowling:</span>
                <span>{player.bowlingStyle}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-sm text-muted-foreground">
                {player.bio}
              </p>
            </div>
            
            <div className="mt-6 flex items-center space-x-4">
              <a href="#" className="rounded-full w-8 h-8 flex items-center justify-center bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="rounded-full w-8 h-8 flex items-center justify-center bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="rounded-full w-8 h-8 flex items-center justify-center bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Player Details */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
          <TabsTrigger value="stats" className="text-sm">Statistics</TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
          <TabsTrigger value="achievements" className="text-sm">Achievements</TabsTrigger>
          <TabsTrigger value="tournaments" className="text-sm">Tournaments</TabsTrigger>
          <TabsTrigger value="gallery" className="text-sm">Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart className="w-5 h-5 mr-2 text-primary" />
              Career Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-xl">
                <h4 className="text-sm text-muted-foreground mb-1">Matches</h4>
                <div className="text-3xl font-bold">{player.stats.matches}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Innings: {player.stats.innings}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h4 className="text-sm text-muted-foreground mb-1">Runs</h4>
                <div className="text-3xl font-bold">{player.stats.runs}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  HS: {player.stats.highestScore}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h4 className="text-sm text-muted-foreground mb-1">Average</h4>
                <div className="text-3xl font-bold">{player.stats.average}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  SR: {player.stats.strikeRate}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h4 className="text-sm text-muted-foreground mb-1">
                  {player.role === 'Wicketkeeper-Batsman' ? 'Dismissals' : '100s/50s'}
                </h4>
                <div className="text-3xl font-bold">
                  {player.role === 'Wicketkeeper-Batsman' 
                    ? (player.stats.catches || 0) + (player.stats.stumpings || 0)
                    : `${player.stats.centuries}/${player.stats.fifties}`
                  }
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {player.role === 'Wicketkeeper-Batsman' 
                    ? `C: ${player.stats.catches} | S: ${player.stats.stumpings}`
                    : `Boundaries: ${player.stats.fours}/${player.stats.sixes}`
                  }
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-semibold mb-4">Batting Record</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Strike Rate</span>
                    <span className="text-sm font-medium">{player.stats.strikeRate}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.stats.strikeRate / 200) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average</span>
                    <span className="text-sm font-medium">{player.stats.average}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.stats.average / 60) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cricket-blue/80 to-cricket-blue"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Boundaries per Innings</span>
                    <span className="text-sm font-medium">
                      {((player.stats.fours + player.stats.sixes) / player.stats.innings).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(((player.stats.fours + player.stats.sixes) / player.stats.innings) / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-cricket-green/80 to-cricket-green"
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-sm font-medium mb-3">Boundary Breakdown</h5>
                  <div className="glass-card p-3 rounded-lg text-center grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Fours</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.fours}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sixes</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.sixes}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-3">Career Milestones</h5>
                  <div className="glass-card p-3 rounded-lg text-center grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Centuries</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.centuries || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Fifties</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.fifties || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {player.role.toLowerCase().includes('wicketkeeper') && (
                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3">Wicketkeeping Stats</h5>
                  <div className="glass-card p-3 rounded-lg text-center grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Catches</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.catches}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stumpings</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.stumpings}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {player.stats.wickets > 0 && (
                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3">Bowling Stats</h5>
                  <div className="glass-card p-3 rounded-lg text-center grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Wickets</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.wickets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Economy</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.economy}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="performance">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Recent Performances
            </h3>
            
            <div className="glass-card p-6 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold">Form Chart</h4>
                <div className="text-sm text-muted-foreground">Last 5 matches</div>
              </div>
              
              <div className="relative h-40 mb-6">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-border"></div>
                <div className="absolute left-0 h-full flex items-end justify-around w-full">
                  {player.recentPerformances.map((perf, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(perf.runs / 100) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="relative w-12 bg-primary/20 rounded-t-md overflow-hidden group"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `100%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        className="absolute bottom-0 w-full bg-primary/40"
                        style={{ height: `${(perf.runs / perf.balls) * 100}%` }}
                      ></motion.div>
                      <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                        <span className="text-xs font-medium">{perf.runs}</span>
                      </div>
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        SR: {((perf.runs / perf.balls) * 100).toFixed(1)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                {player.recentPerformances.map((perf, index) => (
                  <div key={index} className="text-center">
                    <div className="truncate max-w-[60px]">{perf.match.split(' ')[1]}</div>
                    <div>{new Date(perf.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Match by Match</h4>
              
              {player.recentPerformances.map((perf, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{perf.match}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(perf.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Runs</p>
                      <p className="text-xl font-bold">{perf.runs}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Balls</p>
                      <p className="text-xl font-bold">{perf.balls}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">4s</p>
                      <p className="text-xl font-bold">{perf.fours}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">6s</p>
                      <p className="text-xl font-bold">{perf.sixes}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Strike Rate</span>
                      <span className="text-xs font-medium">
                        {((perf.runs / perf.balls) * 100).toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(((perf.runs / perf.balls) * 100) / 200) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary" />
              Achievements & Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="glass-card p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Major Achievements</h4>
                  <div className="space-y-4">
                    {player.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="glass-card p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Career Highlights</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Highest Score</span>
                        <span className="text-sm font-medium">{player.stats.highestScore}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(player.stats.highestScore / 150) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-cricket-blue"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Career Runs</span>
                        <span className="text-sm font-medium">{player.stats.runs}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(player.stats.runs / 10000) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-cricket-green"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Matches Played</span>
                        <span className="text-sm font-medium">{player.stats.matches}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(player.stats.matches / 300) * 100}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-cricket-navy"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="glass-card p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Career 6s</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.sixes}</p>
                    </div>
                    <div className="glass-card p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Career 4s</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.fours}</p>
                    </div>
                    <div className="glass-card p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Best SR</p>
                      <p className="text-2xl font-bold mt-1">{player.stats.strikeRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="tournaments">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Flag className="w-5 h-5 mr-2 text-primary" />
              Tournament Participation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {player.tournaments.map((tournament, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{tournament.name}</h4>
                      <p className="text-xs text-muted-foreground">{tournament.seasons} Seasons</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="glass-card p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Matches</p>
                      <p className="text-xl font-bold mt-1">{tournament.matches}</p>
                    </div>
                    <div className="glass-card p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Runs</p>
                      <p className="text-xl font-bold mt-1">{tournament.runs}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Avg. per Season</span>
                      <span className="text-xs font-medium">
                        {(tournament.runs / tournament.seasons).toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((tournament.runs / tournament.seasons) / 500) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-semibold mb-4">Tournament Comparison</h4>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Total Runs</span>
                  </div>
                  <div className="space-y-3">
                    {player.tournaments.map((tournament, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">{tournament.name}</span>
                          <span className="text-xs font-medium">{tournament.runs}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(tournament.runs / player.tournaments[0].runs) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            style={{ 
                              backgroundColor: index === 0 
                                ? '#3B82F6' 
                                : index === 1 
                                  ? '#10B981' 
                                  : '#EF4444' 
                            }}
                            className="h-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Matches Played</span>
                  </div>
                  <div className="space-y-3">
                    {player.tournaments.map((tournament, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">{tournament.name}</span>
                          <span className="text-xs font-medium">{tournament.matches}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(tournament.matches / player.tournaments[0].matches) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            style={{ 
                              backgroundColor: index === 0 
                                ? '#3B82F6' 
                                : index === 1 
                                  ? '#10B981' 
                                  : '#EF4444' 
                            }}
                            className="h-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="gallery">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4">Player Gallery</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <div className="h-60 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img 
                      src={`https://placehold.co/600x800/${index % 2 === 0 ? '3B82F6' : '10B981'}/FFFFFF/png?text=${player.name.split(' ')[0]}`} 
                      alt={`${player.name} action shot ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium">Action Shot {index + 1}</p>
                    <p className="text-xs text-muted-foreground mt-1">Tournament 2023</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="btn-outline mt-6">
                Load More Photos
              </button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PlayerProfile;
