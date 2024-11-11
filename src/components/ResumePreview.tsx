import React from 'react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <div className="text-gray-600 mt-2">
          <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
          Professional Summary
        </h2>
        <p className="text-gray-700">{data.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
          Experience
        </h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} - {exp.location}</p>
              </div>
              <p className="text-gray-600">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}