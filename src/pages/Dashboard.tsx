import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Activity, TrendingUp, AlertTriangle, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const kpis = [
    { title: "Active Agents", value: "12", change: "+2 this week", icon: Bot, color: "text-primary" },
    { title: "Tasks Completed", value: "1,247", change: "+18% from last month", icon: Activity, color: "text-green-600" },
    { title: "Success Rate", value: "94.2%", change: "+2.1% improvement", icon: TrendingUp, color: "text-blue-600" },
    { title: "Errors", value: "23", change: "-12% from last week", icon: AlertTriangle, color: "text-red-600" },
  ];

  const recentAgents = [
    { name: "Sales Outreach Bot", type: "Sales", status: "Active", lastRun: "2 minutes ago" },
    { name: "Customer Support Agent", type: "Support", status: "Active", lastRun: "15 minutes ago" },
    { name: "Lead Qualification Agent", type: "Sales", status: "Paused", lastRun: "1 hour ago" },
    { name: "Data Analytics Bot", type: "Analytics", status: "Active", lastRun: "30 minutes ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your AI agents.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/reports')}>
            <Eye className="h-4 w-4" />
            View Reports
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/agents/new')}>
            <Plus className="h-4 w-4" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Agents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Agent Activity</CardTitle>
            <CardDescription>Your most recently active AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={agent.status === "Active" ? "default" : "secondary"}>
                      {agent.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{agent.lastRun}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your AI agents efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start h-12" onClick={() => navigate('/agents/new')}>
                <Plus className="h-4 w-4" />
                Create New Agent
              </Button>
              <Button variant="outline" className="justify-start h-12" onClick={() => navigate('/agents')}>
                <Bot className="h-4 w-4" />
                Manage Agents
              </Button>
              <Button variant="outline" className="justify-start h-12" onClick={() => navigate('/agents')}>
                <Activity className="h-4 w-4" />
                View Workflow Builder
              </Button>
              <Button variant="outline" className="justify-start h-12" onClick={() => navigate('/reports')}>
                <TrendingUp className="h-4 w-4" />
                Performance Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}