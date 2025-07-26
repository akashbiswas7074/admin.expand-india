import { ArrowRight, AlertTriangle, Globe, Users, FileText, Shield, CheckCircle, Star, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-sky-900 to-sky-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&crop=center" 
            alt="Indian and Canadian business skyline" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-sky-700/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Expand India
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-sky-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-sky-100 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              We help Canadian companies expand into the Indian market through comprehensive business solutions, strategic guidance, and local expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
              <Link 
                href={`/${locale}/contact`} 
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center touch-manipulation"
              >
                Get Started Today
              </Link>
              <Link 
                href={`/${locale}/solutions`} 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center touch-manipulation"
              >
                Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Bar */}
      <section className="py-3 sm:py-4 bg-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2 flex-shrink-0" />
            <p className="text-white text-sm sm:text-base font-medium">
              Ready to expand? <span className="hidden sm:inline">Schedule your free consultation today!</span>
              <span className="sm:hidden">Free consultation available!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Why Choose Expand India?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              We've helped numerous Canadian companies successfully establish and grow their presence in India
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: "100+", label: "Companies Served", icon: Users },
              { number: "5+", label: "Years Experience", icon: CheckCircle },
              { number: "15+", label: "Industries", icon: Globe },
              { number: "98%", label: "Success Rate", icon: Star },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sky-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Our Core Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              End-to-end solutions for Canadian companies looking to establish and grow in India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Market Entry Strategy",
                description: "Comprehensive market analysis and entry planning tailored to your industry.",
                icon: Globe,
                color: "blue"
              },
              {
                title: "Business Setup",
                description: "Complete assistance with company registration, compliance, and legal requirements.",
                icon: FileText,
                color: "green"
              },
              {
                title: "Local Partnerships",
                description: "Connect with reliable local partners and distributors in your target markets.",
                icon: Users,
                color: "purple"
              },
              {
                title: "Regulatory Compliance",
                description: "Navigate complex Indian regulations and ensure full compliance.",
                icon: Shield,
                color: "red"
              },
              {
                title: "Market Research",
                description: "In-depth analysis of your target market, competitors, and opportunities.",
                icon: FileText,
                color: "orange"
              },
              {
                title: "Ongoing Support",
                description: "Continuous guidance and support as you grow your Indian operations.",
                icon: CheckCircle,
                color: "indigo"
              }
            ].map((service, index) => (
              <div key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${service.color}-600`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {service.description}
                </p>
                <Link 
                  href="/services-companies" 
                  className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium text-sm sm:text-base group-hover:underline transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link 
              href="/services-companies" 
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors touch-manipulation"
            >
              View All Services
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why India Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Why Expand to India?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "World's largest democracy with 1.4+ billion consumers",
                  "Rapidly growing economy - one of the fastest in the world",
                  "Large English-speaking population and skilled workforce",
                  "Strong digital infrastructure and growing e-commerce market",
                  "Government initiatives supporting foreign investment",
                  "Growing middle class with increasing purchasing power"
                ].map((point, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8">
                <Link 
                  href={`/${locale}/why-india`} 
                  className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors touch-manipulation"
                >
                  Learn More About India
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&crop=center" 
                  alt="Indian market opportunities" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-sky-600 bg-opacity-10 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-sky-600 to-sky-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Expand Your Business to India?
          </h2>
          <p className="text-lg sm:text-xl text-sky-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Let's discuss your expansion goals and create a customized strategy for your success in the Indian market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4">
            <Link 
              href={`/${locale}/contact`} 
              className="bg-white text-sky-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center touch-manipulation"
            >
              Schedule Free Consultation
            </Link>
            <Link 
              href={`/${locale}/solutions`} 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center touch-manipulation"
            >
              View Our Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
              { icon: Mail, label: "Email Us", value: "info@expandindia.com", href: "mailto:info@expandindia.com" },
              { icon: MapPin, label: "Visit Us", value: "Toronto, Canada", href: `/${locale}/contact` },
              { icon: Clock, label: "Business Hours", value: "Mon-Fri 9AM-6PM EST", href: `/${locale}/contact` }
            ].map((contact, index) => (
              <Link
                key={contact.label}
                href={contact.href}
                className="flex items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-sky-200 transition-colors">
                  <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                    {contact.label}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {contact.value}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 