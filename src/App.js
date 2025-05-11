import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import CreateQuiz from "./components/CreateQuiz";
import Module from "./components/Module";
import Profile from "./components/Profile";
import Select from "./components/Select";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AddSurvey from "./components/addSurvey";
import EditSurvey from "./components/editSurvey";
import EditQuiz from "./components/editQuiz";
import AddQuiz1 from "./components/addQuiz1";
import AddQuiz2 from "./components/addQuiz2";
import HomePage from "./components/HomePage";
import AddClass from "./components/AddClass";
import AddModule from "./components/AddModule";
import CreateSurvey from "./components/CreateSurvey";
import AddClassCSV from "./components/AddClassCSV";
import ClassesPage from "./components/ClassesPage";
import Students from "./components/Students";
import PageType2 from "./components/PageType2";
import Page2Completed from "./components/Page2Completed";
import QuizPage from "./components/QuizPage";
//Les pages des statistiques
import StatSurvey from "./components/StatSurvey";
import StatsPie from "./components/StatsPie";
import StatsLine from "./components/StatsLine";
import StatsBar from "./components/StatsBar";
//les pages de feedBack
import FeedBackView from "./components/FeedBacks";
import FeedIndiv from "./components/FeedIndiv";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            
              <Layout>
                <CreateQuiz />
              </Layout>
            
          }
          path="/createQuiz"
        />
        <Route element={<PageType2 />} path="/pageType2/:id/" />
        <Route
          element={
            
              <Layout>
                <Page2Completed />
              </Layout>
            
          }
          path="/page2Completed/:id/"
        />
        <Route
          element={
            
              <Layout>
                <QuizPage />
              </Layout>
            
          }
          path="/quizPage"
        />
        <Route
          element={
            
              <Layout>
                <ClassesPage />
              </Layout>
            
          }
          path="/classesPage"
        />
        <Route
          element={
            
              <Layout>
                <Students />
              </Layout>
            
          }
          path="/students/:id"
        />
                <Route
          element={
            
              <StatSurvey />
            
          }
          path="/statSurvey/:id"
        />
        <Route
          element={
            
              <Layout>
                <Module />
              </Layout>
            
          }
          path="/module"
        />
        <Route
          element={
            
              <Profile />
            
          }
          path="/profile"
        />
        <Route
          element={
            
              <Layout>
                <Select />
              </Layout>
            
          }
          path="/select"
        />
        <Route element={<AddSurvey />} path="/addSurvey/:id" />
        <Route element={<EditSurvey />} path="/editSurvey/:id" />
        <Route element={<EditQuiz />} path="/editQuiz/:id" />
        <Route element={<AddQuiz1 />} path="/addQuiz1/:id/" />
        <Route element={<AddQuiz2 />} path="/addQuiz2/:id/" />
        <Route
          element={
            
              <HomePage />
            
          }
          path="/homepage"
        />
        <Route
          element={
            
              <Layout>
                <AddClass />
              </Layout>
            
          }
          path="/addClass"
        />
        <Route
          element={
            
              <Layout>
                <AddModule />
              </Layout>
            
          }
          path="/addModule"
        />
        <Route
          element={
            
              <Layout>
                <CreateSurvey />
              </Layout>
            
          }
          path="/createSurvey"
        />
        <Route
          element={
            
              <Layout>
                <AddClassCSV />
              </Layout>
            
          }
          path="/addClassCsv"
        />
        <Route element={<StatsPie />} path="/statsPie/:id" />
        <Route element={<StatsLine />} path="/statsLine" />
        <Route element={<StatsBar />} path="/statsBar" />
        <Route element={<FeedBackView />} path="/feedbacks" />
        <Route element={<FeedIndiv />} path="/feedbacks" />
        <Route path="/feedback/:id" element={<FeedIndiv />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
