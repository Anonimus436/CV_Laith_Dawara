import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Layout from "./layout/Layout"
import Contact from "./pages/Contact"
import FileDetail from "./pages/FileDetail"
import ManageWorks from "./pages/ManageWorks"
import EditCard from "./pages/EditCard"
import AboutEditPage from "./pages/AboutEditPage"
import ManageSelectWorks from "./pages/ManageSelectWorks"
import EditSelectCard from "./pages/EditSelectCard"
import AdminLogin from "./pages/AdminLogin"
import AdminRoute from "./components/AdminRoute"
import ManageBrands from "./pages/ManageBrands"
import SkinHypersensitivity from "./pages/articles/SkinHypersensitivity"
import SugarSubstitutes from "./pages/articles/SugarSubstitutes"
import PostWorkoutProtein from "./pages/articles/PostWorkoutProtein"
import AIDiagnosis from "./pages/articles/AIDiagnosis"
import PeriodicCheckups from "./pages/articles/PeriodicCheckups"
import HiroHealthAlsori from "./pages/articles/HiroHealthAlsori"
import HiroHealthB2B from "./pages/articles/HiroHealthB2B"
import HiroHealthSyriatech from "./pages/articles/HiroHealthSyriatech"
import HiroHealthSyriaToday from "./pages/articles/HiroHealthSyriaToday"
import HadayaCommunityGrowth from "./pages/services/HadayaCommunityGrowth"
import EazySalesLeadGen from "./pages/services/EazySalesLeadGen"
import HsOrgRevenue from "./pages/services/HsOrgRevenue"
import TechEduLeadGen from "./pages/services/TechEduLeadGen"

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/contact" element={<Contact/>}/>

          {/* Service / Case Study pages */}
          <Route path="/Hadaya"  element={<HadayaCommunityGrowth/>}/>
          <Route path="/EasySales" element={<EazySalesLeadGen/>}/>
          <Route path="/HS"  element={<HsOrgRevenue/>}/>
          <Route path="/Tech" element={<TechEduLeadGen/>}/>

          {/* Full article pages (Blog) */}
          <Route path="/articles/skin-hypersensitivity" element={<SkinHypersensitivity/>}/>
          <Route path="/articles/sugar-substitutes" element={<SugarSubstitutes/>}/>
          <Route path="/articles/post-workout-protein" element={<PostWorkoutProtein/>}/>
          <Route path="/articles/ai-diagnosis" element={<AIDiagnosis/>}/>
          <Route path="/articles/periodic-checkups" element={<PeriodicCheckups/>}/>
          <Route path="/articles/hiro-health-alsori" element={<HiroHealthAlsori/>}/>
          <Route path="/articles/hiro-health-b2b" element={<HiroHealthB2B/>}/>
          <Route path="/articles/hiro-health-syriatech" element={<HiroHealthSyriatech/>}/>
          <Route path="/articles/hiro-health-syria-today" element={<HiroHealthSyriaToday/>}/>

          {/* Generic file-detail pages */}
          <Route path="/files/:slug" element={<FileDetail/>}/>

          <Route path="/admin-login" element={<AdminLogin/>}/>

          {/* Works management */}
          <Route path="/about/edit" element={<AdminRoute><AboutEditPage/></AdminRoute>}/>
          <Route path="/manage-works" element={<AdminRoute><ManageWorks/></AdminRoute>}/>
          <Route path="/edit-card/:slug" element={<AdminRoute><EditCard/></AdminRoute>}/>

          {/* Select Works management (Home page) */}
          <Route path="/manage-select-works" element={<AdminRoute><ManageSelectWorks/></AdminRoute>}/>
          <Route path="/edit-select-card/:slug" element={<AdminRoute><EditSelectCard/></AdminRoute>}/>
          <Route path="/manage-brands" element={<AdminRoute><ManageBrands/></AdminRoute>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
  )
}

export default App

