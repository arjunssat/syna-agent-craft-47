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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bot, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Play, 
  Pause 
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("");

  const agents = [
    {
      id: "1",
      name: "Sales Outreach Bot",
      type: "Sales",
      status: "Active",
      lastModified: "2 hours ago",
      workflowId: "wf_001",
      executions: 142,
      successRate: "96%"
    },
    {
      id: "2", 
      name: "Customer Support Agent",
      type: "Support",
      status: "Active",
      lastModified: "1 day ago",
      workflowId: "wf_002",
      executions: 89,
      successRate: "94%"
    },
    {
      id: "3",
      name: "Lead Qualification Agent", 
      type: "Sales",
      status: "Paused",
      lastModified: "3 days ago",
      workflowId: "wf_003",
      executions: 67,
      successRate: "92%"
    },
    {
      id: "4",
      name: "Data Analytics Bot",
      type: "Analytics", 
      status: "Active",
      lastModified: "5 hours ago",
      workflowId: "wf_004",
      executions: 203,
      successRate: "98%"
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="secondary">Paused</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <NavLink to="/agents/new">
            <Plus className="h-4 w-4" />
            Create Agent
          </NavLink>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Management</CardTitle>
          <CardDescription>All your AI agents in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Executions</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {agent.workflowId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(agent.status)}</TableCell>
                  <TableCell>{agent.executions}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {agent.successRate}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{agent.lastModified}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <NavLink to={`/agents/${agent.id}`}>
                            <Eye className="h-4 w-4" />
                            View Details
                          </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4" />
                          Edit Config
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4" />
                          View Workflow
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {agent.status === "Active" ? (
                            <>
                              <Pause className="h-4 w-4" />
                              Pause Agent
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Resume Agent
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}