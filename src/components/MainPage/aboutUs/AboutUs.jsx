import { PaperAirplaneIcon, GlobeAsiaAustraliaIcon, WalletIcon } from "@heroicons/react/24/solid"

const AboutUs = () => {
  const ourPlus = [
    { componentIcon: PaperAirplaneIcon, distraction: "Our company has completed over 5000+ flights", color: "blue" },
    { componentIcon: GlobeAsiaAustraliaIcon, distraction: "Over 100 different destinations", color: "green" },
    { componentIcon: WalletIcon, distraction: "Cheap tours with guarantee and refunds", color: "purple" }
  ]

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600"
  }

  return <>
    <main className='flex justify-center flex-col items-center gap-8 px-4 mb-12' id="about">
      <div className='text-center'>
        <h1 className='font-bold text-4xl md:text-5xl text-gray-800 mb-3'>About Us</h1>
        <div className="h-1 w-24 bg-blue-500 rounded mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center w-full max-w-6xl">
        {ourPlus.map((i, index)=>{
          const Icon = i.componentIcon
          const bgColor = colorClasses[i.color]
          return (
            <div 
              className={`flex flex-col gap-4 justify-center items-center p-8 box-border border-2 rounded-3xl ${bgColor} hover:shadow-lg transition-shadow duration-300`} 
              key={index}
            >
              <Icon className="w-16 h-16"/>
              <p className="text-center font-medium text-gray-700">{i.distraction}</p>
            </div>
          )
        })}
      </div>
    </main>
  </>
}

export default AboutUs