import React from 'react';
import { ResumeData } from '../../types';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-2">{data.personalInfo.name}</h1>
        <div className="text-sm text-gray-600 space-x-4">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-medium">{exp.title}</h3>
              <span className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exp.company} • {exp.location}</p>
            <p className="text-sm text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-medium">{edu.degree}</h3>
              <span className="text-sm text-gray-500">{edu.graduationDate}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{edu.school} • {edu.location}</p>
            <p className="text-sm text-gray-700">{edu.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="text-sm px-3 py-1 bg-gray-50 text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}