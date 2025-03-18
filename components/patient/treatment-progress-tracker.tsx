'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Calendar, Pill, LineChart, Award } from 'lucide-react';

interface MilestoneProps {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  icon: React.ReactNode;
}

const Milestone = ({ title, description, date, completed, icon }: MilestoneProps) => (
  <div className={`flex items-start p-4 rounded-lg ${completed ? 'bg-primary/10' : 'bg-muted'}`}>
    <div className={`p-2 rounded-full mr-4 ${completed ? 'bg-primary/20' : 'bg-muted/50'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {completed && (
        <div className="flex items-center mt-2 text-primary text-sm">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Completed</span>
        </div>
      )}
    </div>
  </div>
);

export function TreatmentProgressTracker() {
  // Static data for demo purposes
  const progress = 65;
  
  // Mock data
  const treatmentStartDate = new Date('2023-10-15');
  const treatmentEndDate = new Date('2023-12-10');
  const today = new Date();
  
  // Calculate days elapsed and total days
  const totalDays = Math.floor((treatmentEndDate.getTime() - treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.floor((today.getTime() - treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = totalDays - daysElapsed;
  
  // Format dates
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Treatment Progress</h2>
        <Button variant="outline" size="sm">View Details</Button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div>
            <div className="font-medium">Started</div>
            <div>{formatDate(treatmentStartDate)}</div>
          </div>
          <div className="text-center">
            <div className="font-medium">Days Remaining</div>
            <div>{daysRemaining} days</div>
          </div>
          <div className="text-right">
            <div className="font-medium">Expected Completion</div>
            <div>{formatDate(treatmentEndDate)}</div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="milestones">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="milestones" className="space-y-4">
          <Milestone 
            title="Initial Consultation" 
            description="First meeting with your healthcare provider to discuss treatment plan"
            date="Oct 15, 2023"
            completed={true}
            icon={<Calendar className="h-5 w-5 text-primary" />}
          />
          
          <Milestone 
            title="Treatment Initiation" 
            description="Started medication regimen for Hepatitis C"
            date="Oct 20, 2023"
            completed={true}
            icon={<Pill className="h-5 w-5 text-primary" />}
          />
          
          <Milestone 
            title="Mid-Treatment Check-in" 
            description="Follow-up appointment to monitor progress and side effects"
            date="Nov 10, 2023"
            completed={true}
            icon={<LineChart className="h-5 w-5 text-primary" />}
          />
          
          <Milestone 
            title="Final Treatment Dose" 
            description="Completion of medication regimen"
            date="Dec 10, 2023"
            completed={false}
            icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />}
          />
          
          <Milestone 
            title="SVR12 Test" 
            description="Final test to confirm cure (12 weeks after treatment)"
            date="Mar 3, 2024"
            completed={false}
            icon={<Award className="h-5 w-5 text-muted-foreground" />}
          />
        </TabsContent>
        
        <TabsContent value="medications">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Medication tracking information will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="labs">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Lab result history will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 