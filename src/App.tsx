import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import AIEnhanceButton from './components/AIEnhanceButton';
import ModernTemplate from './components/templates/ModernTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import CreativeTemplate from './components/templates/CreativeTemplate';
import { ResumeData, Template } from './types';
import { LMStudioService } from './services/ai';

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&q=80',
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=80',
  },
];

const initialData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const aiService = new LMStudioService('http://localhost:1234');

  const handleEnhance = async () => {
    if (!resumeData.personalInfo.summary.trim()) {
      setError('Please add a professional summary first');
      return;
    }

    setError(null);
    setIsEnhancing(true);
    
    try {
      const enhancedSummary = await aiService.enhanceResume(resumeData.personalInfo.summary);
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: enhancedSummary,
        },
      });
    } catch (error) {
      console.error('Error enhancing resume:', error);
      setError('Failed to enhance resume. Please make sure LM Studio is running and try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
          <div className="space-y-2">
            <AIEnhanceButton onEnhance={handleEnhance} isLoading={isEnhancing} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        
        <div className="mb-8">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
          <div className="space-y-6">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;