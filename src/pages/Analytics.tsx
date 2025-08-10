import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, CreditCard, AlertTriangle, Filter } from "lucide-react"

// Mock transaction data
const mockTransactions = [
  { id: 1, vendor: "Starbucks", amount: 4.50, type: "debit", category: "Food", date: "2024-01-15", mode: "Card" },
  { id: 2, vendor: "Netflix", amount: 15.99, type: "debit", category: "Entertainment", date: "2024-01-14", mode: "Auto-debit", isSubscription: true },
  { id: 3, vendor: "Salary", amount: 3000, type: "credit", category: "Income", date: "2024-01-13", mode: "Bank Transfer" },
  { id: 4, vendor: "Uber", amount: 12.30, type: "debit", category: "Transport", date: "2024-01-12", mode: "Card" },
  { id: 5, vendor: "Spotify", amount: 9.99, type: "debit", category: "Entertainment", date: "2024-01-11", mode: "Auto-debit", isSubscription: true },
]

const categoryData = [
  { name: 'Food', amount: 150, color: '#8b5cf6' },
  { name: 'Transport', amount: 80, color: '#06b6d4' },
  { name: 'Entertainment', amount: 50, color: '#f59e0b' },
  { name: 'Shopping', amount: 200, color: '#ef4444' },
]

const spendingTrend = [
  { month: 'Jan', amount: 800 },
  { month: 'Feb', amount: 900 },
  { month: 'Mar', amount: 750 },
  { month: 'Apr', amount: 1100 },
  { month: 'May', amount: 950 },
  { month: 'Jun', amount: 1050 },
]

export default function Analytics() {
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = mockTransactions.filter(transaction => {
    const categoryMatch = filterCategory === "all" || transaction.category.toLowerCase() === filterCategory.toLowerCase()
    const typeMatch = filterType === "all" || transaction.type === filterType
    return categoryMatch && typeMatch
  })

  const subscriptionCount = mockTransactions.filter(t => t.isSubscription).length

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your spending patterns and financial insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{filteredTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$482.78</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{subscriptionCount}</div>
            <p className="text-xs text-muted-foreground">
              Monthly recurring charges
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$96.56</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            onClick={() => {
              setFilterCategory("all")
              setFilterType("all")
            }}
            className="mt-7"
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Your expense breakdown this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Top Expenses</CardTitle>
            <CardDescription>Distribution of your spending categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="amount"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest financial activities ({filteredTransactions.length} transactions)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'credit' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <div>
                    <div className="font-medium">{transaction.vendor}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.mode} • {transaction.date}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={transaction.type === 'credit' ? 'default' : 'destructive'}>
                    {transaction.category}
                  </Badge>
                  {transaction.isSubscription && (
                    <Badge variant="outline">Subscription</Badge>
                  )}
                  <div className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}