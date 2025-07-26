import { CheckCircle, TrendingUp, Globe, Shield, ArrowRight, Users, Target } from 'lucide-react'
import Link from 'next/link'

export default async function Solutions({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-100 to-sky-300 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&crop=center" 
            alt="Business strategy and solutions" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200/80 to-sky-100/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white/60 rounded-xl shadow-lg p-8 sm:p-12 backdrop-blur-md">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Solutions
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-sky-300 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Comprehensive strategies to help Canadian companies successfully expand into the Indian market
            </p>
          </div>
        </div>
      </section>

      {/* Featured Solutions Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Featured Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our most comprehensive solutions for successful market expansion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Market Entry Strategy",
                image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=250&fit=crop&crop=center",
                description: "Complete market analysis and entry planning"
              },
              {
                title: "Risk Assessment",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&crop=center",
                description: "Comprehensive risk management solutions"
              },
              {
                title: "Partnership Development",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop&crop=center",
                description: "Strategic partner matching and development"
              }
            ].map((solution, index) => (
              <div key={solution.title} className="card p-0 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{solution.title}</h3>
                    <p className="text-sm text-gray-200">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive support for Canadian companies looking to establish a strong presence in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Market Research',
                description: 'Comprehensive analysis of Indian markets, competition, and opportunities for Canadian businesses',
                color: 'sky'
              },
              {
                icon: Target,
                title: 'Entry Strategy',
                description: 'Customized strategies for market entry and sustainable growth in India',
                color: 'green'
              },
              {
                icon: Shield,
                title: 'Risk Management',
                description: 'Identification and mitigation of potential risks in Indian market expansion',
                color: 'purple'
              },
              {
                icon: Users,
                title: 'Partner Network',
                description: 'Access to our extensive network of pre-screened Indian business partners',
                color: 'orange'
              },
              {
                icon: TrendingUp,
                title: 'Growth Planning',
                description: 'Strategic guidance for scaling operations and maximizing market potential',
                color: 'indigo'
              },
              {
                icon: CheckCircle,
                title: 'Compliance Support',
                description: 'Expert guidance on Indian regulatory requirements and business compliance',
                color: 'teal'
              }
            ].map((item, index) => (
              <div key={item.title} className="card p-8 group">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-700`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A proven methodology that has helped hundreds of Canadian companies succeed in India
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center" 
                alt="Business process and methodology" 
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent rounded-lg"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Proven Success Methodology</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our systematic approach ensures every aspect of your Indian market expansion is carefully planned and executed for maximum success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Detailed market assessment and opportunity analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Strategic planning with local market insights</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Hands-on implementation support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Ongoing growth and optimization guidance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", description: "We evaluate your business model and expansion goals" },
              { step: "02", title: "Strategy", description: "Develop a customized market entry strategy" },
              { step: "03", title: "Implementation", description: "Execute the plan with our local partners" },
              { step: "04", title: "Growth", description: "Support your ongoing expansion and success" }
            ].map((step, index) => (
              <div key={step.step} className="card p-6 text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-sky-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real results from Canadian companies who trusted us with their Indian market expansion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing Success",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
                description: "200% revenue growth in first year"
              },
              {
                title: "Tech Partnership",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center",
                description: "Strategic alliance with leading Indian firm"
              },
              {
                title: "Service Expansion",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
                description: "Pan-India service network established"
              }
            ].map((story, index) => (
              <div key={story.title} className="card p-0 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-gray-200">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-700 to-sky-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Indian Market Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Let our experts guide you through the process and help you achieve success in the Indian market
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-sky-700 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
            >
              Get Expert Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 