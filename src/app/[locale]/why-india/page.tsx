import { TrendingUp, Users, Globe, Building, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

export default async function WhyIndia({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              India: Land of Opportunity
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With the fifth-largest economy in the world and a middle class forecast to reach 386 million by 2030, India is on the trajectory of enormous growth.
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sky-700 mb-2">$12B</div>
              <div className="text-lg text-gray-600">Bilateral Trade in Goods (2022)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sky-700 mb-2">$8.9B</div>
              <div className="text-lg text-gray-600">Trade in Services (2022)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sky-700 mb-2">386M</div>
              <div className="text-lg text-gray-600">Middle Class by 2030</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                India&apos;s Economic Landscape
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                India is a market with tremendous potential for Canadian exporters. Already the world&apos;s largest democracy, India surpassed China as the most populous country overall in 2023.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With a gross domestic product (GDP) of US$3.8 trillion, it&apos;s now the world&apos;s fifth-largest economy, with a healthy growth rate expected to continue for the next decade.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Almost two-thirds of India&apos;s 1.5 billion people are under 35</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Growing middle class with more money to spend</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                      <span className="text-gray-700">Government goal to become a &quot;developed nation&quot; by 2047</span>
                </div>
              </div>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Growth Sectors</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-sky-50 rounded-lg">
                  <Building className="w-5 h-5 text-sky-700 mr-3" />
                  <span className="text-gray-700">Infrastructure Development</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Globe className="w-5 h-5 text-green-700 mr-3" />
                  <span className="text-gray-700">Clean Energy & Technology</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-700 mr-3" />
                  <span className="text-gray-700">Advanced Manufacturing</span>
                </div>
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-700 mr-3" />
                  <span className="text-gray-700">Healthcare & Medical Devices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Opportunities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Top Opportunities for Canada-India Trade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sectors where Canada has a comparative advantage for exports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Infrastructure",
                description: "Massive investments in roads, rail, air, and digital infrastructure",
                icon: Building,
                color: "blue"
              },
              {
                title: "AI & Digital Services",
                description: "Gaming, IoT, and artificial intelligence technologies",
                icon: Globe,
                color: "purple"
              },
              {
                title: "Clean Technologies",
                description: "Water treatment, emissions control, and CCUS technologies",
                icon: TrendingUp,
                color: "green"
              },
              {
                title: "Renewable Energy",
                description: "Wind, solar, and hydroelectric power solutions",
                icon: Star,
                color: "yellow"
              },
              {
                title: "Agri-Food",
                description: "Farm mechanization, supply chain management, and food processing",
                icon: Users,
                color: "orange"
              },
              {
                title: "Electric Vehicles",
                description: "EV charging, battery storage, and drive motor technologies",
                icon: TrendingUp,
                color: "indigo"
              }
            ].map((opportunity, index) => (
              <div key={opportunity.title} className="card p-6 group">
                <div className={`w-12 h-12 bg-${opportunity.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <opportunity.icon className={`w-6 h-6 text-${opportunity.color}-700`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Markets */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Regional Markets in India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each regional market has millions of consumers, offering opportunities for medium-sized Canadian businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                region: "Mumbai & Maharashtra",
                industries: ["Financial services", "National/global business headquarters"]
              },
              {
                region: "Karnataka",
                industries: ["Advanced manufacturing"]
              },
              {
                region: "Gujarat",
                industries: ["Oil & gas", "Chemicals"]
              },
              {
                region: "Hyderabad & Bengaluru",
                industries: ["Technology", "IoT", "Business process outsourcing", "AI"]
              },
              {
                region: "Punjab, Haryana, Madhya Pradesh",
                industries: ["Agriculture and agri-foods"]
              },
              {
                region: "Eastern India",
                industries: ["Mining", "Natural resources"]
              }
            ].map((market, index) => (
              <div key={market.region} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{market.region}</h3>
                <ul className="space-y-2">
                  {market.industries.map((industry, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                      {industry}
                    </li>
                  ))}
                </ul>
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
              Ready to Explore India&apos;s Opportunities?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Let our experts guide you through the process and help you achieve success in the Indian market
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-sky-700 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 