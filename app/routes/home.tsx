import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuScan" },
    { name: "description", content: "Smart way to improve your resume" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-no-repeat bg-center">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading">
        <h1>AI-powered resume analyzer</h1>
        <p>The smart way to improve your resume.</p>
      </div>
    </section>

    {resumes.length > 0 && (
      <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
)}

  </main>;
}


