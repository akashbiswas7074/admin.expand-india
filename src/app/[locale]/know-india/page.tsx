import { AlertTriangle, Users, Building, Globe, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function KnowIndia({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Know India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding India&apos;s business environment, challenges, and opportunities for Canadian companies
            </p>
          </div>
        </div>
      </section>

      {/* India Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                India: A Market of Tremendous Potential
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
                  <span className="text-gray-700">World&apos;s largest democracy</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Fifth-largest economy globally</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">1.5 billion population</span>
                </div>
              </div>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Demographics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
                  <span className="text-gray-700">Population under 35</span>
                  <span className="font-semibold text-sky-700">65%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Middle class by 2030</span>
                  <span className="font-semibold text-green-700">386M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">GDP Growth Rate</span>
                  <span className="font-semibold text-purple-700">6-7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Challenges */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Business Challenges in India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding the challenges helps prepare for successful market entry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Competition",
                description: "Indian companies and consumers are extremely price sensitive, with entrenched competition from local and international businesses.",
                icon: Users,
                color: "red"
              },
              {
                title: "Regulatory Complexity",
                description: "Higher tariffs than traditional markets, with regulatory regimes that can change with little notice.",
                icon: Building,
                color: "orange"
              },
              {
                title: "Infrastructure Gaps",
                description: "Rapid urbanization straining roads, railroads, ports, airports and power grids required for modern economy.",
                icon: Globe,
                color: "yellow"
              },
              {
                title: "Business Culture",
                description: "Personal relationships build mutual trust in business. Local partners are critical, especially at market-entry stage.",
                icon: Users,
                color: "blue"
              },
              {
                title: "ESG Considerations",
                description: "Environmental, social and governance challenges and opportunities associated with business activities.",
                icon: AlertTriangle,
                color: "green"
              },
              {
                title: "Industrial Ecosystem",
                description: "No established Canadian industrial ecosystem within the Indian economy to support related businesses.",
                icon: TrendingUp,
                color: "purple"
              }
            ].map((challenge, index) => (
              <div key={challenge.title} className="card p-6 group">
                <div className={`w-12 h-12 bg-${challenge.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <challenge.icon className={`w-6 h-6 text-${challenge.color}-700`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Entry Strategy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Successful Market Entry Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Key considerations for Canadian companies entering the Indian market
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Regional Market Approach</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As with many large, populous nations, there&apos;s no single &quot;Indian market.&quot; India&apos;s regions are diverse, and each regional market has millions of consumers. This fact is good news for medium-sized Canadian businesses.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With good market research and an effective export strategy, it&apos;s possible to find plenty of customers for your products and services in one corner of the country, which can simplify market entry.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Focus on specific regional markets</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Conduct thorough market research</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Develop local partnerships</span>
                </div>
              </div>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Success Factors</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-sky-700 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Local Partnerships</h4>
                    <p className="text-gray-600 text-sm">Build relationships with local partners who understand the market</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-700 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Price Sensitivity</h4>
                    <p className="text-gray-600 text-sm">Understand and adapt to price-sensitive market conditions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-700 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Regulatory Compliance</h4>
                    <p className="text-gray-600 text-sm">Stay updated on changing regulations and compliance requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-orange-700 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Cultural Understanding</h4>
                    <p className="text-gray-600 text-sm">Respect and adapt to Indian business culture and practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-700 to-sky-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Navigate India&apos;s Business Landscape?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Our experts can help you understand the challenges and develop strategies for successful market entry
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-sky-700 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center text-lg"
            >
              Get Expert Guidance
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 