import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import AllUser from "./AllUser";
import CreateOffre from "../offre/CreateOffre";
import OffresList from "./OffresList";
import StagiaireList from "./StagiaireList";
import Candidats from "./Candidats";
import CandidatePerOffre from "../offre/CandidatePerOffre";
import QuizList from "../Quiz/QuizList";
import AllCandidatures from "./AllCandidatures";
import AjouterStagiaire from "../AjouterStagiaire";

function AdminIndex() {
  return (
    <Routes>
      <Route path="/dashbord" element={<Admin />} />
      <Route path="/all-users" element={<AllUser />} />
      <Route path="/create-offre" element={<CreateOffre />} />
      <Route path="/all-quizes/:id" element={<QuizList />} />
      <Route path="/offres-list" element={<OffresList />} />
      <Route path="/stagiaires-list" element={<StagiaireList />} />
      <Route path="/candidats-list" element={<Candidats />} />
      <Route path="/candidates_per_offre/:id" element={<CandidatePerOffre />} />
      <Route path="/all-quizes" element={<QuizList />} />
      <Route path="/allcandidatures" element={<AllCandidatures />} />
      <Route path="/create-stagiaire" element={<AjouterStagiaire />} />



    </Routes>
  );
}

export default AdminIndex;
