'use client';

import React, { createContext, useContext, useState } from 'react';

export type Project = { id: string; title: string; desc: string; link?: string; tech: string[] };
export type Education = { id: string; institute: string; degree: string; year: string };
export type Achievement = { id: string; title: string; description: string; date: string; platform?: string };
export type verifiedAchievement = { title: string, source: string, verified: boolean }

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  verifiedAchievements: verifiedAchievement[]
}


interface ResumeContextType {
  resume: ResumeData;
  updateField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  addEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  addAchievement: (ach: Achievement) => void;
  removeAchievement: (id: string) => void;
}


const defaultData: ResumeData = {
  name: 'Shyam Saini',
  title: 'Frontend Developer',
  email: 'shyamsainidbd2@gmail.com',
  phone: '8077655483',
  summary: 'Passionate React/Next.js developer building modern UI experiences.',
  skills: ['React', 'TypeScript', 'TailwindCSS'],
  projects: [{ id: 'p1', title: 'Portfolio', desc: 'Personal portfolio site', tech: ['React', 'Next.js'], link: 'https://shyamdev65.vercel.app/' }],
  education: [{ id: 'e1', institute: 'ABC University', degree: 'B.Tech CS', year: '2022' }],
  achievements: [{ id: 'a1', title: 'Hackathon Winner', description: 'Won 1st place in XYZ hackathon', date: '2024-01', platform: 'XYZ Platform' }],
  verifiedAchievements: [{ title: "Frontend Internship at X", source: "Internshala", verified: true }, { title: "React Hackathon Winner", source: "Devfolio", verified: true },]
};


const ResumeContext = createContext<ResumeContextType | undefined>(undefined);


export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(defaultData);


  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };
  const addSkill = (skill: string) => setResume(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  const removeSkill = (skill: string) => setResume(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  const addProject = (project: Project) => setResume(prev => ({ ...prev, projects: [...prev.projects, project] }));
  const removeProject = (id: string) => setResume(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  const addEducation = (edu: Education) => setResume(prev => ({ ...prev, education: [...prev.education, edu] }));
  const removeEducation = (id: string) => setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  const addAchievement = (ach: Achievement) => setResume(prev => ({ ...prev, achievements: [...prev.achievements, ach] }));
  const removeAchievement = (id: string) => setResume(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));


  return (
    <ResumeContext.Provider value={{ resume, updateField, addSkill, removeSkill, addProject, removeProject, addEducation, removeEducation, addAchievement, removeAchievement }}>
      {children}
    </ResumeContext.Provider>
  );
};


export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};