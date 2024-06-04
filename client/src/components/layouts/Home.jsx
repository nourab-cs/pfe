import { Button } from "@material-tailwind/react"
import "./home.css" 

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Home() {
  return (
<>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Trouvez Votre Stage Idéal
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Le stage ? La meilleure façon de se mettre dans le bain du monde du travail : 
              découvrir les codes d'un grand groupe, travailler sur des projets à enjeux, 
              être formée , apprendre tous les jours.


              </p>
            </div>
            {/* <div>
              <Button className="bg-[#ff4d4d] hover:bg-[#ff3333] focus:ring-[#ff4d4d]" color="white" variant="solid">
                Get Started
              </Button>
            </div> */}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-[#ff4d4d] p-4 rounded-full">
                <SearchIcon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Extensive Search</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced search algorithms help you find the perfect candidates for your roles.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-[#ff4d4d] p-4 rounded-full">
                <BriefcaseIcon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Tailored Recommendations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our platform provides personalized candidate recommendations based on your needs.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-[#ff4d4d] p-4 rounded-full">
                <UsersIcon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Diverse Talent Pool</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our network of top-tier candidates ensures you have access to a diverse talent pool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
 
  ) 
}

export default Home









