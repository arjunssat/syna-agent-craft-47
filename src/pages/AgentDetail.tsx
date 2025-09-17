import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Bot, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  ExternalLink,
  Activity,
  Database,
  Settings,
  Clock,
  Upload,
  Shield,
  Code,
  Link,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function AgentDetail() {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  
  // Configuration state
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState("2048");
  const [selectedDatabase, setSelectedDatabase] = useState("crm-database");
  const [vectorDB, setVectorDB] = useState("pinecone");
  const [embeddingsModel, setEmbeddingsModel] = useState("openai-ada-002");
  const [guardrailsEnabled, setGuardrailsEnabled] = useState(true);
  const [customScript, setCustomScript] = useState("");
  const [apiKeys, setApiKeys] = useState("");

  // Mock agent data - in real app, fetch based on ID
  const agent = {
    id: id || "1",
    name: "Sales Outreach Bot",
    type: "Sales",
    description: "Automated sales outreach agent that identifies leads and sends personalized messages",
    status: "Active",
    workflowId: "wf_001",
    createdAt: "2024-01-15",
    lastRun: "2 minutes ago",
    executions: 142,
    successRate: "96%",
    averageRuntime: "45s",
    linkedDatabase: "CRM Database",
    attachedModules: ["Guardrails", "RAG Chatbot", "Email Validator"]
  };

  const performanceMetrics = [
    { label: "Total Executions", value: "142", change: "+12 today" },
    { label: "Success Rate", value: "96%", change: "+2% this week" },
    { label: "Avg Runtime", value: "45s", change: "-5s improvement" },
    { label: "Error Rate", value: "4%", change: "-1% this week" }
  ];

  const recentActivity = [
    { 
      action: "Lead Qualification", 
      timestamp: "2 min ago", 
      status: "Success",
      details: "Successfully qualified 5 new leads based on engagement score and company size criteria",
      logStatus: "Completed",
      files: [
        { name: "qualified_leads_report.csv", size: "2.3 KB", url: "#" },
        { name: "qualification_log.txt", size: "1.1 KB", url: "#" }
      ]
    },
    { 
      action: "Email Outreach", 
      timestamp: "15 min ago", 
      status: "Success",
      details: "Sent personalized outreach emails to 25 prospects with 98% delivery rate",
      logStatus: "Completed",
      files: [
        { name: "email_campaign_results.json", size: "4.7 KB", url: "#" },
        { name: "delivery_report.pdf", size: "156 KB", url: "#" }
      ]
    },
    { 
      action: "CRM Update", 
      timestamp: "1 hour ago", 
      status: "Success",
      details: "Updated 142 contact records with enriched company data and contact preferences",
      logStatus: "Completed",
      files: [
        { name: "crm_update_summary.xlsx", size: "12.8 KB", url: "#" }
      ]
    },
    { 
      action: "Lead Scoring", 
      timestamp: "2 hours ago", 
      status: "Failed",
      details: "Lead scoring process failed due to API timeout while accessing external data source",
      logStatus: "Error - Retry scheduled",
      files: [
        { name: "error_log.txt", size: "892 B", url: "#" }
      ]
    },
    { 
      action: "Data Validation", 
      timestamp: "3 hours ago", 
      status: "Success",
      details: "Validated and cleaned 1,247 contact records, removing duplicates and invalid entries",
      logStatus: "Completed",
      files: [
        { name: "validation_results.csv", size: "8.4 KB", url: "#" },
        { name: "cleaned_contacts.csv", size: "234 KB", url: "#" }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <NavLink to="/agents">
              <ArrowLeft className="h-4 w-4" />
            </NavLink>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{agent.type}</Badge>
                <Badge className={agent.status === "Active" ? "bg-green-100 text-green-800" : ""}>
                  {agent.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4" />
            Open in n8n
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4" />
            Edit Config
          </Button>
          <Button>
            <Play className="h-4 w-4" />
            Run Now
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Information */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="mt-1">{agent.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Workflow ID</label>
                    <p className="mt-1 font-mono text-sm">{agent.workflowId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="mt-1">{agent.createdAt}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Linked Database</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.linkedDatabase}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Control */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Agent Status</label>
                    <p className="text-sm text-muted-foreground">Enable or disable this agent</p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Attached Modules</label>
                  <div className="flex flex-wrap gap-2">
                    {agent.attachedModules.map((module, index) => (
                      <Badge key={index} variant="secondary">{module}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4" />
                    Manage Modules
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Database className="h-4 w-4" />
                    Switch Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed by this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedActivity(expandedActivity === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={activity.status === "Success" ? "default" : "destructive"}
                          className={activity.status === "Success" ? "bg-green-100 text-green-800" : ""}
                        >
                          {activity.status}
                        </Badge>
                        {expandedActivity === index ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    
                    {expandedActivity === index && (
                      <div className="px-3 pb-3 border-t bg-muted/20">
                        <div className="pt-3 space-y-4">
                          {/* Activity Details */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">Activity Details</h4>
                            <p className="text-sm text-muted-foreground">{activity.details}</p>
                          </div>
                          
                          {/* Log Status */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">Log Status</h4>
                            <div className="flex items-center gap-2">
                              {activity.status === "Success" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="text-sm">{activity.logStatus}</span>
                            </div>
                          </div>
                          
                          {/* Downloadable Files */}
                          {activity.files && activity.files.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Downloadable Files</h4>
                              <div className="space-y-2">
                                {activity.files.map((file, fileIndex) => (
                                  <div key={fileIndex} className="flex items-center justify-between p-2 bg-background rounded border">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{file.size}</p>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={file.url} download>
                                        <Download className="h-3 w-3" />
                                      </a>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LLM Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  LLM Configuration
                </CardTitle>
                <CardDescription>Configure the language model settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model-select">Model Selection</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="llama-2">Llama 2</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Temperature: {temperature[0]}</Label>
                  <p className="text-xs text-muted-foreground">Controls creativity vs accuracy (0 = precise, 1 = creative)</p>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens / Response Length</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                    placeholder="2048"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Database & Knowledge Base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database & Knowledge Base
                </CardTitle>
                <CardDescription>Configure data sources and RAG settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="database-select">Connected Databases</Label>
                  <div className="flex gap-2">
                    <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crm-database">CRM Database</SelectItem>
                        <SelectItem value="sales-db">Sales Database</SelectItem>
                        <SelectItem value="customer-db">Customer Database</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vector-db">Vector Database</Label>
                  <Select value={vectorDB} onValueChange={setVectorDB}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vector DB" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pinecone">Pinecone</SelectItem>
                      <SelectItem value="weaviate">Weaviate</SelectItem>
                      <SelectItem value="chroma">ChromaDB</SelectItem>
                      <SelectItem value="qdrant">Qdrant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="embeddings-model">Embeddings Model</Label>
                  <Select value={embeddingsModel} onValueChange={setEmbeddingsModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select embeddings model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai-ada-002">OpenAI Ada-002</SelectItem>
                      <SelectItem value="sentence-transformers">Sentence Transformers</SelectItem>
                      <SelectItem value="cohere-embed">Cohere Embed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Document Uploads</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload PDFs, CSVs, or knowledge files</p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Guardrails */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Guardrails
                </CardTitle>
                <CardDescription>Configure safety checks and output filtering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Guardrails Protection</Label>
                    <p className="text-sm text-muted-foreground">Enable safety checks for outputs</p>
                  </div>
                  <Switch checked={guardrailsEnabled} onCheckedChange={setGuardrailsEnabled} />
                </div>
                
                <div className="space-y-2">
                  <Label>Safety Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="content-filter" className="rounded" />
                      <Label htmlFor="content-filter" className="text-sm">Content Filter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pii-detection" className="rounded" />
                      <Label htmlFor="pii-detection" className="text-sm">PII Detection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="toxicity-filter" className="rounded" />
                      <Label htmlFor="toxicity-filter" className="text-sm">Toxicity Filter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="bias-detection" className="rounded" />
                      <Label htmlFor="bias-detection" className="text-sm">Bias Detection</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custom Scripts & APIs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Custom Scripts & APIs
                </CardTitle>
                <CardDescription>Add custom functions and external integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-script">Custom Scripts / Functions</Label>
                  <Textarea
                    id="custom-script"
                    placeholder="// Insert custom JavaScript or Python code here
function customFunction() {
  // Your custom logic
}"
                    value={customScript}
                    onChange={(e) => setCustomScript(e.target.value)}
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    External APIs
                  </Label>
                  <div className="space-y-2">
                    <Input placeholder="HubSpot API Key" type="password" />
                    <Input placeholder="Salesforce API Key" type="password" />
                    <Input placeholder="Custom API Endpoint" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link className="h-4 w-4 mr-2" />
                    Add More APIs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline">Reset to Defaults</Button>
            <Button variant="outline">Preview Changes</Button>
            <Button>Save Configuration</Button>
          </div>
        </TabsContent>

        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Visualization</CardTitle>
              <CardDescription>Visual representation of the agent's workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                <div className="text-center">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Workflow visualization will be embedded here</p>
                  <Button className="mt-4" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                    Open in n8n Editor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}