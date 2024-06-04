import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import { useUser } from "../../stores/userStore";
import { useOffre } from "../../stores/offreStore";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

function UserCandidature() {
  const [data, setData] = useState([]);
  const [user] = useUser((state) => [state.user]);
  const [id, setId] = useState("");
  const [offre_Candidature] = useOffre((state) => [state.Offre]);
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
          <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <TableHeader className="bg-gray-100">
              <TableColumn className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Titre de l'offre
              </TableColumn >
              <TableColumn className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Statut
              </TableColumn >
              <TableColumn className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Date d'entretien
              </TableColumn >
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {data.map((candidature) => {
                const Offre = offre_Candidature.find(
                  (e) => candidature.offre_id == e._id
                );
                return (
                  <TableRow key={candidature._id} className="hover:bg-gray-50">
                    <TableCell className="py-3 px-4 text-sm text-gray-900">
                      {Offre?.titre}
                    </TableCell >
                    <TableCell className="py-3 px-4 text-sm text-gray-900">
                      {candidature?.quiz_score >= 50
                        ? candidature.is_accepted == ""
                          ? "en attente"
                          : candidature.is_accepted
                        : candidature?.quiz_score == -1
                        ? "refusée : Vous n'avez pas passer le test"
                        : "refusée  :échec au test "}
                    </TableCell >
                    <TableCell className="py-3 px-4 text-sm text-gray-900">
                      {candidature.interview
                        ? new Date(candidature.interview).toLocaleString()
                        : "Non planifiée"}
                    </TableCell >
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-600">Aucune candidature trouvée</p>
      )}
    </div>
  );
}

export default UserCandidature;
