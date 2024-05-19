import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import { useUser } from "../../stores/userStore";

function UserCanditature() {
  const [data, setData] = useState([]);
  const [user] = useUser((state) => [state.user, state.setUser]);

  useEffect(() => {
    axiosClient
      .post(
        "/postuler/get-candidates-by-email",
        { email: user.email },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user candidatures", error);
      });
  }, [user.email]);

  return (
    <div>
      <h2>Mes Candidatures</h2>
      {data.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Titre de l'offre</th>
              <th className="py-2">Statut</th>
              <th className="py-2">Date d'entretien</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidature) => (
              <tr key={candidature._id}>
                <td className="py-2">{candidature.titreOffre}</td>
                <td className="py-2">{candidature.statut}</td>
                <td className="py-2">{candidature.dateEntretien ? new Date(candidature.dateEntretien).toLocaleDateString() : "Non planifiée"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune candidature trouvée</p>
      )}
    </div>
  );
}

export default UserCanditature;
