import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Download, 
  Filter, 
  Search, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const executionData = [
    {
      id: "exec_001",
      agentName: "Sales Outreach Bot",
      action: "Lead Qualification",
      status: "Success",
      startTime: "2024-01-20 14:30:15",
      duration: "42s",
      recordsProcessed: 25
    },
    {
      id: "exec_002", 
      agentName: "Customer Support Agent",
      action: "Ticket Classification",
      status: "Success",
      startTime: "2024-01-20 14:28:30",
      duration: "18s",
      recordsProcessed: 12
    },
    {
      id: "exec_003",
      agentName: "Lead Qualification Agent",
      action: "Score Calculation",
      status: "Failed",
      startTime: "2024-01-20 14:25:00",
      duration: "3s",
      recordsProcessed: 0
    },
    {
      id: "exec_004",
      agentName: "Data Analytics Bot", 
      action: "Report Generation",
      status: "Success",
      startTime: "2024-01-20 14:20:45",
      duration: "125s",
      recordsProcessed: 250
    },
    {
      id: "exec_005",
      agentName: "Sales Outreach Bot",
      action: "Email Campaign",
      status: "Success", 
      startTime: "2024-01-20 14:15:20",
      duration: "67s",
      recordsProcessed: 45
    }
  ];

  const summaryStats = [
    { title: "Total Executions", value: "1,247", change: "+18%", icon: TrendingUp, color: "text-green-600" },
    { title: "Successful Runs", value: "1,192", change: "+2.1%", icon: CheckCircle, color: "text-green-600" },
    { title: "Failed Runs", value: "55", change: "-12%", icon: AlertTriangle, color: "text-red-600" },
    { title: "Avg Duration", value: "47s", change: "-5s", icon: Clock, color: "text-blue-600" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "Running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // Implement export logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Monitor agent performance and execution history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search executions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Agents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="sales">Sales Outreach Bot</SelectItem>
                  <SelectItem value="support">Customer Support Agent</SelectItem>
                  <SelectItem value="lead">Lead Qualification Agent</SelectItem>
                  <SelectItem value="analytics">Data Analytics Bot</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Execution History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Execution History</CardTitle>
          <CardDescription>Detailed log of all agent executions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Execution ID</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Records</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executionData.map((execution) => (
                <TableRow key={execution.id}>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {execution.id}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">{execution.agentName}</TableCell>
                  <TableCell>{execution.action}</TableCell>
                  <TableCell>{getStatusBadge(execution.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{execution.startTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {execution.duration}
                    </div>
                  </TableCell>
                  <TableCell>{execution.recordsProcessed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}