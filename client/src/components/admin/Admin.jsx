
import { Link } from "react-router-dom";


function Admin() {
  return (
    <aside className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Espace Responsable Administratif </h2>
        
      </div>
      <ul className="space-y-2">
       
         <li>
          <Link
            to="/admin/offres-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
           Offres de stages
          </Link>
        </li>
        <li>
          <Link
            to="/admin/tests-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
           Tests de compétences
          </Link>
          
        </li>
        <li>
          <Link
            to="/admin/allcandidatures"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
           Candidatures 
          </Link>
          
        </li>
        <li>
          <Link
            to="/admin/stagiaires-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            Stagiaires
          </Link>
        </li>
       
       
      </ul>
    </aside>
  );
}

export default Admin;






