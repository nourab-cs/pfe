import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import AllUser from "./AllUser";
import CreateOffre from "../offre/CreateOffre";
import OffresList from "./OffresList";
import StagiaireList from "./StagiaireList";
import CandidatePerOffre from "../offre/CandidatePerOffre";
import AllCandidatures from "./AllCandidatures";
import AjouterStagiaire from "../AjouterStagiaire";
import TestsList from "./TestsList";
import QuizList from "../Quiz/QuizList"
function AdminIndex() {
  return (
    <Routes>
      <Route path="/dashbord" element={<Admin />} />
      {/* <Route path="/all-users" element={<AllUser />} />
      <Route path="/create-offre" element={<CreateOffre />} /> */}
      <Route path="/offres-list" element={<OffresList />} />
      <Route path="/stagiaires-list" element={<StagiaireList />} />
      <Route path="/candidates_per_offre/:id" element={<CandidatePerOffre />} />
      <Route path="/allcandidatures" element={<AllCandidatures />} />
      <Route path="/create-stagiaire" element={<AjouterStagiaire />} />
      <Route path="/tests-list" element={<TestsList/>} />
      <Route path="/all-quizes/:id" element={<QuizList/>} />


    </Routes>
  );
}

export default AdminIndex;
