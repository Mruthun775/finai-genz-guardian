import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Trash2, 
  Moon, 
  Sun, 
  Shield, 
  Database, 
  Bell,
  AlertTriangle,
  Settings as SettingsIcon,
  User,
  Smartphone
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [subscriptionReminders, setSubscriptionReminders] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const { toast } = useToast()

  const handleExportData = () => {
    // Simulate CSV export
    const csvData = [
      ['Date', 'Vendor', 'Amount', 'Type', 'Category', 'Mode'],
      ['2024-01-15', 'Starbucks', '4.50', 'Debit', 'Food', 'Card'],
      ['2024-01-14', 'Netflix', '15.99', 'Debit', 'Entertainment', 'Auto-debit'],
      ['2024-01-13', 'Salary', '3000.00', 'Credit', 'Income', 'Bank Transfer'],
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'finai_transactions.csv'
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Your transaction data has been exported to CSV.",
    })
  }

  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "All uploaded messages and transactions have been removed.",
      variant: "destructive"
    })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    toast({
      title: `${darkMode ? 'Light' : 'Dark'} mode enabled`,
      description: `Switched to ${darkMode ? 'light' : 'dark'} theme.`,
    })
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your FinAI experience and manage your data
        </p>
      </div>

      {/* Profile Section */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Manage your account and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts about your financial activities
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="budget-alerts">Budget Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when approaching spending limits
              </p>
            </div>
            <Switch
              id="budget-alerts"
              checked={budgetAlerts}
              onCheckedChange={setBudgetAlerts}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="subscription-reminders">Subscription Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Alerts for upcoming subscription renewals
              </p>
            </div>
            <Switch
              id="subscription-reminders"
              checked={subscriptionReminders}
              onCheckedChange={setSubscriptionReminders}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export, backup, and manage your financial data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Export Transactions</Label>
              <p className="text-sm text-muted-foreground">
                Download all your transactions as a CSV file
              </p>
            </div>
            <Button 
              onClick={handleExportData}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow anonymous data sharing for insights improvement
              </p>
            </div>
            <Switch
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-destructive">Clear All Data</Label>
              <p className="text-sm text-muted-foreground">
                Remove all uploaded messages and transaction data
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleClearData}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Your data protection and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm">End-to-end encryption enabled</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm">Local data processing</span>
              <Badge variant="secondary">Secure</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-sm">Two-factor authentication</span>
              <Badge variant="outline">Recommended</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Integration */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Integration
          </CardTitle>
          <CardDescription>
            Connect your mobile device for enhanced features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>SMS Permissions</Label>
              <p className="text-sm text-muted-foreground">
                Allow automatic SMS reading for Android devices
              </p>
            </div>
            <Button variant="outline">
              Configure
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync new transactions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Support & Feedback
          </CardTitle>
          <CardDescription>
            Get help and share your thoughts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <span className="font-medium">Contact Support</span>
              <span className="text-xs text-muted-foreground">Get help with your account</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <span className="font-medium">Send Feedback</span>
              <span className="text-xs text-muted-foreground">Help us improve FinAI</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}