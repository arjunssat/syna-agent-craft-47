import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Target, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const icpFormSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  currency: z.string().min(1, "Currency is required"),
  location: z.string().min(1, "Location is required"),
  projectMaturity: z.string().min(1, "Project management maturity is required"),
  painPoints: z.string().min(10, "Please describe pain points (minimum 10 characters)"),
  decisionMakers: z.string().min(5, "Please list decision makers"),
  adoptionReadiness: z.number().min(0).max(100),
  valueProposition: z.string().min(10, "Please describe value proposition (minimum 10 characters)"),
  companyOverview: z.string().min(10, "Please provide company overview (minimum 10 characters)"),
});

type ICPFormValues = z.infer<typeof icpFormSchema>;

const ICPCriteria = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ICPFormValues>({
    resolver: zodResolver(icpFormSchema),
    defaultValues: {
      industry: "",
      companySize: "",
      annualRevenue: "",
      currency: "USD",
      location: "",
      projectMaturity: "",
      painPoints: "",
      decisionMakers: "",
      adoptionReadiness: 50,
      valueProposition: "",
      companyOverview: "",
    },
  });

  const onSubmit = async (data: ICPFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Replace with your actual n8n webhook endpoint
      const webhookUrl = "https://your-n8n-instance/webhook/icp-intake";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger ICP workflow");
      }

      setSubmitSuccess(true);
      toast({
        title: "Success!",
        description: "ICP Analysis Workflow Triggered Successfully!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger ICP workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">ICP Criteria</h1>
          </div>
          <p className="text-muted-foreground">
            Define your Ideal Customer Profile to trigger automated data scraping and enrichment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Profile Details</CardTitle>
                <CardDescription>
                  Fill in the details to generate your ICP report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1: Industry & Company Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="IT">IT & Software</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="Finance">Finance & Banking</SelectItem>
                                <SelectItem value="Retail">Retail & E-commerce</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Size (Employees)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50-500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 2: Revenue & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name="annualRevenue"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Annual Revenue</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 1000000" type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="INR">INR</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., San Francisco, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 3: Project Maturity */}
                    <FormField
                      control={form.control}
                      name="projectMaturity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Management Maturity</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select maturity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Current level of project management processes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 4: Pain Points */}
                    <FormField
                      control={form.control}
                      name="painPoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pain Points</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the key business challenges and pain points..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 5: Decision Makers */}
                    <FormField
                      control={form.control}
                      name="decisionMakers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Decision Makers</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List key decision makers (Name, Role, LinkedIn URL)"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one per line or separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 6: Adoption Readiness */}
                    <FormField
                      control={form.control}
                      name="adoptionReadiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adoption Readiness: {field.value}%</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={10}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormDescription>
                            Likelihood of adopting new solutions
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 7: Value Proposition */}
                    <FormField
                      control={form.control}
                      name="valueProposition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value Proposition (Services and Products)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the services and products that address their needs..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 8: Company Overview */}
                    <FormField
                      control={form.control}
                      name="companyOverview"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Company Overview</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a comprehensive overview of the target company..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing ICP...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Generate ICP Report
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Success Message */}
                    {submitSuccess && (
                      <div className="flex items-center gap-2 p-4 bg-primary/10 text-primary rounded-md">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">
                          ICP Analysis Workflow Triggered Successfully!
                        </span>
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-foreground">Be Specific</h4>
                  <p className="text-muted-foreground">
                    Provide detailed information to get more accurate ICP analysis results.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-foreground">Pain Points</h4>
                  <p className="text-muted-foreground">
                    Focus on measurable challenges that your solution directly addresses.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-foreground">Decision Makers</h4>
                  <p className="text-muted-foreground">
                    Include LinkedIn URLs when available for better profile enrichment.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example ICP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Industry:</strong> IT & Software</p>
                <p><strong className="text-foreground">Size:</strong> 100-500 employees</p>
                <p><strong className="text-foreground">Revenue:</strong> $10M-$50M USD</p>
                <p><strong className="text-foreground">Location:</strong> North America</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPCriteria;
