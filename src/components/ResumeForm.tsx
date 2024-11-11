import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData } from '../types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: crypto.randomUUID(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: crypto.randomUUID(),
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded"
            value={data.personalInfo.name}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, name: e.target.value },
              })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={data.personalInfo.email}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, email: e.target.value },
              })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="p-2 border rounded"
            value={data.personalInfo.phone}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, phone: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="p-2 border rounded"
            value={data.personalInfo.location}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, location: e.target.value },
              })
            }
          />
        </div>
        <textarea
          placeholder="Professional Summary"
          className="w-full p-2 border rounded h-32"
          value={data.personalInfo.summary}
          onChange={(e) =>
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, summary: e.target.value },
            })
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="space-y-4 p-4 border rounded">
            <div className="flex justify-end">
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                className="p-2 border rounded"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                className="p-2 border rounded"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, 'company', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="p-2 border rounded"
                value={exp.location}
                onChange={(e) =>
                  updateExperience(exp.id, 'location', e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="p-2 border rounded"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, 'startDate', e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="p-2 border rounded"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, 'endDate', e.target.value)
                  }
                />
              </div>
            </div>
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded h-32"
              value={exp.description}
              onChange={(e) =>
                updateExperience(exp.id, 'description', e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} className="space-y-4 p-4 border rounded">
            <div className="flex justify-end">
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree"
                className="p-2 border rounded"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="School"
                className="p-2 border rounded"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="p-2 border rounded"
                value={edu.location}
                onChange={(e) =>
                  updateEducation(edu.id, 'location', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Graduation Date"
                className="p-2 border rounded"
                value={edu.graduationDate}
                onChange={(e) =>
                  updateEducation(edu.id, 'graduationDate', e.target.value)
                }
              />
            </div>
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded h-32"
              value={edu.description}
              onChange={(e) =>
                updateEducation(edu.id, 'description', e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="w-full p-2 border rounded"
          value={data.skills.join(', ')}
          onChange={(e) =>
            onChange({
              ...data,
              skills: e.target.value.split(',').map((skill) => skill.trim()),
            })
          }
        />
      </div>
    </div>
  );
}