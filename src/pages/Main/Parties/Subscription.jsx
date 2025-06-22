// import { Link } from "react-router-dom";

// export default function Subscription() {
//   return (
//     <div className="flex flex-col items-center  p-8 min-h-screen">
//       <div className="w-full  grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Starter Plan */}
//         <div className="bg-white rounded-lg p-6 border border-[#F9A94B] flex flex-col ">
//           <div className="flex justify-between  ga-4 items-center mb-4">
//             <div>
//               <h3 className="text-[25px] font-semibold text-gray-800">
//                 Starter
//               </h3>
//               <p className="text-[16px] w-[200px] text-gray-600">
//                 Perfect for beginners and side projects
//               </p>
//             </div>
//             <div className="bg-[#FDDEB9] px-3 py-1 rounded-md">
//               <span className="text-amber-800 font-medium text-[31px]">
//                 $50
//               </span>
//             </div>
//           </div>

//           <hr className="mt-6 border-[#FBCE98] pb-10" />
//           <ul className="space-y-3 mb-6 flex-grow">
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Full access to Site Explorer
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Keyword Explorer searches
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Competitor Analysis reports
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 AI Marketing & SEO recommendations
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Priority support (for Pro & Elite)
//               </span>
//             </li>
//           </ul>

//           <button className="w-full py-3 bg-[#62C1BF] hover:bg-amber-700 text-white rounded-full mt-4 transition-colors">
//             Delete Plan
//           </button>
//         </div>
//         <div className="bg-white rounded-lg p-6 border border-[#F9A94B] flex flex-col ">
//           <div className="flex justify-between  ga-4 items-center mb-4">
//             <div>
//               <h3 className="text-[25px] font-semibold text-gray-800">Pro</h3>
//               <p className="text-[16px] w-[200px] text-gray-600">
//                 For growing teams and serious marketers{" "}
//               </p>
//             </div>
//             <div className="bg-[#FDDEB9] px-3 py-1 rounded-md">
//               <span className="text-amber-800 font-medium text-[31px]">
//                 $100
//               </span>
//             </div>
//           </div>

//           <hr className="mt-6 border-[#FBCE98] pb-10" />
//           <ul className="space-y-3 mb-6 flex-grow">
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Full access to Site Explorer
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Keyword Explorer searches
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Competitor Analysis reports
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 AI Marketing & SEO recommendations
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Priority support (for Pro & Elite)
//               </span>
//             </li>
//           </ul>

//           <button className="w-full py-3 bg-[#62C1BF] hover:bg-amber-700 text-white rounded-full mt-4 transition-colors">
//             Delete Plan
//           </button>
//         </div>
//         <div className="bg-white rounded-lg p-6 border border-[#F9A94B] flex flex-col ">
//           <div className="flex justify-between  ga-4 items-center mb-4">
//             <div>
//               <h3 className="text-[25px] font-semibold text-gray-800">Elite</h3>
//               <p className="text-[16px] w-[200px] text-gray-600">
//                 Maximum power for agencies and SEO pros{" "}
//               </p>
//             </div>
//             <div className="bg-[#FDDEB9] px-3 py-1 rounded-md">
//               <span className="text-amber-800 font-medium text-[31px]">
//                 $150
//               </span>
//             </div>
//           </div>

//           <hr className="mt-6 border-[#FBCE98] pb-10" />
//           <ul className="space-y-3 mb-6 flex-grow">
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Full access to Site Explorer
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3 w-3 text-white"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[16px] text-gray-700">
//                 Keyword Explorer searches
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Competitor Analysis reports
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 AI Marketing & SEO recommendations
//               </span>
//             </li>
//             <li className="flex items-center">
//               <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-3"></div>
//               <span className="text-[16px] text-gray-700">
//                 Priority support (for Pro & Elite)
//               </span>
//             </li>
//           </ul>

//           <button className="w-full py-3 bg-[#62C1BF] hover:bg-amber-700 text-white rounded-full mt-4 transition-colors">
//             Delete Plan
//           </button>
//         </div>
//       </div>

//       <div className="mt-20">
//         <Link
//           to="/add-item"
//           className="flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Add New Subscription
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Check } from "lucide-react";

export default function Subscription() {
  const plans = [
    {
      name: "Basic",
      price: 56,
      description:
        "Start your financial journey with guided videos, community access, and AI support—ideal for beginners building their foundation.",
      features: [
        "Access to the AI Agent",
        "Access to Telegram group",
        "Over 150 Videos",
      ],
      featured: false,
    },
    {
      name: "Pro",
      price: 199,
      description:
        "Take action with expert-led live calls, real-time trading signals, and portfolio insights—perfect for hands-on learners and active investors.",
      features: [
        "Everything in Basic",
        "Q&A Live Calls",
        "Trading signals",
        "Portfolio Analysis",
      ],
      featured: true,
    },
    {
      name: "Elite",
      price: 399,
      description:
        "Unlock advanced learning with personal mentorship, exclusive events, and deep-dive masterclasses—built for serious investors.",
      features: [
        "Everything in Pro",
        "Exclusive Masterclasses",
        "1:1 Mentoring",
        "Exclusive Events",
      ],
      featured: false,
    },
  ];

  return (
    <section id="prices" className="relative bg-[#1a1a1a] py-16 lg:py-24">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-start px-4 sm:px-6 lg:px-8">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "relative rounded-3xl p-8 transition-all duration-500 overflow-hidden group bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] border border-gray-700/50 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10 min-h-[500px] flex flex-col"
              }
            >
              {/* Hover Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/layers.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 " />
              </div>

              <div className="relative z-20  flex flex-col h-full">
                <div className=" grow">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl lg:text-4xl font-semibold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl lg:text-3xl font-medium text-white mb-4">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8 ">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {/* <Button
                  className={
                    "w-full !py-6 rounded-full text-lg font-medium transition-all duration-300  bg-text hover:bg-text cursor-pointer  text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
                  }
                >
                  Choose Plan
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
