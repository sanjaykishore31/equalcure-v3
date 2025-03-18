'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function ConsultationRequestForm() {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would implement the actual API call to save the consultation request
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Request received",
        description: "A member of our care team will contact you shortly.",
      });

      // Reset form
      setName('');
      setContactInfo('');
      setContactMethod('email');
      setTopic('');
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactMethod">Preferred Contact Method</Label>
        <RadioGroup 
          value={contactMethod} 
          onValueChange={setContactMethod}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text">Text</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">
          {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
        </Label>
        <Input
          id="contactInfo"
          type={contactMethod === 'email' ? 'email' : 'tel'}
          placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">What would you like to discuss?</Label>
        <Select value={topic} onValueChange={setTopic} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="treatment">Treatment options</SelectItem>
            <SelectItem value="insurance">Insurance coverage</SelectItem>
            <SelectItem value="testing">HCV testing</SelectItem>
            <SelectItem value="general">General information</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Request Consultation"}
      </Button>
    </form>
  );
} 