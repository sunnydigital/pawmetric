import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Sparkles, Brain, Heart, Shield, TrendingUp, Users } from "lucide-react";
import { PetScopeLogo } from "./petscope-logo";

export function LandingPage() {
  const features = [
    {
      icon: "🔍",
      title: "Scan",
      description: "Use your camera to capture clear images",
    },
    {
      icon: "🤖",
      title: "AI Analysis",
      description: "Our AI analyzes health markers instantly",
    },
    {
      icon: "👨‍⚕️",
      title: "Vet Advice",
      description: "Get professional recommendations 24/7",
    },
  ];

  const whyPawmetric = [
    {
      icon: Shield,
      title: "Vet-Validated AI",
      description: "Trained on 100k+ vet-reviewed images",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "95% Accuracy",
      description: "Clinically validated detection rates",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Brain,
      title: "Continuous Learning",
      description: "AI improves with every scan",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 scans per month",
        "Basic health insights",
        "Activity tracking",
        "Email support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited scans",
        "Advanced AI analysis",
        "24/7 vet chat",
        "Health reports",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Vet Pro",
      price: "$29.99",
      period: "per month",
      features: [
        "Everything in Premium",
        "Multi-pet profiles",
        "Clinic integration",
        "API access",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const scienceSteps = [
    {
      icon: "📊",
      title: "Data Collection",
      description: "Thousands of pet health images from veterinary clinics worldwide",
    },
    {
      icon: "🏥",
      title: "Veterinary Labeling",
      description: "Expert vets review and annotate each image for accuracy",
    },
    {
      icon: "🔄",
      title: "Continuous Learning",
      description: "AI model improves daily with new data and vet feedback",
    },
  ];

  return (
    <div className="w-full bg-[#F9FAFB] overflow-y-auto">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <PetScopeLogo variant="horizontal" className="h-10 w-auto" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-[#6B7280] hover:text-[#111827] transition-all">How It Works</a>
              <a href="#why" className="text-[#6B7280] hover:text-[#111827] transition-all">Why PetScope</a>
              <a href="#pricing" className="text-[#6B7280] hover:text-[#111827] transition-all">Pricing</a>
              <a href="#science" className="text-[#6B7280] hover:text-[#111827] transition-all">Science</a>
            </div>
            <Button className="bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white hover:from-[#1D4ED8] hover:to-[#10B981] rounded-full px-6 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_16px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E5E7EB] rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm text-[#6B7280]">Trusted by 50k+ pet parents</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#111827] to-[#374151] bg-clip-text text-transparent">
              AI-Powered Health Insights for Every Dog 🐶
            </h1>
            <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Scan, analyze, and monitor your dog's health with veterinary-grade AI. Get instant insights and expert advice from the comfort of home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-14 px-8 bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white hover:from-[#1D4ED8] hover:to-[#10B981] rounded-full shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition-all hover:scale-105">
                Get My Dog's Health Score
              </Button>
              <Button variant="outline" className="h-14 px-8 border-[#E5E7EB] rounded-full hover:bg-[#F3F4F6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:scale-105">
                Watch Demo
              </Button>
            </div>
            <div className="mt-12">
              <img 
                src="https://images.unsplash.com/photo-1650062417263-5b5633237ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBsYXlpbmd8ZW58MXx8fHwxNzYxMDEwNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy dog"
                className="w-full max-w-3xl mx-auto rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
            <p className="text-xl text-[#6B7280]">Three simple steps to better pet health</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center border-[#E5E7EB] rounded-[24px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all hover:scale-[1.02]">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-4xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  {feature.icon}
                </div>
                <h3 className="text-[#111827] mb-3">{feature.title}</h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pawmetric */}
      <section id="why" className="py-24 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Why PetScope</h2>
            <p className="text-xl text-[#6B7280]">Veterinary-grade technology you can trust</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyPawmetric.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-8 border-0 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all hover:scale-[1.02]">
                  <div className={`w-16 h-16 mb-6 rounded-[20px] bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#111827] mb-3">{item.title}</h3>
                  <p className="text-[#6B7280]">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[#6B7280]">Choose the plan that's right for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-8 rounded-[24px] transition-all ${
                  tier.highlighted 
                    ? 'border-[#2563EB] border-2 shadow-[0_16px_48px_rgba(37,99,235,0.25)] scale-105 bg-gradient-to-br from-white to-blue-50' 
                    : 'border-[#E5E7EB] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02]'
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-block bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white px-4 py-1 rounded-full text-sm mb-4 shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl text-[#111827] mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl text-[#111827]">{tier.price}</span>
                  <span className="text-[#6B7280] ml-2">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#34D399] flex-shrink-0" />
                      <span className="text-[#6B7280]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full h-12 rounded-full transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white hover:from-[#1D4ED8] hover:to-[#10B981] shadow-[0_8px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_24px_rgba(37,99,235,0.35)] hover:scale-105'
                      : 'border-[#E5E7EB] hover:bg-[#F3F4F6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Science */}
      <section id="science" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">The Science Behind PetScope</h2>
            <p className="text-xl text-[#6B7280]">Built on veterinary expertise and cutting-edge AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {scienceSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl">
                  {step.icon}
                </div>
                <h3 className="text-[#111827] mb-3">{step.title}</h3>
                <p className="text-[#6B7280]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#34D399] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Ready to give your dog the care they deserve?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of pet parents using AI to monitor their dog's health.
          </p>
          <Button className="h-14 px-8 bg-white text-[#2563EB] hover:bg-gray-100 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all hover:scale-105">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <PetScopeLogo variant="horizontal" className="h-10 w-auto" />
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-all">Privacy</a>
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-all">Terms</a>
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-all">Contact</a>
            </div>
            <p className="text-[#6B7280]">Built with ❤️ for Pets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
