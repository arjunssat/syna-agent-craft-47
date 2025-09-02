import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Bot, Plus, X } from "lucide-react";

export default function AgentCreate() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    type: "",
    apiKey: "",
    database: ""
  });

  const agentTypes = [
    { value: "sales", label: "Sales Agent" },
    { value: "support", label: "Customer Support" },
    { value: "analytics", label: "Data Analytics" },
    { value: "marketing", label: "Marketing Automation" },
    { value: "lead-gen", label: "Lead Generation" }
  ];

  const availableModules = [
    { id: "guardrails", name: "Guardrails", description: "Content filtering and safety checks" },
    { id: "rag", name: "RAG Chatbot", description: "Retrieval-augmented generation for responses" },
    { id: "evaluation", name: "Evaluation Agent", description: "Performance monitoring and feedback" },
    { id: "email-validator", name: "Email Validator", description: "Validate email addresses" },
    { id: "sentiment", name: "Sentiment Analysis", description: "Analyze customer sentiment" },
    { id: "scheduler", name: "Task Scheduler", description: "Schedule and manage tasks" }
  ];

  const databases = [
    { value: "crm", label: "CRM Database" },
    { value: "leads", label: "Leads Database" },
    { value: "customers", label: "Customer Database" },
    { value: "analytics", label: "Analytics Database" }
  ];

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle agent creation logic here
    console.log("Creating agent:", { ...agentData, modules: selectedModules });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <NavLink to="/agents">
            <ArrowLeft className="h-4 w-4" />
          </NavLink>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Agent</h1>
          <p className="text-muted-foreground">Set up a new AI agent with custom configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Configure the basic settings for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sales Outreach Bot"
                  value={agentData.name}
                  onChange={(e) => setAgentData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this agent will do..."
                  value={agentData.description}
                  onChange={(e) => setAgentData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Agent Type</Label>
                  <Select onValueChange={(value) => setAgentData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent type" />
                    </SelectTrigger>
                    <SelectContent>
                      {agentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Database Connection</Label>
                  <Select onValueChange={(value) => setAgentData(prev => ({ ...prev, database: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select database" />
                    </SelectTrigger>
                    <SelectContent>
                      {databases.map((db) => (
                        <SelectItem key={db.value} value={db.value}>
                          {db.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key / Authentication</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter API key or authentication token"
                  value={agentData.apiKey}
                  onChange={(e) => setAgentData(prev => ({ ...prev, apiKey: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Modules Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Attach Existing Modules</CardTitle>
              <CardDescription>Select pre-built modules to enhance your agent's capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableModules.map((module) => (
                  <div key={module.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={module.id}
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={module.id} className="font-medium cursor-pointer">
                        {module.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{agentData.name || "Untitled Agent"}</p>
                  <p className="text-sm text-muted-foreground">
                    {agentData.type ? agentTypes.find(t => t.value === agentData.type)?.label : "No type selected"}
                  </p>
                </div>
              </div>

              {agentData.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{agentData.description}</p>
                </div>
              )}

              {selectedModules.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Selected Modules</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedModules.map((moduleId) => {
                      const module = availableModules.find(m => m.id === moduleId);
                      return (
                        <Badge key={moduleId} variant="secondary" className="text-xs">
                          {module?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleSubmit}
              disabled={!agentData.name || !agentData.type}
            >
              <Plus className="h-4 w-4" />
              Create Agent
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <NavLink to="/agents">
                Cancel
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}