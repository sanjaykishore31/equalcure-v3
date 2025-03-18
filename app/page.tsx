import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stethoscope, Building2, Users, Handshake, ArrowRight, ShieldCheck, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { LoginButton } from '@/components/login-button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-16 w-16 text-slate-800" />
            <span className="text-4xl font-bold text-slate-800">EqualCure</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              About
            </Link>
            <Link href="/signin" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Sign In
            </Link>
            <Button variant="outline" className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-slate-600">
              Register
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 mb-24">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-12 left-12 w-24 h-24 rounded-full bg-white/5 blur-xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative px-6 py-24 sm:px-12 flex flex-col items-center text-center space-y-8">
            {/* Border effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl text-white drop-shadow-sm">
              Transform Your HCV Treatment Program
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-medium">
              Partner with EqualCure to expand access to Hepatitis C treatment while optimizing your 340B program benefits.
            </p>
            
            <div className="flex flex-col w-full max-w-md gap-5 justify-center mt-4">
              <Button size="lg" className="bg-white hover:bg-white/90 text-slate-900 hover:text-slate-900/90 border-0">
                Schedule Partnership Call
              </Button>
            </div>
          </div>
        </div>

        {/* Partnership Benefits Section */}
        <div className="mb-16 py-12 rounded-lg bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Why Partner with EqualCure?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-white/80">
              We help community health centers and health systems build sustainable HCV treatment programs while optimizing 340B program benefits.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center p-4">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Program Development</h3>
                <p className="text-white/80 text-center">
                  Comprehensive support for identifying patients and streamlining treatment in primary care
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Patient Navigation</h3>
                <p className="text-white/80 text-center">
                  Helping patients navigate the journey to receiving a cure
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">340B Optimization</h3>
                <p className="text-white/80 text-center">
                  Helping organizations reach more patients while ensuring financial sustainability
                </p>
              </div>
            </div>
            
            <Button size="lg" className="group bg-white hover:bg-white/90 text-slate-900 hover:text-slate-900/90 border-0">
              Schedule a Partnership Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Simple Integration Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Simple Integration Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Initial Consultation</h3>
              <p className="text-white/80">
                Schedule a call to discuss your organization's needs and goals
              </p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
              <div className="flex justify-center mb-4">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Program Design</h3>
              <p className="text-white/80">
                We'll work together to design a program that fits your workflow
              </p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Launch & Support</h3>
              <p className="text-white/80">
                We provide ongoing support to ensure program success
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-12 rounded-lg bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your HCV Program?</h2>
              <p className="text-white/80 mb-8">
                Schedule a call to learn how EqualCure can help you expand access to HCV treatment while optimizing your 340B program benefits.
              </p>
              <Button size="lg" className="bg-white hover:bg-white/90 text-slate-900 hover:text-slate-900/90 border-0">
                Schedule Partnership Call
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}