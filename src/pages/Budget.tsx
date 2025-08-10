import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Target, DollarSign, TrendingUp, Edit2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BudgetCategory {
  id: string
  name: string
  budget: number
  spent: number
  icon: string
  color: string
}

const initialBudgets: BudgetCategory[] = [
  { id: '1', name: 'Food & Dining', budget: 300, spent: 180, icon: '🍽️', color: 'bg-orange-500' },
  { id: '2', name: 'Transportation', budget: 150, spent: 95, icon: '🚗', color: 'bg-blue-500' },
  { id: '3', name: 'Entertainment', budget: 100, spent: 85, icon: '🎬', color: 'bg-purple-500' },
  { id: '4', name: 'Shopping', budget: 200, spent: 250, icon: '🛍️', color: 'bg-pink-500' },
  { id: '5', name: 'Utilities', budget: 120, spent: 75, icon: '⚡', color: 'bg-yellow-500' },
  { id: '6', name: 'Healthcare', budget: 80, spent: 45, icon: '🏥', color: 'bg-green-500' },
]

export default function Budget() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const { toast } = useToast()

  const totalBudget = budgets.reduce((sum, category) => sum + category.budget, 0)
  const totalSpent = budgets.reduce((sum, category) => sum + category.spent, 0)
  const totalPercentage = (totalSpent / totalBudget) * 100

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-destructive'
    if (percentage >= 80) return 'bg-warning'
    return 'bg-success'
  }

  const getProgressStatus = (percentage: number) => {
    if (percentage >= 100) return 'Over Budget'
    if (percentage >= 80) return 'Near Limit'
    return 'On Track'
  }

  const handleEditBudget = (id: string, currentBudget: number) => {
    setEditingId(id)
    setEditValue(currentBudget.toString())
  }

  const handleSaveBudget = (id: string) => {
    const newBudget = parseFloat(editValue)
    if (isNaN(newBudget) || newBudget <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget amount.",
        variant: "destructive"
      })
      return
    }

    setBudgets(prev => 
      prev.map(budget => 
        budget.id === id ? { ...budget, budget: newBudget } : budget
      )
    )

    setEditingId(null)
    setEditValue('')

    toast({
      title: "Budget updated",
      description: "Your budget has been successfully updated.",
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const overBudgetCategories = budgets.filter(b => (b.spent / b.budget) * 100 >= 100)
  const nearLimitCategories = budgets.filter(b => {
    const percentage = (b.spent / b.budget) * 100
    return percentage >= 80 && percentage < 100
  })

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Budget Tracker
        </h1>
        <p className="text-muted-foreground">
          Set and monitor your monthly spending limits across categories
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalBudget}</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalSpent}</div>
            <p className="text-xs text-muted-foreground">
              {totalPercentage.toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ${Math.max(0, totalBudget - totalSpent)}
            </div>
            <p className="text-xs text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Overall Budget Progress</CardTitle>
          <CardDescription>Your total spending across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress: ${totalSpent} / ${totalBudget}</span>
              <span className="font-medium">{totalPercentage.toFixed(1)}%</span>
            </div>
            <Progress 
              value={Math.min(totalPercentage, 100)} 
              className="h-3"
            />
            <div className="flex justify-between items-center">
              <Badge 
                variant={totalPercentage >= 100 ? "destructive" : totalPercentage >= 80 ? "default" : "secondary"}
              >
                {getProgressStatus(totalPercentage)}
              </Badge>
              {totalPercentage >= 80 && (
                <div className="flex items-center gap-1 text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Budget Alert</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {(overBudgetCategories.length > 0 || nearLimitCategories.length > 0) && (
        <div className="space-y-4">
          {overBudgetCategories.length > 0 && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Over Budget Alert
                </CardTitle>
                <CardDescription>
                  The following categories have exceeded their budget limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {overBudgetCategories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-2 bg-destructive/10 rounded-lg">
                      <span className="font-medium">{category.icon} {category.name}</span>
                      <span className="text-destructive font-semibold">
                        ${category.spent} / ${category.budget} (Over by ${category.spent - category.budget})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {nearLimitCategories.length > 0 && (
            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="text-warning flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Near Limit Warning
                </CardTitle>
                <CardDescription>
                  These categories are approaching their budget limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {nearLimitCategories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-2 bg-warning/10 rounded-lg">
                      <span className="font-medium">{category.icon} {category.name}</span>
                      <span className="text-warning font-semibold">
                        ${category.spent} / ${category.budget} ({((category.spent / category.budget) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Budget Categories */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Category Budgets</CardTitle>
          <CardDescription>Manage your spending limits for each category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {budgets.map((category) => {
              const percentage = (category.spent / category.budget) * 100
              const isEditing = editingId === category.id

              return (
                <div 
                  key={category.id}
                  className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${category.spent} / ${category.budget}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 h-8"
                            placeholder="Budget"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveBudget(category.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Badge 
                            variant={percentage >= 100 ? "destructive" : percentage >= 80 ? "default" : "secondary"}
                          >
                            {percentage.toFixed(1)}%
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditBudget(category.id, category.budget)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${getProgressColor(percentage)}`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{getProgressStatus(percentage)}</span>
                      <span>
                        {percentage >= 100 
                          ? `Over by $${(category.spent - category.budget).toFixed(2)}`
                          : `$${(category.budget - category.spent).toFixed(2)} remaining`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}