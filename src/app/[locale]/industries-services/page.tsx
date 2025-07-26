'use client'

import { useState } from "react"
import { ArrowRight, CheckCircle, Users, Globe, FileText, Shield, Star, TrendingUp, Building, Briefcase, MapPin, Car, Droplets, Pickaxe } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function IndustriesServices() {
  const params = useParams()
  const locale = params.locale as string
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-100 to-sky-300 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop&crop=center" 
            alt="Industrial landscape and business development" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200/80 to-sky-100/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white/60 rounded-xl shadow-lg p-8 sm:p-12 backdrop-blur-md">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries & Services
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-sky-300 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Comprehensive overview of key industries and sectors where Canadian companies can find opportunities in India
            </p>
          </div>
        </div>
      </section>

      {/* Aerospace Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-sky-700" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Aerospace</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Canada is a global leader in aerospace and the fast-growing space industry. These industries are driven by expertise and advanced technologies.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Canada&apos;s aerospace industry includes companies and organizations involved in the manufacturing of:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Aircraft</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Engines</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Landing gear</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Systems and integrated subassemblies</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Maintenance, repair, overhaul, inspection, and testing services</span>
                </div>
              </div>
              <div className="card p-6 bg-sky-50">
                <h3 className="font-semibold text-gray-800 mb-3">Areas with high potential for growth:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Alternative power systems such as hybrid and full electric propulsion</li>
                  <li>• Lightweight materials</li>
                  <li>• Advancements in autonomous and unmanned aerial systems</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=300&fit=crop&crop=center" 
                  alt="Aerospace manufacturing facility" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent rounded-lg"></div>
              </div>
              
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Space Industry</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The space industry is a driving force of innovation and economic growth within the broader aerospace industry. Canadian companies are leading the development of state-of-the-art technologies for spacecraft, satellites, and space-based services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-700 mr-3" />
                    <span className="text-gray-700">Small satellite technologies</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-700 mr-3" />
                    <span className="text-gray-700">Space robotics</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-700 mr-3" />
                    <span className="text-gray-700">Applications in artificial intelligence and data analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industries Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Featured Industry Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              High-potential sectors for Canadian business expansion in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Clean Technology",
                image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop&crop=center",
                description: "Renewable energy and sustainable solutions"
              },
              {
                title: "Agriculture Tech",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop&crop=center",
                description: "Food processing and agricultural innovation"
              },
              {
                title: "Healthcare",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center",
                description: "Medical devices and healthcare technology"
              },
              {
                title: "Information Technology",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center",
                description: "Software solutions and digital services"
              }
            ].map((industry, index) => (
              <div key={industry.title} className="card p-0 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={industry.image} 
                    alt={industry.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{industry.title}</h3>
                    <p className="text-sm text-gray-200">{industry.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Other Key Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore opportunities across diverse sectors in the Indian market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Agriculture & Processed Foods",
                description: "Cornerstone of the Canadian economy, combining tradition and innovation across the food supply chain.",
                icon: Users,
                color: "green",
                details: ["All animal and plant products", "Livestock and dairy products", "Oilseeds, grains, pulses", "Horticulture", "Honey, syrup, and organic products", "Food processing"]
              },
              {
                title: "Automotive",
                description: "World-class vehicles and modern technologies, making it a global leader in automotive solutions.",
                icon: Car,
                color: "sky",
                details: ["Zero-emission vehicle manufacturing", "Battery production", "Hydrogen fuel cells", "Charging equipment", "Electric motor and drivetrain components", "Digital and efficiency solutions"]
              },
              {
                title: "Chemicals & Plastics",
                description: "Thrives on Canada's rich supply of natural resources, driving innovation and production.",
                icon: Shield,
                color: "purple",
                details: ["Natural gas liquids", "Oil", "Minerals", "Electricity", "Biomass", "Circular economy solutions"]
              },
              {
                title: "Clean Technologies",
                description: "Driving innovation and creating sustainable practices that are shaping the future.",
                icon: TrendingUp,
                color: "yellow",
                details: ["Renewable energy", "Water and wastewater management", "Energy storage", "Smart grids", "Hydrogen technologies", "Carbon capture and storage"]
              },
              {
                title: "Consumer Products",
                description: "Range of manufactured goods used for personal, family, household, or non-business purposes.",
                icon: Briefcase,
                color: "orange",
                details: ["Apparel and textiles", "Personal care", "Household products", "Furniture", "Consumer electronics", "Toys and sporting equipment"]
              },
              {
                title: "Defence & Security",
                description: "Export-intensive defence industry driving economic growth and national security.",
                icon: Shield,
                color: "red",
                details: ["Light armoured vehicles", "Personal rifles", "Optics and night vision equipment", "Ship-based sensors and radars", "Special mission aircraft", "Military transport helicopters"]
              },
              {
                title: "Education",
                description: "Supporting educational institutions and learning technologies for global markets.",
                icon: Users,
                color: "indigo",
                details: ["Educational technology", "International student services", "Curriculum development", "Online learning platforms", "Research collaboration", "Professional training"]
              },
              {
                title: "Financial Services",
                description: "Comprehensive financial and insurance services for international markets.",
                icon: Users,
                color: "green",
                details: ["Banking services", "Insurance products", "Investment management", "FinTech solutions", "Risk management", "Financial consulting"]
              },
              {
                title: "Fish & Seafood",
                description: "Renowned for diversity and quality, covering over 160 species from aquaculture and wild fisheries.",
                icon: Car,
                color: "sky",
                details: ["Atlantic salmon", "Haddock", "Lobster", "Shrimp", "Oysters", "Scallops and crab"]
              },
              {
                title: "Forestry & Wood Products",
                description: "Activities from forest management to wood products and bio-based materials.",
                icon: Shield,
                color: "brown",
                details: ["Prefabricated buildings", "Biomaterials", "Biochemicals", "Biofuels", "Lumber", "Advanced processing technologies"]
              },
              {
                title: "Industrial Machinery",
                description: "High-performance equipment for diverse industrial applications and manufacturing processes.",
                icon: Shield,
                color: "gray",
                details: ["Sawmill and woodworking machinery", "Equipment for rubber industry", "Machinery for plastics processing", "Tools for paper industry", "Automation solutions", "Industrial robotics"]
              },
              {
                title: "Information & Communications",
                description: "At the forefront of innovation, driving advancements across a range of technologies.",
                icon: Users,
                color: "purple",
                details: ["Advanced manufacturing", "Artificial intelligence", "Telecommunications", "Financial technologies", "Internet of Things", "Cybersecurity"]
              },
              {
                title: "Life Sciences",
                description: "Healthcare and medical technologies advancing global health solutions.",
                icon: Users,
                color: "pink",
                details: ["Medical devices", "Pharmaceuticals", "Biotechnology", "Diagnostic services", "Healthcare IT", "Clinical research"]
              },
              {
                title: "Mining",
                description: "One of the world's largest mining supply industries with over 4000 companies.",
                icon: Pickaxe,
                color: "yellow",
                details: ["Mineral exploration", "Extraction and processing", "Mining equipment", "Environmental services", "Mine automation", "Remote mining solutions"]
              },
              {
                title: "Oil & Gas",
                description: "Key role in global energy sector, covering exploration to production and clean technologies.",
                icon: Droplets,
                color: "orange",
                details: ["Exploration and drilling", "Refining and petrochemical production", "Seismic exploration", "Pipeline products", "Clean fuels", "Digital solutions"]
              },
              {
                title: "Professional Services",
                description: "Expert consulting and professional services for international business expansion.",
                icon: Briefcase,
                color: "sky",
                details: ["Business consulting", "Legal services", "Accounting and audit", "Management consulting", "Technical consulting", "Market research"]
              },
              {
                title: "Tourism",
                description: "Promoting Canadian tourism and travel services to international markets.",
                icon: MapPin,
                color: "green",
                details: ["Travel services", "Tourism promotion", "Hospitality services", "Cultural experiences", "Adventure tourism", "Business travel"]
              },
              {
                title: "Transportation",
                description: "Seven key areas spanning urban transit to logistics and intelligent transportation systems.",
                icon: Car,
                color: "indigo",
                details: ["Urban transit", "Railway equipment", "Intelligent transportation", "Shipbuilding", "Ports and logistics", "Trucking services"]
              }
            ].map((industry, index) => {
              const isExpanded = expandedIndex === index
              const detailsToShow = isExpanded ? industry.details : industry.details.slice(0, 3)
              return (
                <div key={industry.title} className="card p-6 group">
                  <div className={`w-12 h-12 bg-${industry.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className={`w-6 h-6 text-${industry.color}-700`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <div className="space-y-2">
                    {detailsToShow.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-sky-600 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                    {industry.details.length > 3 && (
                      <button
                        className="text-sm text-sky-600 font-medium focus:outline-none hover:underline"
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        type="button"
                      >
                        {isExpanded
                          ? 'Show less'
                          : `+${industry.details.length - 3} more areas`}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-700 to-sky-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore Industry Opportunities?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Our Trade Commissioners around the world are here to support you with accurate market intel, connections to qualified contacts, and identification of new business opportunities.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-sky-700 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
            >
              Connect With Our Experts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 