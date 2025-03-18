import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stethoscope, Building2, Users, Handshake, ArrowLeft, HeartPulse, LineChart, Microscope, Award, Target, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { LoginButton } from '@/components/login-button';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">EqualCure</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-foreground font-medium">
              About
            </Link>
            <LoginButton />
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 py-24 mb-16">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-12 left-12 w-24 h-24 rounded-full bg-white/5 blur-xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
          
          <div className="container mx-auto px-4 relative">
            <Link href="/" className="flex items-center text-white/80 hover:text-white mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Expanding Access to Hepatitis C Treatment
              </h1>
              <p className="text-xl text-white/80 mb-8">
                EqualCure is dedicated to expanding access to Hepatitis C (HCV) treatment for communities in-need.
                We're making healthcare more accessible, one patient at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90 text-slate-900 hover:text-slate-900/90 border-0" asChild>
                  <Link href="/partnerships">Become a Partner</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
                  <Link href="/">Patient Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Mission Section */}
          <div className="mb-24">
            <Card className="p-8 shadow-lg bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg mb-6 text-white/80">
                    EqualCure is dedicated to expanding access to Hepatitis C (HCV) treatment for communities in-need. 
                    We aim to help community health centers and safety-net hospitals identify patients with or at risk for HCV, 
                    support clinicians in streamlining treatment in primary care, and help patients navigate the journey of receiving a cure.
                  </p>
                  <p className="text-lg mb-6 text-white/80">
                    We help frontline organizations reach more patients and ensure financial sustainability.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-white" />
                      <span className="text-sm text-white/80">Focused Mission</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-white" />
                      <span className="text-sm text-white/80">Global Impact</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-white" />
                      <span className="text-sm text-white/80">Quality Care</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-white" />
                      <span className="text-sm text-white/80">Proven Results</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src="/about/mission.jpg"
                      alt="Our Mission"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 py-24 rounded-3xl mb-12">
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-grid-white/10"></div>
              
              <div className="relative">
                <h2 className="text-4xl font-bold mb-4 text-center text-white">Meet Our Team</h2>
                <p className="text-xl text-white/80 text-center max-w-2xl mx-auto">
                  We are doctors with experience in community-based health care, health policy, and informatics. 
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
              <div className="group">
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/0 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                      src="/team/margaret-hayden.jpg"
                      alt="Dr. Margaret Hayden"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Margaret Hayden, MD</h3>
                  <p className="text-muted-foreground text-center">Co-founder</p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/0 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                      src="/team/sanjay-kishore.jpg"
                      alt="Dr. Sanjay Kishore"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Sanjay Kishore, MD</h3>
                  <p className="text-muted-foreground text-center">Co-founder</p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/0 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                      src="/team/micah-johnson.jpg"
                      alt="Dr. Micah Johnson"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Micah Johnson, MD</h3>
                  <p className="text-muted-foreground text-center">Co-founder</p>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 space-y-6 px-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Most recently, Drs. Hayden and Kishore launched an HCV treatment program in Alabama, and Dr. Johnson worked on prescription drug and insurance policy at the U.S. Department of Health and Human Services.
              </p>
            </div>
          </div>

          {/* How We Work Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">How We Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex items-start mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Health Centers</h3>
                    <p className="text-white/80">
                      We partner with community health centers and safety-net hospitals to identify patients with or at risk for HCV. 
                      Our platform helps these organizations implement effective screening protocols and connect patients with care.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex items-start mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <HeartPulse className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Clinician Support</h3>
                    <p className="text-white/80">
                      We provide tools and resources to help clinicians streamline HCV treatment in primary care settings. 
                      Our clinical decision support systems make it easier for providers to deliver evidence-based care.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex items-start mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Patient Navigation</h3>
                    <p className="text-white/80">
                      We help patients navigate the complex journey of receiving HCV treatment. 
                      Our patient navigators provide support with appointment scheduling, medication adherence, 
                      and addressing social determinants of health that may impact treatment success.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex items-start mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Handshake className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">340B Program Support</h3>
                    <p className="text-white/80">
                      We help organizations leverage the 340B Drug Pricing Program to ensure financial sustainability 
                      while expanding access to HCV treatment. Our expertise in 340B compliance and optimization 
                      helps partners maximize the impact of this important program.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex justify-center mb-4">
                  <Microscope className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Increased Screening</h3>
                <p className="text-white/80">
                  Helping partners implement effective HCV screening protocols to identify more patients in need of treatment
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex justify-center mb-4">
                  <HeartPulse className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Improved Treatment Rates</h3>
                <p className="text-white/80">
                  Supporting clinicians to confidently treat HCV in primary care settings, increasing treatment initiation
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white">
                <div className="flex justify-center mb-4">
                  <LineChart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial Sustainability</h3>
                <p className="text-white/80">
                  Helping partners optimize 340B program participation to ensure long-term financial sustainability
                </p>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 rounded-lg p-8 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Partner with EqualCure</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-white/80">
              Join us in our mission to eliminate Hepatitis C by expanding access to treatment for all communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white hover:bg-white/90 text-slate-900 hover:text-slate-900/90 border-0" asChild>
                <Link href="/partnerships">Become a Partner</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
                <Link href="/">Patient Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 