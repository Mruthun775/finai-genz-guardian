import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  AlertTriangle, 
  CreditCard,
  Target,
  Calendar,
  DollarSign,
  Shield,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from "@/assets/finai-hero.jpg"

const Index = () => {
  const [currentBalance, setCurrentBalance] = useState(2847.32)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const recentTransactions = [
    { id: 1, vendor: "Starbucks", amount: -4.50, type: "debit", time: "2 hours ago" },
    { id: 2, vendor: "Paycheck", amount: 2500.00, type: "credit", time: "1 day ago" },
    { id: 3, vendor: "Netflix", amount: -15.99, type: "debit", time: "2 days ago" },
  ]

  const upcomingSubscriptions = [
    { name: "Spotify Premium", amount: 9.99, date: "Jan 25", color: "bg-green-500" },
    { name: "Adobe Creative", amount: 52.99, date: "Jan 28", color: "bg-red-500" },
    { name: "Netflix", amount: 15.99, date: "Feb 1", color: "bg-red-600" },
  ]

  const budgetProgress = [
    { category: "Food", spent: 180, budget: 300, percentage: 60 },
    { category: "Transport", spent: 95, budget: 150, percentage: 63 },
    { category: "Entertainment", spent: 85, budget: 100, percentage: 85 },
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{greeting}, John!</h1>
                <p className="text-white/80">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 border-white/30">
              <Bell className="h-4 w-4 mr-2" />
              3 Alerts
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                FinAI: Your Financial Guardian
              </h2>
              <p className="text-lg text-white/90 max-w-2xl">
                Smart insights, automated tracking, and AI-powered budgeting to help you master your finances.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link to="/upload">
                <Button className="bg-white text-primary hover:bg-white/90">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Tracking
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Analytics
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-primary">
                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success font-medium">+12.5%</span>
                  <span className="text-sm text-muted-foreground">this month</span>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  Healthy
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$735.48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Alerts */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Risk Alerts
            </CardTitle>
            <CardDescription>
              Important notifications about your finances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-warning">Budget Alert</p>
                <p className="text-sm text-muted-foreground">
                  Entertainment spending is at 85% of monthly limit
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <Shield className="h-4 w-4 text-destructive mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-destructive">Unusual Activity</p>
                <p className="text-sm text-muted-foreground">
                  Large transaction detected: $150 at unknown merchant
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-primary">Savings Goal</p>
                <p className="text-sm text-muted-foreground">
                  You're ahead of your monthly savings target by $125
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Subscriptions */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Subscriptions
            </CardTitle>
            <CardDescription>
              Your recurring payments this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSubscriptions.map((subscription, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${subscription.color}`} />
                  <div>
                    <p className="font-medium">{subscription.name}</p>
                    <p className="text-sm text-muted-foreground">Due {subscription.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-destructive">
                  ${subscription.amount}
                </span>
              </div>
            ))}

            <Link to="/budget">
              <Button variant="outline" className="w-full mt-3">
                <Target className="h-4 w-4 mr-2" />
                Manage Subscriptions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Overview
          </CardTitle>
          <CardDescription>
            Your spending progress across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {budgetProgress.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <span>${budget.spent} / ${budget.budget}</span>
                </div>
                <Progress 
                  value={budget.percentage} 
                  className={`h-2 ${
                    budget.percentage >= 90 ? 'bg-destructive' : 
                    budget.percentage >= 70 ? 'bg-warning' : 'bg-success'
                  }`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{budget.percentage}% used</span>
                  <span>${budget.budget - budget.spent} remaining</span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/budget">
            <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
              <DollarSign className="h-4 w-4 mr-2" />
              View Full Budget
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest financial activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'credit' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <div>
                    <p className="font-medium">{transaction.vendor}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Link to="/analytics">
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
