import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon,
  Palette,
  Globe,
  Bell,
  Bot,
  Bug,
  Sun,
  Moon,
  Monitor,
  Mail,
  MessageSquare,
  Smartphone
} from "lucide-react";

export default function Settings() {
  // Theme settings
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("yellow");
  
  // Language & Locale
  const [language, setLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [currency, setCurrency] = useState("USD");
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [teamsNotifications, setTeamsNotifications] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  
  // Default agent settings
  const [defaultModel, setDefaultModel] = useState("openai");
  const [defaultApiKey, setDefaultApiKey] = useState("");
  const [defaultTemperature, setDefaultTemperature] = useState([0.7]);
  const [defaultMaxTokens, setDefaultMaxTokens] = useState("2048");
  const [executionTimeLimit, setExecutionTimeLimit] = useState("300");
  const [maxConcurrentAgents, setMaxConcurrentAgents] = useState("5");
  
  // Debug settings
  const [verboseLogs, setVerboseLogs] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [debugConsole, setDebugConsole] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <SettingsIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">General Settings</h1>
          <p className="text-muted-foreground">Customize your application preferences and defaults</p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="agents">Agent Defaults</TabsTrigger>
          <TabsTrigger value="debugging">Debugging</TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Customization
              </CardTitle>
              <CardDescription>Personalize the look and feel of your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme Mode</Label>
                <div className="flex gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2"
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="flex gap-3">
                  <Button
                    variant={accentColor === "white" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAccentColor("white")}
                    className="bg-white text-black border-2 hover:bg-gray-50"
                  >
                    White
                  </Button>
                  <Button
                    variant={accentColor === "yellow" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAccentColor("yellow")}
                    className="bg-yellow-400 text-black border-2 hover:bg-yellow-500"
                  >
                    Yellow
                  </Button>
                  <Button
                    variant={accentColor === "blue" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAccentColor("blue")}
                    className="bg-blue-500 text-white border-2 hover:bg-blue-600"
                  >
                    Blue
                  </Button>
                  <Button
                    variant={accentColor === "green" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAccentColor("green")}
                    className="bg-green-500 text-white border-2 hover:bg-green-600"
                  >
                    Green
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization Settings */}
        <TabsContent value="localization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Locale
              </CardTitle>
              <CardDescription>Configure regional settings and formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select value={timeFormat} onValueChange={setTimeFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Send notifications to Slack channels</p>
                    </div>
                  </div>
                  <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Microsoft Teams</Label>
                      <p className="text-sm text-muted-foreground">Send notifications to Teams channels</p>
                    </div>
                  </div>
                  <Switch checked={teamsNotifications} onCheckedChange={setTeamsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">In-App Alerts</Label>
                      <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                    </div>
                  </div>
                  <Switch checked={inAppAlerts} onCheckedChange={setInAppAlerts} />
                </div>
              </div>

              {(emailNotifications || slackNotifications || teamsNotifications) && (
                <div className="border-t pt-4 space-y-3">
                  <Label className="text-sm font-medium">Notification Triggers</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="agent-completion" className="rounded" defaultChecked />
                      <Label htmlFor="agent-completion" className="text-sm">Agent Completion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="agent-errors" className="rounded" defaultChecked />
                      <Label htmlFor="agent-errors" className="text-sm">Agent Errors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="system-alerts" className="rounded" />
                      <Label htmlFor="system-alerts" className="text-sm">System Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="weekly-reports" className="rounded" />
                      <Label htmlFor="weekly-reports" className="text-sm">Weekly Reports</Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Default Settings */}
        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Default Agent Settings
              </CardTitle>
              <CardDescription>Set default parameters for new agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-model">Model</Label>
                  <Select value={defaultModel} onValueChange={setDefaultModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                      <SelectItem value="llama">Llama</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="mistral">Mistral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-api-key">API Key</Label>
                  <Input
                    id="default-api-key"
                    type="password"
                    value={defaultApiKey}
                    onChange={(e) => setDefaultApiKey(e.target.value)}
                    placeholder="Enter API key"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Default Temperature: {defaultTemperature[0]}</Label>
                  <p className="text-xs text-muted-foreground">Controls creativity vs accuracy for new agents</p>
                  <Slider
                    value={defaultTemperature}
                    onValueChange={setDefaultTemperature}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-max-tokens">Default Max Tokens</Label>
                  <Input
                    id="default-max-tokens"
                    type="number"
                    value={defaultMaxTokens}
                    onChange={(e) => setDefaultMaxTokens(e.target.value)}
                    placeholder="2048"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="execution-time-limit">Execution Time Limit (seconds)</Label>
                  <Input
                    id="execution-time-limit"
                    type="number"
                    value={executionTimeLimit}
                    onChange={(e) => setExecutionTimeLimit(e.target.value)}
                    placeholder="300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-concurrent">Max Concurrent Agents</Label>
                  <Input
                    id="max-concurrent"
                    type="number"
                    value={maxConcurrentAgents}
                    onChange={(e) => setMaxConcurrentAgents(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <Label className="text-sm font-medium">Default Safety Settings</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default-guardrails" className="rounded" defaultChecked />
                    <Label htmlFor="default-guardrails" className="text-sm">Enable Guardrails</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default-content-filter" className="rounded" defaultChecked />
                    <Label htmlFor="default-content-filter" className="text-sm">Content Filter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default-pii" className="rounded" />
                    <Label htmlFor="default-pii" className="text-sm">PII Detection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default-auto-retry" className="rounded" defaultChecked />
                    <Label htmlFor="default-auto-retry" className="text-sm">Auto Retry on Error</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debugging Settings */}
        <TabsContent value="debugging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Error & Debugging Tools
              </CardTitle>
              <CardDescription>Configure logging and debugging options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Verbose Logging</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed system logs for troubleshooting</p>
                  </div>
                  <Switch checked={verboseLogs} onCheckedChange={setVerboseLogs} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Test Mode</Label>
                    <p className="text-sm text-muted-foreground">Run agents in safe test environment</p>
                  </div>
                  <Switch checked={testMode} onCheckedChange={setTestMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Debug Console</Label>
                    <p className="text-sm text-muted-foreground">Show developer console in interface</p>
                  </div>
                  <Switch checked={debugConsole} onCheckedChange={setDebugConsole} />
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <Label className="text-sm font-medium">Log Levels</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="log-info" className="rounded" defaultChecked />
                    <Label htmlFor="log-info" className="text-sm">Info</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="log-warnings" className="rounded" defaultChecked />
                    <Label htmlFor="log-warnings" className="text-sm">Warnings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="log-errors" className="rounded" defaultChecked />
                    <Label htmlFor="log-errors" className="text-sm">Errors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="log-debug" className="rounded" />
                    <Label htmlFor="log-debug" className="text-sm">Debug</Label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <Label className="text-sm font-medium">Debug Actions</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export Logs</Button>
                  <Button variant="outline" size="sm">Clear Cache</Button>
                  <Button variant="outline" size="sm">Reset Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">Reset to Defaults</Button>
        <Button variant="outline">Import Settings</Button>
        <Button variant="outline">Export Settings</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}