import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import { useUser } from "../../stores/userStore";
import { useOffre } from "../../stores/offreStore";

function UserCandidature() {
  const [data, setData] = useState([]);
  const [user] = useUser((state) => [state.user]);
  const [id, setId] = useState("");
  const [Offre] = useOffre((state) => [state.Offre]);
  useEffect(() => {
    if (user.email) {
      axiosClient
        .post(
          "/postuler/get-candidates-by-email",
          { email: user.email },
          { withCredentials: true }
        )
        .then((res) => {
          setData(res.data);
          console.log(Offre,"effect")
          const x = Offre.find((e)=>{
            return e._id == "66654e372a4c2afc73346dfeb"
          })
          console.log(x);
        })
        .catch((error) => {
          console.error("Error fetching user candidatures", error);
        });
    }
  }, [user.email]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 my-4">
        Mes Candidatures
      </h2>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Titre de l'offre
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Date d'entretien
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((candidature) => {
                const OffreName = Offre.find((e) => {
                  return candidature.offre_id == e._id;
                });

                return (
                  <tr key={candidature._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {OffreName?.titre}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {candidature.is_accepted}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {candidature.interview
                        ? new Date(candidature.interview).toLocaleString()
                        : "Non planifiée"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">Aucune candidature trouvée</p>
      )}
    </div>
  );
}

export default UserCandidature;
