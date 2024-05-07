import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import AllUser from "./AllUser";
import CreateOffre from "../offre/CreateOffre";
import OffresList from "./OffresList";
import StagiaireList from "./StagiaireList";
import Candidats from "./Candidats";
import CandidatePerOffre from "../offre/CandidatePerOffre";
import Quiz from "../Quiz/Quiz";
import QuizList from "../Quiz/QuizList";
function AdminIndex() {
  return (
    <Routes>
      <Route path="/dashbord" element={<Admin />} />
      <Route path="/all-users" element={<AllUser />} />
      <Route path="/create-offre" element={<CreateOffre />} />
      <Route path="/all-quizes" element={<QuizList />} />
      <Route path="/offres-list" element={<OffresList />} />
      <Route path="/stagiaires-list" element={<StagiaireList />} />
      <Route path="/candidats-list" element={<Candidats />} />
      <Route path="/candidates_per_offre/:id" element={<CandidatePerOffre />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default AdminIndex;
