import React from 'react';
import { ResumeData } from '../../types';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          {data.personalInfo.name}
        </h1>
        <div className="mt-4 flex justify-center gap-6 text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      <div className="mb-10 bg-white rounded-xl p-6 shadow-sm">
        <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-gray-800">{exp.title}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-purple-600 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                </div>
                <p className="text-blue-600 mb-2">{edu.school} • {edu.location}</p>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}