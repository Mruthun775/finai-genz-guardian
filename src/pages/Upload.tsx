import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload as UploadIcon, FileText, Mail, CheckCircle, AlertCircle, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ParsedTransaction {
  amount: number
  vendor: string
  mode: string
  type: 'credit' | 'debit'
  balance: number
  date: string
  category?: string
  isSubscription?: boolean
}

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parsedTransactions, setParsedTransactions] = useState<ParsedTransaction[]>([])
  const [isGmailConnecting, setIsGmailConnecting] = useState(false)
  const { toast } = useToast()

  const simulateTransactionParsing = (fileContent: string): ParsedTransaction[] => {
    // Simulate SMS parsing with regex patterns
    const transactionPatterns = [
      {
        regex: /(?:spent|debited|paid)\s*(?:rs\.?|₹)\s*(\d+(?:\.\d{2})?)/i,
        type: 'debit' as const
      },
      {
        regex: /(?:credited|received|deposited)\s*(?:rs\.?|₹)\s*(\d+(?:\.\d{2})?)/i,
        type: 'credit' as const
      }
    ]

    // Mock parsed transactions based on common SMS patterns
    const mockTransactions: ParsedTransaction[] = [
      {
        amount: 25.50,
        vendor: "McDonald's",
        mode: "UPI",
        type: "debit",
        balance: 1847.30,
        date: new Date().toISOString().split('T')[0],
        category: "Food & Dining",
        isSubscription: false
      },
      {
        amount: 15.99,
        vendor: "Netflix",
        mode: "Auto-debit",
        type: "debit",
        balance: 1831.31,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        category: "Entertainment",
        isSubscription: true
      },
      {
        amount: 2500.00,
        vendor: "Salary Credit",
        mode: "NEFT",
        type: "credit",
        balance: 4331.31,
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        category: "Income",
        isSubscription: false
      }
    ]

    return mockTransactions
  }

  const predictCategory = (vendor: string): string => {
    // Simulate ML model prediction
    const categoryKeywords = {
      'Food & Dining': ['restaurant', 'food', 'cafe', 'mcdonald', 'starbucks', 'pizza'],
      'Transportation': ['uber', 'lyft', 'taxi', 'gas', 'fuel', 'metro'],
      'Entertainment': ['netflix', 'spotify', 'movie', 'cinema', 'game'],
      'Shopping': ['amazon', 'flipkart', 'mall', 'store', 'shop'],
      'Utilities': ['electricity', 'gas', 'water', 'internet', 'phone'],
      'Healthcare': ['pharmacy', 'hospital', 'doctor', 'medical'],
    }

    const vendorLower = vendor.toLowerCase()
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => vendorLower.includes(keyword))) {
        return category
      }
    }
    
    return 'Other'
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.txt')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt file containing SMS messages.",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file reading and processing
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target?.result as string
        
        // Simulate processing stages
        const stages = [
          { progress: 20, message: "Reading file content..." },
          { progress: 40, message: "Parsing SMS messages..." },
          { progress: 60, message: "Extracting transaction data..." },
          { progress: 80, message: "Applying ML predictions..." },
          { progress: 100, message: "Processing complete!" }
        ]

        for (const stage of stages) {
          await new Promise(resolve => setTimeout(resolve, 500))
          setUploadProgress(stage.progress)
        }

        // Parse transactions
        const transactions = simulateTransactionParsing(content)
        
        // Add ML predictions
        const transactionsWithPredictions = transactions.map(t => ({
          ...t,
          category: predictCategory(t.vendor)
        }))

        setParsedTransactions(transactionsWithPredictions)
        
        toast({
          title: "Upload successful!",
          description: `Processed ${transactionsWithPredictions.length} transactions with AI categorization.`,
        })
      }

      reader.readAsText(file)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your file.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleGmailIntegration = async () => {
    setIsGmailConnecting(true)
    
    // Simulate Gmail OAuth and email parsing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const gmailTransactions: ParsedTransaction[] = [
      {
        amount: 99.99,
        vendor: "Amazon Prime",
        mode: "Credit Card",
        type: "debit",
        balance: 1747.31,
        date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        category: "Shopping",
        isSubscription: true
      },
      {
        amount: 50.00,
        vendor: "Cashback Reward",
        mode: "Bank Credit",
        type: "credit",
        balance: 1797.31,
        date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
        category: "Rewards",
        isSubscription: false
      }
    ]

    setParsedTransactions(prev => [...prev, ...gmailTransactions])
    setIsGmailConnecting(false)
    
    toast({
      title: "Gmail connected!",
      description: `Found ${gmailTransactions.length} additional transactions from your emails.`,
    })
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Upload Transactions
        </h1>
        <p className="text-muted-foreground">
          Import your SMS messages or connect Gmail to extract transaction data
        </p>
      </div>

      {/* Upload Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMS File Upload */}
        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              SMS File Upload
            </CardTitle>
            <CardDescription>
              Upload a .txt file containing your SMS banking messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-file">Select SMS File</Label>
              <Input
                id="sms-file"
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md"
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Supported formats:</p>
                <p className="text-muted-foreground">
                  Bank SMS messages with transaction details (amount, vendor, date)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gmail Integration */}
        <Card className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Gmail Integration
            </CardTitle>
            <CardDescription>
              Connect your Gmail to automatically fetch transaction emails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGmailIntegration}
              disabled={isGmailConnecting}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isGmailConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Connect Gmail
                </>
              )}
            </Button>

            <div className="flex items-start gap-2 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-success">Secure OAuth 2.0</p>
                <p className="text-muted-foreground">
                  We only read transaction-related emails and never store your credentials
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Info */}
      <Card className="bg-gradient-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Processing
          </CardTitle>
          <CardDescription>
            Our machine learning models automatically categorize and analyze your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm">Smart category detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-sm">Subscription identification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm">Spending pattern analysis</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parsed Transactions */}
      {parsedTransactions.length > 0 && (
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Processed Transactions</CardTitle>
            <CardDescription>
              {parsedTransactions.length} transactions extracted and categorized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parsedTransactions.map((transaction, index) => (
                <div 
                  key={index}
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
                    {transaction.category && (
                      <Badge variant="outline">{transaction.category}</Badge>
                    )}
                    {transaction.isSubscription && (
                      <Badge className="bg-warning/20 text-warning border-warning/30">
                        Subscription
                      </Badge>
                    )}
                    <div className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="bg-gradient-primary hover:opacity-90">
                Save Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}