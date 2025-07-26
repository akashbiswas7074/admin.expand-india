'use client'

import { useState } from "react"
import { ArrowRight, CheckCircle, Users, Globe, FileText, Shield, Star, TrendingUp, Building, Briefcase, MapPin, Car, Droplets, Pickaxe } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ServicesCompanies() {
  const params = useParams()
  const locale = params.locale as string
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop&crop=center" 
            alt="Business services and consultation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50/80 to-white/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Services for Companies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive support services to help Canadian companies successfully expand into the Indian market
            </p>
          </div>
        </div>
      </section>

      {/* Export Advice Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-sky-700" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Export Advice</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We provide small and big advice to Canadian companies throughout their entire journey. We can help you make informed decisions to succeed internationally, whether you&apos;re:
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">New to exporting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Exploring new markets</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Looking to expand in existing markets</span>
                </div>
              </div>
              <div className="card p-6 bg-sky-50">
                <h3 className="font-semibold text-gray-800 mb-4">We help you with:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Prepare for the international market</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Connect with potential buyers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Assess your market potential</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Resolve problems abroad</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=350&fit=crop&crop=center" 
                  alt="Export consultation and strategy" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent rounded-lg"></div>
              </div>
              
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">To Serve You Better</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We would like to ask you simple questions such as:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">Who your desired customer is</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">What is special about your product or services</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">What volume you can provide</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">What is your market entry strategy?</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">Do you have partners, ideal buyers, agents, or distributors in mind?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finding the Right Partner */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Finding the Right Partner
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We help you in finding the right partner without travelling overseas and pre-screened meetings before you even travel.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop&crop=center" 
                  alt="Business partnership and meetings" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent rounded-lg"></div>
              </div>
              
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Management Services (PMS)</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our Personal Management Services (PMS) arranges pre-screened one-on-one appointments with potential business partners and arranges business meeting opportunities in India or in Canada.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Approximate 8-10 appointments with pre-screened sales representatives, agents or distributors</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Background/Profile on each Indian Company/Partner you will meet</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Complete arrangement by our staff members for meetings</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Discuss results and assist in developing appropriate follow-up strategies</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Minimum 2 weeks advance schedule required</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=center" 
                  alt="International business networking" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent rounded-lg"></div>
              </div>
              
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Overseas Partner Search</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We assist you in finding overseas partners if you are looking to expand your business and boost your sales.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">What you provide us:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Your marketing materials</li>
                      <li>• Company background information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">What we provide you:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Use our network of Indian Contacts</li>
                      <li>• Locate, screen and provide reports on 8-10 potential partners</li>
                      <li>• Sales associates, agents, distributors, joint ventures partners or franchises</li>
                      <li>• Easy, economical, quick-access opportunity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our most popular services for Canadian companies expanding to India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Market Research",
                image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=250&fit=crop&crop=center",
                description: "Comprehensive market analysis and insights"
              },
              {
                title: "Partner Matching",
                image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=400&h=250&fit=crop&crop=center",
                description: "Connect with pre-screened business partners"
              },
              {
                title: "Consultation",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center",
                description: "Expert guidance for market entry"
              },
              {
                title: "Support Services",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&crop=center",
                description: "Comprehensive business support solutions"
              }
            ].map((service, index) => (
              <div key={service.title} className="card p-0 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-200">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive support services to facilitate your business expansion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Overseas Company Profile",
                description: "Quick background checks and due diligence reports on potential buyers and partners.",
                icon: FileText,
                color: "blue",
                features: [
                  "Detailed background report on prospective partner",
                  "List of company senior management team",
                  "Banking and financial information",
                  "Trading experience and market coverage",
                  "Our opinion on company strength vs competitors"
                ]
              },
              {
                title: "Customized Market Research",
                description: "Up-to-date information to help you make intelligent market decisions.",
                icon: Users,
                color: "green",
                features: [
                  "Market size for your products",
                  "Market entry requirements",
                  "Regulatory issues",
                  "Key competitors analysis",
                  "Price analysis and distribution channels"
                ]
              },
              {
                title: "Business Support Services",
                description: "Launch your product or service in India with promotional or technical seminars.",
                icon: Shield,
                color: "purple",
                features: [
                  "Logistical support for campaigns",
                  "Professional promotional events",
                  "Technical seminars",
                  "Product/Service launches",
                  "Matchmaking programs"
                ]
              },
              {
                title: "Consulting Services",
                description: "Business solutions and expert advice for entering the Indian market for the first time.",
                icon: Globe,
                color: "orange",
                features: [
                  "In-depth consulting based on local market conditions",
                  "Industry specialist assistance",
                  "Market research and recommendations",
                  "Customized problem-solving solutions",
                  "Contact lists and meeting arrangements"
                ]
              },
              {
                title: "Industry Specialists",
                description: "Expert team covering various industries for market entry and expansion.",
                icon: Shield,
                color: "indigo",
                features: [
                  "Aerospace & defense",
                  "Energy & environment",
                  "Infrastructure",
                  "Information technology",
                  "Education & franchising"
                ]
              },
              {
                title: "Trade Commissioner Support",
                description: "Our Trade Commissioners around the world provide comprehensive support.",
                icon: TrendingUp,
                color: "red",
                features: [
                  "Accurate market intelligence",
                  "Connections to qualified contacts",
                  "Identification of new business opportunities",
                  "Market insights and analysis",
                  "International business guidance"
                ]
              }
            ].map((service, index) => {
              const isExpanded = expandedIndex === index
              const featuresToShow = isExpanded ? service.features : service.features.slice(0, 3)
              return (
                <div key={service.title} className="card p-6 group">
                  <div className={`w-12 h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-6 h-6 text-${service.color}-700`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {featuresToShow.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-sky-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <button
                        className="text-sm text-sky-600 font-medium focus:outline-none hover:underline"
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        type="button"
                      >
                        {isExpanded
                          ? 'Show less'
                          : `+${service.features.length - 3} more services`}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Common questions about our Personal Management Services (PMS)
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How far in advance do I need to book my Personal Management Services (PMS)?",
                a: "You need to book (PMS) a minimum of 6 weeks in advance of your travel dates."
              },
              {
                q: "As a Canadian/US citizen do I need to obtain a visa beforehand for business travel to India?",
                a: "You need to obtain a visa beforehand for travel to India, and to get an Indian visa, you should go to the Indian high commission/consulate close to you or we can do the necessary arrangements to get one."
              },
              {
                q: "What kind of accommodation does Expand India provide and how much does it cost?",
                a: "Our company provides a recommended list of hotels, which is available to our guests at discounted rates. A list of hotels is available on request."
              },
              {
                q: "What are the transportation options from the airport to the hotel?",
                a: "Most of the hotels provide free transportation, and in case if hotel transportation is not available due to non-availability, we will pick you up from the airport and will provide you transportation to the hotel at no cost."
              },
              {
                q: "Where do the business meetings normally take place?",
                a: "Sometimes it happens at company offices or hotels, depending on mutual convenience."
              },
              {
                q: "Who will be attending the business meetings?",
                a: "You, the company representative (potential future business partner), and a representative of the Personal Management Services (PMS) team will attend the business meetings."
              },
              {
                q: "Do I need an interpreter or a translator?",
                a: "No, all business people or representatives speak fluent English."
              },
              {
                q: "Do I need to rent a car and a driver for my meetings?",
                a: "No, you will be provided a car and a driver at Personal Management Services (PMS) cost."
              },
              {
                q: "When will I receive the list of companies I will be meeting with?",
                a: "You will receive the list of companies after we have an initial meeting with you and the requirements are met."
              },
              {
                q: "What is the dress code for business meetings?",
                a: "Business attire- e.g., Blazer and tie."
              },
              {
                q: "Anything important I need to know?",
                a: "Our staff will help you at every step."
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-semibold text-gray-800 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact our experts to learn more about our services and how we can help your company expand into the Indian market
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-sky-700 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 